"use client";

import React, { useEffect, useState } from "react";
import { getDashboardSummary } from "@/app/lib/dashboard";

import KpiDashboardGrid from "@/components/dashboard/KpiDashboardGrid";
import FinancialCard from "@/components/dashboard/FinancialCard";
import LineTrendChart from "@/components/dashboard/LineTrendChart";
import SLAComplianceChart from "@/components/dashboard/SLAComplianceChart";
import ExceptionsByCategoryChart from "@/components/dashboard/ExceptionsByCategoryChart";
import TopVendorsTable from "@/components/dashboard/TopVendorsTable";
import ReconciliationStatusOverview from "@/components/dashboard/ReconciliationStatusOverview";
import AnalystWorkloadTable from "@/components/dashboard/AnalystWorkloadTable";

// Updated Skeleton layout to match the new unequal row widths
function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 bg-slate-200 rounded"></div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>

      {/* KPI Cards Row Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 rounded-lg"></div>
        ))}
      </div>

      {/* Financial Summary (Small) & Trend Chart (Wide) Row Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-64 bg-slate-200 rounded-lg lg:col-span-1"></div>
        <div className="h-64 bg-slate-200 rounded-lg lg:col-span-2"></div>
      </div>

      {/* Remaining Charts Row Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-72 bg-slate-200 rounded-lg"></div>
        <div className="h-72 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Tables Row Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-80 bg-slate-200 rounded-lg"></div>
        <div className="h-80 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardSummary();
        setDashboardData(data);
      } catch (error) {
        console.error("Error loading dashboard:", error);
        setDashboardData({});
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {dashboardData.title || "Monthly KPI Dashboard"}
        </h1>
        <p className="text-sm text-slate-500">
          Last updated: {dashboardData.lastUpdated}
        </p>
      </div>

      {/* 1. Top KPI Cards */}
      <KpiDashboardGrid kpis={dashboardData.kpis || []} />

      {/* 2. Financial Summary (1/3 width) & Line Trend Chart (2/3 width) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FinancialCard financialKpis={dashboardData.financialKpis || []} />
        </div>
        <div className="lg:col-span-2">
          <LineTrendChart trendData={dashboardData.trendData || []} />
        </div>
      </div>

      {/* 3. SLA Compliance & Exceptions Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SLAComplianceChart
          progressData={[
            { name: "Within TAT", value: dashboardData.slaCompliance?.withinTat || 0, count: dashboardData.slaCompliance?.withinTat || 0 },
            { name: "Breached", value: dashboardData.slaCompliance?.breached || 0, count: dashboardData.slaCompliance?.breached || 0 },
          ]}
          compliancePct={dashboardData.slaCompliance?.percentage ?? "0.0"}
        />

        <ExceptionsByCategoryChart
          barData={(dashboardData.exceptionsByCategory || []).map((item) => ({
            name: item.category,
            value: item.count,
          }))}
        />    <ReconciliationStatusOverview
            data={[
              { name: "Matched", count: 0, percentage: 0, barColor: "bg-emerald-500" },
              { name: "Open", count: 0, percentage: 0, barColor: "bg-blue-500" },
              { name: "Exceptions", count: 61, percentage: 100, barColor: "bg-orange-400" },
            ]}
          />
      </div>

      {/* 4. Reconciliation Status & Both Data Tables Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
     
        <TopVendorsTable data={dashboardData.topVendors || []} />
          <AnalystWorkloadTable data={(dashboardData.analystWorkload || []).slice(0, 5)} />
      </div>
    </div>
  );
}
