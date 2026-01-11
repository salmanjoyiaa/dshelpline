'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
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
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeJobs: 0,
    totalProviders: 0,
    completedThisMonth: 0,
  });
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
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

        // Use dummy data for zuhab@propertyagent.com
        if (user.email?.toLowerCase() === 'zuhab@propertyagent.com') {
          setStats({
            totalRequests: 24,
            activeJobs: 8,
            totalProviders: 12,
            completedThisMonth: 16,
          });

          setRecentRequests([
            {
              id: '1',
              title: 'Hot Tub Maintenance',
              description: 'Hot tub needs filter cleaning and water treatment',
              status: 'in_progress',
              priority: 'high',
              created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              organization_id: 'demo',
              service_type: null,
              assigned_provider_id: 'p1',
              service_providers: {
                id: 'p1',
                name: 'John Smith',
                phone: '555-0101',
                email: 'john@example.com',
                status: 'active',
                rating: 4.8,
                organization_id: 'demo',
                total_jobs_completed: 45,
                deleted_at: null,
                created_at: new Date('2024-01-01').toISOString(),
                updated_at: new Date('2024-01-17').toISOString(),
              }
            },
            {
              id: '2',
              title: 'Pool Cleaning',
              description: 'Weekly pool cleaning and chemical balance',
              status: 'completed',
              priority: 'medium',
              created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              organization_id: 'demo',
              service_type: null,
              assigned_provider_id: 'p2',
              service_providers: {
                id: 'p2',
                name: 'Maria Garcia',
                phone: '555-0102',
                email: 'maria@example.com',
                status: 'active',
                rating: 4.9,
                organization_id: 'demo',
                total_jobs_completed: 52,
                deleted_at: null,
                created_at: new Date('2024-01-01').toISOString(),
                updated_at: new Date('2024-01-17').toISOString(),
              }
            },
            {
              id: '3',
              title: 'WiFi Router Setup',
              description: 'Install and configure WiFi router for property',
              status: 'assigned',
              priority: 'medium',
              created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              organization_id: 'demo',
              service_type: null,
              assigned_provider_id: 'p3',
              service_providers: {
                id: 'p3',
                name: 'Tech Solutions',
                phone: '555-0103',
                email: 'tech@example.com',
                status: 'active',
                rating: 4.7,
                organization_id: 'demo',
                total_jobs_completed: 38,
                deleted_at: null,
                created_at: new Date('2024-01-02').toISOString(),
                updated_at: new Date('2024-01-17').toISOString(),
              }
            },
          ]);

          setLoading(false);
          return;
        }

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
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-400">Welcome back! Here's what's happening today.</p>
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
            />
            <StatsCard
              title="Active Jobs"
              value={stats.activeJobs}
              icon={Clock}
              variant="warning"
            />
            <StatsCard
              title="Total Providers"
              value={stats.totalProviders}
              icon={Users}
              variant="default"
            />
            <StatsCard
              title="Completed This Month"
              value={stats.completedThisMonth}
              icon={CheckCircle2}
              variant="success"
            />
          </>
        )}
      </div>

      {/* Recent Requests */}
      <Card className="shadow-md hover:shadow-lg border-2 transition-all bg-slate-900/40 backdrop-blur-xl border-slate-700/50">
        <div className="p-6 border-b flex items-center justify-between border-slate-700/50">
          <h2 className="text-xl font-bold text-white">Recent Requests</h2>
          <Link href="/dashboard/requests">
            <Button variant="outline" className="transition-colors border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:text-white">View All</Button>
          </Link>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 rounded animate-pulse bg-slate-700/50" />
              ))}
            </div>
          ) : recentRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">No requests yet</p>
            </div>
          ) : (
            <RequestsTable
              requests={recentRequests}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
