'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Send, LogOut, User, Loader2, XCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Supabase table names
const PROPERTIES_TABLE = 'properties';
const INQUIRIES_TABLE = 'inquiries';

// Allowed user emails for RAG access
const ALLOWED_EMAILS = ['zuhab@propertyagent.com'];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Property {
  id?: string;
  unit?: string;
  address?: string;
  property_handled_by?: string;
  door_lock?: string;
  wifi_login?: string;
  pool_and_hot_tub?: string;
  pet_party_smoking?: string;
  max_guests?: string;
  bedroom_x_bed_x_bath?: string;
  parking?: string;
  airbnb_listing?: string;
  camera_location?: string;
  quite_hours?: string;
  washer_dryer?: string;
  additional_notes?: string;
  back_up_code?: string;
  lock_box_code?: string;
  trash_day_reminder?: string;
  [key: string]: any;
}

export default function PropertyChatbot() {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessLoading, setAccessLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check authentication and access on mount
  useEffect(() => {
    checkAccessAndAuth();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkAccessAndAuth = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        // Redirect to sign-in if not authenticated
        router.push('/sign-in');
        return;
      }

      setUser(authUser);

      // Grant access to all authenticated users on dashboard
      // (middleware already protects /dashboard/* routes)
      setHasAccess(true);
      
      // Initialize with welcome message
      const welcomeMsg: Message = {
        role: 'assistant',
        content: `Welcome! I'm your property assistant. I have access to information about all your properties. You can ask me things like:\n\n"What's the wifi password for Fire & Fun?"\n"How do I access the hot tub?"\n"What's the door code for [property name]?"\n"Show me properties in [location]"\n"Where is the washer and dryer?"\n\nWhat would you like to know?`
      };
      setMessages([welcomeMsg]);
      
      console.log('RAG access granted for:', authUser.email);
    } catch (error) {
      console.error('Error checking auth:', error);
      router.push('/sign-in');
    } finally {
      setAccessLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  const simulateNotification = () => {
    const mockInquiry = {
      id: Date.now().toString(),
      customer_name: 'Sarah Martinez',
      whatsapp_number: '+1-555-0123',
      preferred_area: 'New Jersey',
      questions: 'Looking for a property with a pool and hot tub that can accommodate 15 guests for a family reunion',
      created_at: new Date().toISOString()
    };

    const newNotification = {
      id: mockInquiry.id,
      title: 'New Property Inquiry',
      message: `${mockInquiry.customer_name} is interested in ${mockInquiry.preferred_area}`,
      time: new Date().toLocaleTimeString(),
      data: mockInquiry
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Also add a message to the chat
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `🔔 New Inquiry Alert!\n\nCustomer: ${mockInquiry.customer_name}\nContact: ${mockInquiry.whatsapp_number}\nArea Interest: ${mockInquiry.preferred_area}\nQuestions: ${mockInquiry.questions}\n\nThis inquiry has been logged and notifications sent to the area property manager.`
    }]);
  };

  const queryRAGSystem = async (question: string) => {
    const questionLower = question.toLowerCase();

    // Extract property name from question using fuzzy matching
    const propertyPatterns = ['pinnacle', 'fire', 'fun', 'hidden', 'forest'];
    let propertyName: string | null = null;

    for (const pattern of propertyPatterns) {
      if (questionLower.includes(pattern)) {
        propertyName = pattern;
        break;
      }
    }

    // Query the database based on question context
    let context = '';
    let propertyData: Property | null = null;

    try {
      if (propertyName) {
        // Search for specific property by unit name
        const { data } = await supabase
          .from(PROPERTIES_TABLE)
          .select('*')
          .ilike('unit', `%${propertyName}%`)
          .limit(1);

        if (data && data.length > 0) {
          propertyData = data[0];
          context = JSON.stringify(propertyData, null, 2);
        }
      } else if (questionLower.includes('new jersey') || questionLower.includes('nj')) {
        const { data } = await supabase
          .from(PROPERTIES_TABLE)
          .select('*')
          .ilike('address', '%NJ%');
        if (data) context = JSON.stringify(data, null, 2);
      } else if (questionLower.includes('new york') || questionLower.includes('ny')) {
        const { data } = await supabase
          .from(PROPERTIES_TABLE)
          .select('*')
          .ilike('address', '%NY%');
        if (data) context = JSON.stringify(data, null, 2);
      } else if (questionLower.includes('tennessee') || questionLower.includes('tn')) {
        const { data } = await supabase
          .from(PROPERTIES_TABLE)
          .select('*')
          .ilike('address', '%TN%');
        if (data) context = JSON.stringify(data, null, 2);
      } else {
        // Get all properties for general questions
        const { data } = await supabase
          .from(PROPERTIES_TABLE)
          .select('*');
        if (data) context = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error('Error querying Supabase:', error);
      return "Sorry, I encountered an error accessing the property database. Please try again or contact support if the issue persists.";
    }

    return generateSmartResponse(question, propertyData, context);
  };

  const generateSmartResponse = (question: string, propertyData: Property | null, context: string) => {
    const questionLower = question.toLowerCase();

    if (!propertyData && !context) {
      return "I couldn't find information about that property. Could you please specify the property name or location?";
    }

    // Handle specific question types
    if (questionLower.includes('wifi') || questionLower.includes('password') || questionLower.includes('internet')) {
      if (propertyData?.wifi_login) {
        return `WiFi information for ${propertyData.unit}:\n\n${propertyData.wifi_login}\n\nPlease make sure to enter the credentials exactly as shown, including any capitalization.`;
      }
      return `I don't have WiFi login information on file for this property. Please contact ${propertyData?.property_handled_by || 'the property manager'} for assistance.`;
    }

    if (questionLower.includes('hot tub') || questionLower.includes('pool') || questionLower.includes('swim')) {
      if (propertyData?.pool_and_hot_tub) {
        return `Pool and hot tub information for ${propertyData.unit}:\n\n${propertyData.pool_and_hot_tub}\n\nFor any issues, contact the property manager: ${propertyData.property_handled_by}`;
      }
      return `This property doesn't have pool/hot tub information listed. Contact ${propertyData?.property_handled_by || 'the property manager'} for details.`;
    }

    if (questionLower.includes('door code') || questionLower.includes('lock') || questionLower.includes('entry')) {
      if (propertyData?.door_lock) {
        let response = `Door access for ${propertyData.unit}:\n\nMain door code: ${propertyData.door_lock}`;
        if (propertyData.back_up_code) {
          response += `\nBackup code: ${propertyData.back_up_code}`;
        }
        if (propertyData.lock_box_code) {
          response += `\nLock box code: ${propertyData.lock_box_code}`;
        }
        response += '\n\nPlease keep these codes confidential and do not share with unauthorized guests.';
        return response;
      }
      return `Door code information is not available in the system. Please contact ${propertyData?.property_handled_by || 'the property manager'}.`;
    }

    if (questionLower.includes('manager') || questionLower.includes('contact') || questionLower.includes('handle')) {
      if (propertyData?.property_handled_by) {
        return `${propertyData.unit} is managed by: ${propertyData.property_handled_by}`;
      }
    }

    if (questionLower.includes('pet') || questionLower.includes('smoke') || questionLower.includes('party')) {
      if (propertyData?.pet_party_smoking) {
        return `House rules for ${propertyData.unit}:\n\n${propertyData.pet_party_smoking}`;
      }
    }

    if (questionLower.includes('parking') || questionLower.includes('car')) {
      if (propertyData?.parking) {
        return `Parking at ${propertyData.unit}:\n\n${propertyData.parking}`;
      }
    }

    if (questionLower.includes('trash') || questionLower.includes('garbage')) {
      if (propertyData?.trash_day_reminder) {
        return `Trash collection for ${propertyData.unit}:\n\n${propertyData.trash_day_reminder}`;
      }
    }

    if (questionLower.includes('washer') || questionLower.includes('dryer') || questionLower.includes('laundry')) {
      if (propertyData?.washer_dryer) {
        return `Laundry facilities at ${propertyData.unit}:\n\n${propertyData.washer_dryer}`;
      }
    }

    if (questionLower.includes('camera') || questionLower.includes('security')) {
      if (propertyData?.camera_location) {
        return `Security cameras at ${propertyData.unit}:\n\n${propertyData.camera_location}`;
      }
    }

    if (questionLower.includes('quiet') || questionLower.includes('hours') || questionLower.includes('noise')) {
      if (propertyData?.quite_hours) {
        return `Quiet hours for ${propertyData.unit}:\n\n${propertyData.quite_hours}`;
      }
    }

    // Location-based queries
    if (questionLower.includes('properties in') || questionLower.includes('show me')) {
      try {
        const properties = JSON.parse(context);
        if (Array.isArray(properties) && properties.length > 0) {
          const list = properties.map(p =>
            `${p.unit} - ${p.address} (${p.max_guests} guests, ${p.bedroom_x_bed_x_bath})`
          ).join('\n\n');
          return `Here are the matching properties:\n\n${list}`;
        }
      } catch (e) {
        console.error('Error parsing context:', e);
      }
    }

    // Default comprehensive response
    if (propertyData) {
      return `Information about ${propertyData.unit}:\n\n📍 Address: ${propertyData.address}\n👥 Maximum Guests: ${propertyData.max_guests}\n🛏️ Configuration: ${propertyData.bedroom_x_bed_x_bath}\n🚗 Parking: ${propertyData.parking || 'Contact property manager'}\n👤 Managed by: ${propertyData.property_handled_by}\n\nWhat specific information would you like to know? You can ask about wifi, door codes, hot tub, parking, house rules, trash collection, laundry facilities, or any other amenities.`;
    }

    return "I found some information but I'm not sure exactly what you're looking for. Could you be more specific? For example, ask about wifi passwords, door codes, pool/hot tub instructions, parking, house rules, or property managers.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await queryRAGSystem(inputMessage);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error querying database:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error accessing the property database. Please try again or contact support if the issue persists.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (accessLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading Property Assistant...</p>
        </div>
      </div>
    );
  }

  // Chat interface
  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-black border-b border-yellow-400/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Property Assistant</h1>
            <p className="text-sm text-slate-300">AI-powered property information assistant</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={simulateNotification}
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors"
            >
              Mock Inquiry
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6 text-yellow-400" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl border border-yellow-400/30 z-10">
                  <div className="p-4 border-b border-yellow-400/30">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={() => setNotifications([])}
                          className="text-sm text-yellow-400 hover:text-yellow-300"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-400">
                        <Bell className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p>No new notifications</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="font-medium text-white">{notif.title}</p>
                              <p className="text-sm text-slate-300 mt-1">{notif.message}</p>
                              {notif.data && (
                                <div className="mt-2 text-xs text-slate-400">
                                  <p>Contact: {notif.data.whatsapp_number}</p>
                                  <p>Questions: {notif.data.questions}</p>
                                </div>
                              )}
                              <p className="text-xs text-slate-500 mt-2">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 bg-gradient-to-b from-slate-900 via-slate-900 to-black">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-2xl px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-yellow-400 text-black'
                    : 'bg-slate-800 text-white shadow-sm border border-yellow-400/20'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-2xl px-6 py-4 shadow-sm border border-yellow-400/20">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />
                  <p className="text-slate-300">Searching property database...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-black border-t border-yellow-400/30 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Ask about wifi, door codes, hot tubs, parking, house rules..."
              className="flex-1 px-4 py-3 bg-slate-800 border border-yellow-400/30 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none text-white placeholder-slate-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setInputMessage("What's the wifi password for Fire & Fun?")}
              className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 hover:text-yellow-400 transition-colors border border-slate-700"
            >
              WiFi Password
            </button>
            <button
              onClick={() => setInputMessage("How do I access the hot tub?")}
              className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 hover:text-yellow-400 transition-colors border border-slate-700"
            >
              Hot Tub Access
            </button>
            <button
              onClick={() => setInputMessage("Show me properties in New Jersey")}
              className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 hover:text-yellow-400 transition-colors border border-slate-700"
            >
              NJ Properties
            </button>
            <button
              onClick={() => setInputMessage("What's the door code?")}
              className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 hover:text-yellow-400 transition-colors border border-slate-700"
            >
              Door Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
