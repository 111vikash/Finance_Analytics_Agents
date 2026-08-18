"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/app/lib/api";
import { Download } from "lucide-react";
import { Button } from "@/components/common/Button";
import FinancialCard from "@/components/dashboard/FinancialCard";
import LineTrendChart from "@/components/dashboard/LineTrendChart";
import KpiDashboardGrid from "@/components/dashboard/KpiDashboardGrid";
import SLAComplianceChart from "@/components/dashboard/SLAComplianceChart";
import ExceptionsByCategoryChart from "@/components/dashboard/ExceptionsByCategoryChart";
import TopVendorsTable from "@/components/dashboard/TopVendorsTable";
import AnalystWorkloadTable from "@/components/dashboard/AnalystWorkloadTable";
import ReconciliationStatusOverview from "@/components/dashboard/ReconciliationStatusOverview";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get("/data/data.json");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!dashboardData) return <div className="p-6">No data found</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="p-4 sm:p-6">
        <div className="mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {dashboardData.title || "Monthly KPI Dashboard"}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Monitor reconciliation performance, SLA compliance, exceptions,
                vendor activity, and team workload from a single operational
                view.
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <Button variant="primary" icon={Download}>
                Export Report
              </Button>

              {dashboardData.lastUpdated && (
                <p className="text-xs font-medium text-slate-500">
                  Last updated: {dashboardData.lastUpdated}
                </p>
              )}
            </div>
          </div>
          <KpiDashboardGrid kpis={dashboardData.kpis || []} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SLAComplianceChart
              progressData={dashboardData.progressData || []}
            />
            <ExceptionsByCategoryChart barData={dashboardData.barData || []} />
            <ReconciliationStatusOverview />
          </div>
          {/* Main layout */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <FinancialCard
                financialKpis={dashboardData.financialKpis || []}
              />
            </div>

            <div className="xl:col-span-3">
              <LineTrendChart trendData={dashboardData.trendData || []} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopVendorsTable data={dashboardData.topVendors || []} />
            <AnalystWorkloadTable data={dashboardData.analystWorkload || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
