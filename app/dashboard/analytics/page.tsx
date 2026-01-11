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

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
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
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-gray-400">Monitor your business performance</p>
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
      <Card className="shadow-md hover:shadow-lg border-2 transition-all bg-slate-900/40 backdrop-blur-xl border-slate-700/50">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Request Statistics</h2>
        </div>
        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-slate-800/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-white">Status Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: 'Pending', value: requests.filter((r) => r.status === 'pending').length, color: 'bg-yellow-900/40 border border-yellow-700/50 hover:bg-yellow-900/60' },
                      { label: 'Assigned', value: requests.filter((r) => r.status === 'assigned').length, color: 'bg-blue-900/40 border border-blue-700/50 hover:bg-blue-900/60' },
                      { label: 'In Progress', value: requests.filter((r) => r.status === 'in_progress').length, color: 'bg-orange-900/40 border border-orange-700/50 hover:bg-orange-900/60' },
                      { label: 'Completed', value: requests.filter((r) => r.status === 'completed').length, color: 'bg-green-900/40 border border-green-700/50 hover:bg-green-900/60' },
                      { label: 'Cancelled', value: requests.filter((r) => r.status === 'cancelled').length, color: 'bg-slate-700/40 border border-slate-600/50 hover:bg-slate-700/60' },
                    ].map((status) => (
                      <div key={status.label} className={`${status.color} p-4 rounded-lg text-center transition`}>
                        <p className="text-2xl font-bold text-white">{status.value}</p>
                        <p className="text-sm text-slate-300">{status.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="providers" className="mt-6">
              <div>
                <h3 className="font-semibold text-white mb-4">Provider Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-3 px-4 font-semibold text-white">Provider</th>
                        <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-white">Jobs Done</th>
                        <th className="text-left py-3 px-4 font-semibold text-white">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {providers.map((provider) => (
                        <tr key={provider.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                          <td className="py-3 px-4 text-gray-200">{provider.name}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                provider.status === 'active'
                                  ? 'bg-green-900/40 text-green-300'
                                  : 'bg-slate-700/40 text-slate-300'
                              }`}
                            >
                              {provider.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-200">{provider.total_jobs_completed}</td>
                          <td className="py-3 px-4 font-semibold text-yellow-400">{provider.rating.toFixed(1)} ⭐</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {providers.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">No providers found</p>
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
