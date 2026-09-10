"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { useAutoLogin } from "@/app/hooks/useAutoLogin";
import { MetricsGrid } from "@/components/approval/MetricsGrid";
import { ApprovalTable } from "@/components/approval/ApprovalTable";
import { RecentSubmissionsTable } from "@/components/approval/RecentSubmissionsTable";
import { SidebarAnalytics } from "@/components/approval/SidebarAnalytics";
import { FollowUpTimeline } from "@/components/approval/FollowUpTimeline";

const fetchApprovalData = async () => {
  console.log("[fetchApprovalData] Calling API...");
  const res = await axiosInstance.get("/api/approvals/full", {
    params: { page: 1, page_size: 10 },
  });
  console.log("[fetchApprovalData] API response:", res.data);
  return res.data;
};

export default function ApprovalCenterPage() {
  const { loading: authLoading, error: authError } = useAutoLogin();
  const sessionId = useAuthStore((state) => state.sessionId);
  const isAuthenticated = !!sessionId;

  console.log("[ApprovalCenterPage] authLoading:", authLoading, "authError:", authError, "sessionId:", sessionId);

  const {
    data,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["approvalDashboard"],
    queryFn: fetchApprovalData,
    enabled: isAuthenticated, // only fetch when session is available
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  if (data) {
    console.log("[ApprovalCenterPage] Data received:", data);
  }

  // Handle auth loading
  if (authLoading) {
    return (
      <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50">
        <div className="text-slate-600">Initializing session...</div>
      </div>
    );
  }

  // Handle auth error
  if (authError) {
    return (
      <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50">
        <div className="text-red-600">
          Authentication failed: {authError?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  // Handle query loading
  if (queryLoading) {
    return (
      <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50">
        <div className="text-slate-600">Loading approval center...</div>
      </div>
    );
  }

  // Handle query error
  if (queryError) {
    console.error("[ApprovalCenterPage] Query error:", queryError);
    return (
      <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50">
        <div className="text-red-600">
          Error: {queryError?.message || "No data found"}
        </div>
      </div>
    );
  }

  // If no data after query completed
  if (!data) {
    return (
      <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50">
        <div className="text-slate-600">No data available.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50 space-y-6 text-slate-800">
      {/* Title Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Approval Center
          </h1>
          <p className="text-sm text-slate-500">
            Review and take action on reconciliation items requiring your approval.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
            🎛️ Filters
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* KPI Financial Metric Badges */}
      <MetricsGrid kpiCards={data.kpiCards || []} />

      {/* Main Core Split Workspace Grid */}
      <div className="grid grid-cols-1 gap-6 items-start">
        <ApprovalTable
          data={data.pendingApprovals?.data || []}
          total={data.pendingApprovals?.total || 0}
        />

        <RecentSubmissionsTable data={data.recentSubmissions || []} />

        <FollowUpTimeline
          steps={data.followUpTimeline?.steps || []}
          currentStep={data.followUpTimeline?.currentStep || 1}
        />

        {/* Right Metric Analytics and Action Boxes */}
        <div className="">
          <SidebarAnalytics
            reconciliationStatus={data.reconciliationStatus || {}}
            slaMonitoring={data.slaMonitoring || {}}
            myWorkload={data.myWorkload || {}}
            lastUpdated={data.lastUpdated || ""}
          />
        </div>
      </div>
    </div>
  );
}