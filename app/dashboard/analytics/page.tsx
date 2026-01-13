'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { ServiceRequest, ServiceProvider } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from '@/components/dashboard/stats-card';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

export default function AnalyticsPage() {
  const supabase = createClient();
  const { toast } = useToast();

  const [requests, setRequests] = useState<any[]>([]);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalRequests: 0,
    completionRate: 0,
    avgResponseTime: 0,
    activeProviders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Demo data for zuhab@propertyagent.com
        if (user.email?.toLowerCase() === 'zuhab@propertyagent.com') {
          const dummyRequests = [
            { id: '1', organization_id: user.id, title: 'Hot Tub Maintenance', description: '', status: 'in_progress', priority: 'high', assigned_provider_id: '1', created_at: new Date('2024-01-15').toISOString(), updated_at: new Date('2024-01-16').toISOString(), completed_at: null, deleted_at: null },
            { id: '2', organization_id: user.id, title: 'Pool Cleaning', description: '', status: 'completed', priority: 'medium', assigned_provider_id: '2', created_at: new Date('2024-01-10').toISOString(), updated_at: new Date('2024-01-14').toISOString(), completed_at: new Date('2024-01-14').toISOString(), deleted_at: null },
            { id: '3', organization_id: user.id, title: 'WiFi Router Setup', description: '', status: 'assigned', priority: 'medium', assigned_provider_id: '3', created_at: new Date('2024-01-17').toISOString(), updated_at: new Date('2024-01-17').toISOString(), completed_at: null, deleted_at: null },
            { id: '4', organization_id: user.id, title: 'HVAC Filter Change', description: '', status: 'pending', priority: 'low', assigned_provider_id: null, created_at: new Date('2024-01-16').toISOString(), updated_at: new Date('2024-01-16').toISOString(), completed_at: null, deleted_at: null },
            { id: '5', organization_id: user.id, title: 'Landscape Maintenance', description: '', status: 'completed', priority: 'medium', assigned_provider_id: '1', created_at: new Date('2024-01-08').toISOString(), updated_at: new Date('2024-01-12').toISOString(), completed_at: new Date('2024-01-12').toISOString(), deleted_at: null },
          ];

          const dummyProviders: ServiceProvider[] = [
            { id: '1', name: 'John Smith', phone: '555-0101', email: 'john@example.com', status: 'active', rating: 4.8, total_jobs_completed: 24, organization_id: user.id, created_at: new Date('2024-01-01').toISOString(), updated_at: new Date('2024-01-17').toISOString(), deleted_at: null },
            { id: '2', name: 'Maria Garcia', phone: '555-0102', email: 'maria@example.com', status: 'active', rating: 4.9, total_jobs_completed: 19, organization_id: user.id, created_at: new Date('2024-01-01').toISOString(), updated_at: new Date('2024-01-17').toISOString(), deleted_at: null },
            { id: '3', name: 'Tech Solutions', phone: '555-0103', email: 'tech@example.com', status: 'active', rating: 4.7, total_jobs_completed: 31, organization_id: user.id, created_at: new Date('2024-01-02').toISOString(), updated_at: new Date('2024-01-17').toISOString(), deleted_at: null },
          ];

          setRequests(dummyRequests);
          setProviders(dummyProviders);

          // Calculate analytics from dummy data
          const totalRequests = dummyRequests.length;
          const completedRequests = dummyRequests.filter((r) => r.status === 'completed').length;
          const completionRate = totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0;
          const activeProvidersCount = dummyProviders.filter((p) => p.status === 'active').length;

          setAnalytics({
            totalRequests,
            completionRate,
            avgResponseTime: 2.5,
            activeProviders: activeProvidersCount,
          });

          setLoading(false);
          return;
        }

        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('id', user.id)
          .single();

        if (!userData) return;

        // Fetch requests
        const { data: requestsData } = await supabase
          .from('service_requests')
          .select('*')
          .eq('organization_id', userData.organization_id)
          .is('deleted_at', null);

        setRequests(requestsData || []);

        // Fetch providers
        const { data: providersData } = await supabase
          .from('service_providers')
          .select('*')
          .eq('organization_id', userData.organization_id)
          .is('deleted_at', null);

        setProviders(providersData || []);

        // Calculate analytics
        const allRequests = requestsData || [];
        const totalRequests = allRequests.length;
        const completedRequests = allRequests.filter((r) => r.status === 'completed').length;
        const completionRate = totalRequests > 0 ? Math.round((completedRequests / totalRequests) * 100) : 0;
        const activeProvidersCount = (providersData || []).filter((p) => p.status === 'active').length;

        setAnalytics({
          totalRequests,
          completionRate,
          avgResponseTime: 2.5, // Mock value
          activeProviders: activeProvidersCount,
        });
      } catch (error) {
        logger.error('Error fetching analytics', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch analytics data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, toast]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900">Analytics</h1>
        <p className="mt-1 dark:text-gray-400 text-gray-600">Monitor your business performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Requests"
          value={analytics.totalRequests}
          icon={BarChart3}
        />
        <StatsCard
          title="Completion Rate"
          value={`${analytics.completionRate}%`}
          icon={CheckCircle2}
        />
        <StatsCard
          title="Avg Response Time"
          value={`${analytics.avgResponseTime}h`}
          icon={Clock}
        />
        <StatsCard
          title="Active Providers"
          value={analytics.activeProviders}
          icon={TrendingUp}
        />
      </div>

      {/* Detailed Analytics */}
      <Card className="shadow-md hover:shadow-lg border-2 transition-all dark:bg-slate-900/40 bg-white dark:backdrop-blur-xl dark:border-slate-700/50 border-gray-200">
        <div className="p-6 border-b dark:border-slate-700/50 border-gray-200">
          <h2 className="text-xl font-bold dark:text-white text-gray-900">Request Statistics</h2>
        </div>
        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="dark:bg-slate-800/50 bg-gray-100">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 dark:text-white text-gray-900">Status Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: 'Pending', value: requests.filter((r) => r.status === 'pending').length, color: 'dark:bg-yellow-900/40 bg-yellow-100 border dark:border-yellow-700/50 border-yellow-300 dark:hover:bg-yellow-900/60 hover:bg-yellow-200' },
                      { label: 'Assigned', value: requests.filter((r) => r.status === 'assigned').length, color: 'dark:bg-blue-900/40 bg-blue-100 border dark:border-blue-700/50 border-blue-300 dark:hover:bg-blue-900/60 hover:bg-blue-200' },
                      { label: 'In Progress', value: requests.filter((r) => r.status === 'in_progress').length, color: 'dark:bg-orange-900/40 bg-orange-100 border dark:border-orange-700/50 border-orange-300 dark:hover:bg-orange-900/60 hover:bg-orange-200' },
                      { label: 'Completed', value: requests.filter((r) => r.status === 'completed').length, color: 'dark:bg-green-900/40 bg-green-100 border dark:border-green-700/50 border-green-300 dark:hover:bg-green-900/60 hover:bg-green-200' },
                      { label: 'Cancelled', value: requests.filter((r) => r.status === 'cancelled').length, color: 'dark:bg-slate-700/40 bg-slate-100 border dark:border-slate-600/50 border-slate-300 dark:hover:bg-slate-700/60 hover:bg-slate-200' },
                    ].map((status) => (
                      <div key={status.label} className={`${status.color} p-4 rounded-lg text-center transition`}>
                        <p className="text-2xl font-bold dark:text-white text-gray-900">{status.value}</p>
                        <p className="text-sm dark:text-slate-300 text-gray-600">{status.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="providers" className="mt-6">
              <div>
                <h3 className="font-semibold dark:text-white text-gray-900 mb-4">Provider Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b dark:border-slate-700/50 border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold dark:text-white text-gray-900">Provider</th>
                        <th className="text-left py-3 px-4 font-semibold dark:text-white text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold dark:text-white text-gray-900">Jobs Done</th>
                        <th className="text-left py-3 px-4 font-semibold dark:text-white text-gray-900">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider) => (
                        <tr key={provider.id} className="border-b dark:border-slate-700/30 border-gray-100 dark:hover:bg-slate-800/30 hover:bg-gray-50">
                          <td className="py-3 px-4 dark:text-gray-200 text-gray-900">{provider.name}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                provider.status === 'active'
                                  ? 'dark:bg-green-900/40 bg-green-100 dark:text-green-300 text-green-700'
                                  : 'dark:bg-slate-700/40 bg-slate-100 dark:text-slate-300 text-slate-700'
                              }`}
                            >
                              {provider.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 dark:text-gray-200 text-gray-900">{provider.total_jobs_completed}</td>
                          <td className="py-3 px-4 font-semibold dark:text-yellow-400 text-yellow-600">{provider.rating.toFixed(1)} ⭐</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {providers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="dark:text-gray-400 text-gray-600">No providers found</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
