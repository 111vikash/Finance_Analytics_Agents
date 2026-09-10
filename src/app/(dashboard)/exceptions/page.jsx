"use client";

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/app/lib/api";

import StatCards from "@/components/exceptions/StatCards";
import ChartSection from "@/components/exceptions/ChartSection";
import ExceptionTable from "@/components/exceptions/ExceptionTable";
import SummaryPanel from "@/components/exceptions/SummaryPanel";
import AIAssistant from "@/components/exceptions/AIAssistant";
import TopVendors from "@/components/exceptions/TopVendors";

function SkeletonBox({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`} />;
}

function ExceptionsSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans p-6 space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <SkeletonBox className="h-6 w-40" />
          <SkeletonBox className="h-3 w-72" />
          <SkeletonBox className="h-3 w-32" />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <SkeletonBox className="h-8 w-20 rounded-md" />
          <SkeletonBox className="h-8 w-36 rounded-md" />
        </div>
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <SkeletonBox className="h-3 w-24 mb-2" />
            <SkeletonBox className="h-6 w-12 mb-2" />
            <SkeletonBox className="h-3 w-16" />
          </div>
        ))}

        <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between col-span-2 md:col-span-1">
          <SkeletonBox className="h-3 w-28 mb-2" />
          <SkeletonBox className="h-6 w-20 mb-2" />
          <SkeletonBox className="h-3 w-28" />
        </div>
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div className="flex justify-between items-center mb-2">
              <SkeletonBox className="h-4 w-32" />
              <SkeletonBox className="h-3 w-20" />
            </div>
            <div className="flex items-center gap-4 py-1 h-32">
              <SkeletonBox className="w-24 h-24 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <SkeletonBox className="h-3 w-full" />
                <SkeletonBox className="h-3 w-4/5" />
                <SkeletonBox className="h-3 w-3/4" />
                <SkeletonBox className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top vendors skeleton */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
          <SkeletonBox className="h-4 w-52" />
          <SkeletonBox className="h-3 w-12" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <SkeletonBox className="h-3 w-40" />
              <SkeletonBox className="h-3 w-16" />
              <SkeletonBox className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* AI assistant skeleton */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full space-y-3">
          <SkeletonBox className="h-4 w-72" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-slate-50/60 border border-slate-100 p-2">
                <SkeletonBox className="h-8 w-8 rounded-full mx-auto mb-2" />
                <SkeletonBox className="h-3 w-14 mx-auto mb-1" />
                <SkeletonBox className="h-2 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-48 rounded-xl p-3 border border-purple-100 bg-purple-50/40 space-y-2">
          <SkeletonBox className="h-3 w-28 mx-auto" />
          <SkeletonBox className="h-8 w-16 mx-auto" />
          <SkeletonBox className="h-3 w-20 mx-auto" />
          <SkeletonBox className="h-3 w-24 mx-auto" />
        </div>
      </div>

      {/* Main section skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <SkeletonBox className="h-4 w-28" />
              <SkeletonBox className="h-5 w-10 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-8 w-20 rounded-md" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-10 gap-3">
                {Array.from({ length: 10 }).map((_, j) => (
                  <SkeletonBox key={j} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4 flex justify-between items-center">
            <SkeletonBox className="h-3 w-48" />
            <div className="flex gap-2">
              <SkeletonBox className="h-8 w-8 rounded" />
              <SkeletonBox className="h-8 w-8 rounded" />
              <SkeletonBox className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>

        {/* summary panel */}
        <div className="lg:col-span-1 lg:sticky lg:top-6 bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
          <SkeletonBox className="h-4 w-36" />
          <SkeletonBox className="h-3 w-24" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBox key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-32" />
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBox key={i} className="h-10 w-full rounded-lg" />
            ))}
          </div>
          <SkeletonBox className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ExceptionsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedException, setSelectedException] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/api/exceptions/full");
        const data = res.data || {};
        setDashboard(data);

        const firstRow = data?.openExceptions?.data?.[0] || null;
        setSelectedException(firstRow);
      } catch (error) {
        console.error("Error fetching exceptions dashboard:", error);
        setDashboard(null);
        setSelectedException(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openExceptionRows = useMemo(() => {
    return dashboard?.openExceptions?.data || [];
  }, [dashboard]);

  if (loading) {
    return <ExceptionsSkeleton />;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans p-6 space-y-6">
      {/* 1. Dashboard Top Bar Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Exceptions</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify, analyze and resolve all reconciliation exceptions
          </p>
          {dashboard?.lastUpdated && (
            <p className="text-[11px] text-slate-400 mt-1">
              Last updated: {dashboard.lastUpdated}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded bg-white text-slate-700 hover:bg-slate-50 transition shadow-xs">
            Export
          </button>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition flex items-center gap-1 shadow-xs">
            Download Exceptions <span className="text-[10px] ml-0.5">▼</span>
          </button>
        </div>
      </div>

      <StatCards data={dashboard?.kpiCards || []} />

      <ChartSection
        exceptionsByType={dashboard?.exceptionsByType || []}
        exceptionsByPriority={dashboard?.exceptionsByPriority || []}
        slaEscalation={dashboard?.slaEscalation || {}}
      />

      <TopVendors data={dashboard?.topVendors || []} />

      <AIAssistant aiStats={dashboard?.aiStats || {}} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800">Open Exceptions</h2>
              <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-xs">
                {dashboard?.openExceptions?.total || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                View All Exceptions
              </button>
              <button className="px-2 py-1 border border-slate-200 text-xs font-medium rounded bg-white text-slate-600 hover:bg-slate-50 transition flex items-center gap-1">
                🎛️ Filters
              </button>
            </div>
          </div>

          <ExceptionTable
            data={openExceptionRows}
            onSelectRow={setSelectedException}
            selectedId={selectedException?.exceptionId}
            total={dashboard?.openExceptions?.total || 0}
          />
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-6">
          <SummaryPanel selected={selectedException} />
        </div>
      </div>
    </div>
  );
}