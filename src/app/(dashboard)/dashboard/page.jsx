"use client";

import React from "react";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/common/Button";
import FinancialCard from "@/components/dashboard/FinancialCard";
import LineTrendChart from "@/components/dashboard/LineTrendChart";
import KpiDashboardGrid from "@/components/dashboard/KpiDashboardGrid";
import SLAComplianceChart from "@/components/dashboard/SLAComplianceChart";
import ExceptionsByCategoryChart from "@/components/dashboard/ExceptionsByCategoryChart";
import TopVendorsTable from "@/components/dashboard/TopVendorsTable";

import AnalystWorkloadTable from "@/components/dashboard/AnalystWorkloadTable";
import ReconciliationStatusOverview from "@/components/dashboard/ReconciliationStatusOverview";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { getDashboardSummary } from "@/app/lib/dashboard";

// Skeleton placeholder that matches layout
function DashboardSkeleton() {
  const pulse = "animate-pulse rounded-xl bg-slate-200";
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto space-y-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className={`${pulse} h-8 w-72`} />
            <div className={`${pulse} h-4 w-96`} />
          </div>
          <div className={`${pulse} h-10 w-28`} />
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${pulse} h-[140px]`} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`${pulse} h-[220px]`} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className={`${pulse} h-[260px] xl:col-span-2`} />
          <div className={`${pulse} h-[260px] xl:col-span-3`} />
        </div>

        <div className={`${pulse} h-[200px]`} />
        <div className={`${pulse} h-[250px]`} />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const sessionId = useAuthStore((state) => state.sessionId);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    enabled: !!sessionId,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  if (!sessionId) return <DashboardSkeleton />;
  if (isLoading) return <DashboardSkeleton />;

  if (error)
    return (
      <div className="p-6 text-red-600">
        Failed to load dashboard: {error.message}
      </div>
    );

  if (!data) return <DashboardSkeleton />;
console.log('reconStatusData', data.reconStatusData, data.reconTotals)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="p-4 sm:p-6">
        <div className="mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Reconciliation Dashboard
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Monitor reconciliation performance, SLA compliance, exceptions,
                vendor activity, and team workload from a single operational view.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 lg:items-end">
              <div className="flex gap-2">
                <Button variant="ghost" icon={RefreshCw} onClick={() => refetch()}>
                  Refresh
                </Button>
                <Button variant="primary" icon={Download}>
                  Export Report
                </Button>
              </div>

              <p className="text-xs font-medium text-slate-500">
                Last updated: {data.lastUpdated}
              </p>
            </div>
          </div>

          {/* KPI Cards */}
          <KpiDashboardGrid kpis={data.kpis} />

          {/* Middle section */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SLAComplianceChart
              progressData={data.progressData}
              compliancePct={data.compliancePct}
            />
            <ExceptionsByCategoryChart barData={data.barData} />
            <ReconciliationStatusOverview
              
              data={data.reconStatusData}
            />
         
          </div>

          {/* Financial + Trend */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <FinancialCard financialKpis={data.financialKpis} />
            </div>

            <div className="xl:col-span-3">
              <LineTrendChart trendData={data.trendData} />
            </div>
          </div>

          {/* Tables section */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopVendorsTable data={(data.topVendors || []).slice(0, 5)} />
            <AnalystWorkloadTable data={(data.suppliers || []).slice(0, 5)} />
          </div>

       
        </div>
      </div>
    </div>
  );
}