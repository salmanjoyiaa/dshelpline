'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useTheme } from '@/lib/theme-context';
import { logger } from '@/lib/logger';
import { ServiceRequest, ServiceProvider } from '@/lib/types';
import { StatsCard } from '@/components/dashboard/stats-card';
import { RequestsTable } from '@/components/dashboard/new-requests-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Users, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const supabase = createClient();
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeJobs: 0,
    totalProviders: 0,
    completedThisMonth: 0,
  });
  const [recentRequests, setRecentRequests] = useState<
    (ServiceRequest & { service_providers?: ServiceProvider | null })[]
  >([]);
  const [userOrg, setUserOrg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Get user's organization
        const { data: userData } = await supabase
          .from('users')
          .select('organization_id')
          .eq('id', user.id)
          .single();

        if (!userData) return;

        setUserOrg(userData.organization_id);

        // Fetch stats
        const { data: allRequests } = await supabase
          .from('service_requests')
          .select('id, status, created_at')
          .eq('organization_id', userData.organization_id)
          .is('deleted_at', null);

        const { data: allProviders } = await supabase
          .from('service_providers')
          .select('id, status')
          .eq('organization_id', userData.organization_id)
          .is('deleted_at', null);

        // Calculate stats
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const totalRequests = allRequests?.length || 0;
        const activeJobs =
          allRequests?.filter((r) => ['assigned', 'in_progress'].includes(r.status))
            .length || 0;
        const totalProviders = allProviders?.length || 0;
        const completedThisMonth =
          allRequests?.filter(
            (r) =>
              r.status === 'completed' &&
              new Date(r.created_at) >= firstDayOfMonth
          ).length || 0;

        setStats({
          totalRequests,
          activeJobs,
          totalProviders,
          completedThisMonth,
        });

        // Fetch recent requests with provider details
        const { data: recent } = await supabase
          .from('service_requests')
          .select(
            `
            *,
            service_providers:assigned_provider_id (
              id,
              name,
              phone,
              email,
              status,
              rating
            )
          `
          )
          .eq('organization_id', userData.organization_id)
          .is('deleted_at', null)
          .order('created_at', { ascending: false })
          .limit(5);

        setRecentRequests(recent || []);
      } catch (error) {
        logger.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-8">
                <Skeleton className="h-12 w-24 mb-4" />
                <Skeleton className="h-8 w-16" />
              </Card>
            ))}
          </>
        ) : (
          <>
            <StatsCard
              title="Total Requests"
              value={stats.totalRequests}
              icon={FileText}
              variant="primary"
              isDarkMode={isDarkMode}
            />
            <StatsCard
              title="Active Jobs"
              value={stats.activeJobs}
              icon={Clock}
              variant="warning"
              isDarkMode={isDarkMode}
            />
            <StatsCard
              title="Total Providers"
              value={stats.totalProviders}
              icon={Users}
              variant="default"
              isDarkMode={isDarkMode}
            />
            <StatsCard
              title="Completed This Month"
              value={stats.completedThisMonth}
              icon={CheckCircle2}
              variant="success"
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </div>

      {/* Recent Requests */}
      <Card className={`shadow-md hover:shadow-lg border-2 transition-all ${isDarkMode ? 'bg-slate-900/40 backdrop-blur-xl border-slate-700/50' : 'bg-white border-gray-300 hover:shadow-xl'}`}>
        <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-700/50' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Recent Requests</h2>
          <Link href="/dashboard/requests">
            <Button variant="outline" className={`transition-colors ${isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'}`}>View All</Button>
          </Link>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`h-12 rounded animate-pulse ${isDarkMode ? 'bg-slate-700/50' : 'bg-gray-200'}`} />
              ))}
            </div>
          ) : recentRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>No requests yet</p>
            </div>
          ) : (
            <RequestsTable
              requests={recentRequests}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
