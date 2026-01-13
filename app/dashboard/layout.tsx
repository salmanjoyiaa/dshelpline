'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { ErrorBoundary } from '@/components/error-boundary';
import {
  BarChart3,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
  Home,
  Sun,
  Moon,
  Zap,
} from 'lucide-react';

const baseNavItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/requests', label: 'Requests', icon: FileText },
  { href: '/dashboard/providers', label: 'Providers', icon: Users },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

const propertyAssistantItem = {
  href: '/dashboard/rag',
  label: 'Property Assistant',
  icon: Zap,
};

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [navItems, setNavItems] = useState(baseNavItems);
  const [mounted, setMounted] = useState(false);
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    setMounted(true);
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setUserEmail(user.email);
        // Only show Property Assistant to zuhab@propertyagent.com
        if (user.email.toLowerCase() === 'zuhab@propertyagent.com') {
          setNavItems([...baseNavItems, propertyAssistantItem]);
        }
      }
    };

    fetchUser();
  }, [supabase]);

  if (!mounted) {
    // Avoid hydration mismatches by not rendering until mounted
    return null;
  }

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 w-64 transform transition-transform duration-200 ease-in-out z-30 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 border-r ${isDarkMode ? 'bg-slate-900 border-yellow-500/30' : 'bg-white border-gray-200'}`}
        >
          <div className={`h-16 flex items-center px-6 border-b ${isDarkMode ? 'border-yellow-500/30' : 'border-gray-200'}`}>
            <Link href="/dashboard" className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Dream State AI
            </Link>
          </div>

          <nav className="px-4 py-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${isDarkMode ? 'text-gray-300 hover:bg-slate-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Header */}
          <header className={`${isDarkMode ? 'bg-slate-900 border-yellow-500/30' : 'bg-white border-gray-200'} border-b sticky top-0 z-20`}>
            <div className={`h-16 flex items-center justify-between px-6 ${isDarkMode ? 'bg-black/40' : ''}`}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`md:hidden -ml-2 p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <div className="flex-1" />

              <div className="flex items-center gap-3">
                {/* Light/Dark Mode Toggle */}
                {mounted && (
                  <button
                    onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                    className={`p-2 rounded-lg transition ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                )}

                {/* Sign Out Button */}
                <Button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {loading ? 'Signing out...' : 'Sign Out'}
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className={`flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 ${isDarkMode ? 'bg-gradient-to-br from-black to-slate-900' : 'bg-gray-50 text-gray-900'}`}>
            {children}
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className={`fixed inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/30'} z-20 md:hidden`}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}
