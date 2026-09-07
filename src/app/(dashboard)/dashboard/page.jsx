"use client";

import React from "react";
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
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import { getDashboardSummary } from "@/app/lib/dashboard";

export default function DashboardPage() {
  const sessionId = useAuthStore((state) => state.sessionId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-summary", sessionId],
    queryFn: () => getDashboardSummary(sessionId),
    enabled: !!sessionId,
    staleTime: 0,
  });

  if (!sessionId) return <div className="p-6">Authenticating...</div>;
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6">Failed to load dashboard</div>;
  if (!data) return <div className="p-6">No data found</div>;

  // Map API response to UI shape
  const dashboardData = {
    title: "Monthly KPI Dashboard",
    lastUpdated: new Date().toLocaleDateString(),
    kpis: data.kpis || [],
    progressData: data.reconciliation?.sla || [],
    barData: data.reconciliation?.exceptionCategories || [],
    financialKpis: data.reconciliation?.financialKpis || [],
    trendData: data.trendData || [],
    topVendors: data.supplierDashboard?.topVendors || [],
    analystWorkload: data.supplierDashboard?.analystWorkload || [],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="p-4 sm:p-6">
        <div className="mx-auto space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {dashboardData.title}
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

              <p className="text-xs font-medium text-slate-500">
                Last updated: {dashboardData.lastUpdated}
              </p>
            </div>
          </div>
          <div>
            <h1>Databricks Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <KpiDashboardGrid kpis={dashboardData.kpis} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SLAComplianceChart progressData={dashboardData.progressData} />
            <ExceptionsByCategoryChart barData={dashboardData.barData} />
            <ReconciliationStatusOverview />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <FinancialCard financialKpis={dashboardData.financialKpis} />
            </div>

            <div className="xl:col-span-3">
              <LineTrendChart trendData={dashboardData.trendData} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TopVendorsTable data={dashboardData.topVendors} />
            <AnalystWorkloadTable data={dashboardData.analystWorkload} />
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { AlertTriangle, ArrowUpRight, CheckCircle2, ChevronDown, CircleDollarSign, Download, FileSearch, Landmark, Search, ShieldAlert, Sparkles } from "lucide-react";

// const duplicatePayments = [
//   { id: "DUP-24081", vendor: "Northwind Traders", invoice: "INV-83765", dates: "12 May / 14 May", amount: 1250, confidence: 98, pattern: "Exact invoice", status: "New" },
//   { id: "DUP-24076", vendor: "Contoso Ltd.", invoice: "PAY-55412", dates: "14 May / 15 May", amount: 2800, confidence: 95, pattern: "Same amount", status: "In review" },
//   { id: "DUP-24069", vendor: "Fabrikam Inc.", invoice: "INV-99231", dates: "16 May / 17 May", amount: 3450, confidence: 91, pattern: "Near duplicate", status: "New" },
//   { id: "DUP-24058", vendor: "Adventure Works", invoice: "INV-77340", dates: "18 May / 18 May", amount: 1820, confidence: 88, pattern: "Exact invoice", status: "Escalated" },
//   { id: "DUP-24044", vendor: "Wingtip Toys", invoice: "INV-18062", dates: "20 May / 22 May", amount: 965, confidence: 84, pattern: "Same amount", status: "In review" },
// ];

// const monthlyExposure = [32, 42, 38, 56, 48, 72, 64, 89, 76, 98, 87, 118];
// const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
// const formatCurrency = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

// export default function DashboardPage() {
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All status");
//   const [selected, setSelected] = useState([]);
//   const filteredPayments = duplicatePayments.filter((payment) => `${payment.vendor} ${payment.invoice} ${payment.id}`.toLowerCase().includes(search.toLowerCase()) && (status === "All status" || payment.status === status));
//   const toggleSelected = (id) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
//   const maxExposure = Math.max(...monthlyExposure);

//   return <div className="min-h-full bg-[#f4f7fb] p-4 text-slate-900 sm:p-6"><div className="mx-auto max-w-[1540px] space-y-5">
//     <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#0b57a3]"><span className="h-2 w-2 rounded-full bg-[#00b8ae]" />Accounts payable control center</div><h1 className="text-2xl font-bold tracking-normal text-[#111b38] sm:text-3xl">Duplicate Payment Identification</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Prioritize potential duplicate payments before release and protect working capital.</p></div><div className="flex flex-wrap items-center gap-3"><div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-right shadow-sm"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Last scan</p><p className="mt-0.5 text-sm font-semibold text-slate-700">Today, 08:42 AM</p></div><button className="inline-flex h-10 items-center gap-2 rounded-md bg-[#075aa8] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#064b8c]"><Download size={16} />Export queue</button></div></header>

//     <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Potential duplicate exposure" value="$126.4K" detail="+18.2% versus prior month" icon={CircleDollarSign} tone="blue" /><MetricCard label="Cases detected" value="46" detail="12 require action today" icon={FileSearch} tone="amber" /><MetricCard label="High-confidence matches" value="31" detail="67% of open queue" icon={Sparkles} tone="teal" /><MetricCard label="Amount prevented" value="$84.7K" detail="Resolved this month" icon={CheckCircle2} tone="green" /></section>

//     <section className="grid grid-cols-1 gap-4 xl:grid-cols-12"><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:col-span-7"><div className="flex items-start justify-between gap-4"><div><h2 className="text-sm font-bold text-[#111b38]">Duplicate exposure trend</h2><p className="mt-1 text-xs text-slate-500">Potential duplicate value identified each month</p></div><div className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">Current: $118K</div></div><div className="mt-6 flex h-44 items-end gap-2 sm:gap-3">{monthlyExposure.map((value, index) => <div key={months[index]} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="flex flex-1 items-end"><div className={`w-full rounded-t-sm transition-opacity hover:opacity-80 ${index === monthlyExposure.length - 1 ? "bg-[#e45c59]" : "bg-[#78afd8]"}`} style={{ height: `${(value / maxExposure) * 100}%` }} title={`${months[index]}: ${formatCurrency(value * 1000)}`} /></div><span className="text-center text-[10px] font-medium text-slate-400">{months[index]}</span></div>)}</div></div>
//     <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm xl:col-span-5"><div className="flex items-start justify-between"><div><h2 className="text-sm font-bold text-[#111b38]">How duplicates are detected</h2><p className="mt-1 text-xs text-slate-500">Open cases by matching pattern</p></div><button className="text-slate-400 transition hover:text-[#075aa8]" aria-label="View detection details"><ArrowUpRight size={18} /></button></div><div className="mt-6 grid grid-cols-[112px_1fr] items-center gap-5"><div className="relative grid h-28 w-28 place-items-center rounded-full" style={{ background: "conic-gradient(#075aa8 0 44%, #00a99d 44% 75%, #e6a63b 75% 100%)" }}><div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center"><strong className="text-xl text-[#111b38]">46</strong><span className="text-[10px] font-medium text-slate-400">open cases</span></div></div><div className="space-y-3 text-xs"><PatternItem color="bg-[#075aa8]" label="Exact invoice match" value="44%" /><PatternItem color="bg-[#00a99d]" label="Same amount / vendor" value="31%" /><PatternItem color="bg-[#e6a63b]" label="Near duplicate" value="25%" /></div></div></div></section>

//     <section className="grid grid-cols-1 gap-4 xl:grid-cols-12"><div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm xl:col-span-8"><div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex items-center gap-2"><h2 className="text-sm font-bold text-[#111b38]">Investigation queue</h2><span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700">{filteredPayments.length}</span></div><p className="mt-1 text-xs text-slate-500">Review the highest-risk payments first</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search vendor or invoice" className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none focus:border-[#075aa8] sm:w-48" /></label><label className="relative"><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-9 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-[#075aa8] sm:w-32"><option>All status</option><option>New</option><option>In review</option><option>Escalated</option></select><ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} /></label></div></div><div className="overflow-x-auto"><table className="min-w-[760px] w-full text-left text-xs"><thead className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500"><tr><th className="w-10 px-5 py-3"><span className="sr-only">Select</span></th><th className="px-3 py-3">Payment pair</th><th className="px-3 py-3">Detected dates</th><th className="px-3 py-3">Amount</th><th className="px-3 py-3">Confidence</th><th className="px-3 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100 text-slate-600">{filteredPayments.map((payment) => <tr key={payment.id} className="transition hover:bg-blue-50/40"><td className="px-5 py-4"><input type="checkbox" checked={selected.includes(payment.id)} onChange={() => toggleSelected(payment.id)} className="h-4 w-4 rounded border-slate-300 accent-[#075aa8]" aria-label={`Select ${payment.id}`} /></td><td className="px-3 py-4"><p className="font-semibold text-[#075aa8]">{payment.vendor}</p><p className="mt-1 text-[11px] text-slate-400">{payment.id} · {payment.invoice}</p></td><td className="px-3 py-4 whitespace-nowrap">{payment.dates}</td><td className="px-3 py-4 whitespace-nowrap font-semibold text-slate-800">{formatCurrency(payment.amount)}</td><td className="px-3 py-4"><div className="flex items-center gap-2"><span className="font-semibold text-slate-700">{payment.confidence}%</span><span className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-[#00a99d]" style={{ width: `${payment.confidence}%` }} /></span></div></td><td className="px-3 py-4"><StatusBadge status={payment.status} /></td></tr>)}{filteredPayments.length === 0 && <tr><td colSpan="6" className="px-5 py-12 text-center"><Search className="mx-auto mb-2 text-slate-300" size={22} /><p className="font-semibold text-slate-600">No payment pairs found</p><p className="mt-1 text-xs text-slate-400">Try a different search or status filter.</p></td></tr>}</tbody></table></div><div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500"><span>{selected.length ? `${selected.length} case${selected.length === 1 ? "" : "s"} selected` : "Showing highest-risk cases"}</span><button className="font-semibold text-[#075aa8] hover:underline">View all 46 cases</button></div></div>
//     <aside className="space-y-4 xl:col-span-4"><div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="text-sm font-bold text-[#111b38]">Vendor concentration</h2><p className="mt-1 text-xs text-slate-500">Exposure by supplier</p></div><Landmark size={18} className="text-[#075aa8]" /></div><div className="mt-5 space-y-4"><VendorItem name="Fabrikam Inc." amount="$31.2K" percentage={78} color="bg-[#075aa8]" /><VendorItem name="Contoso Ltd." amount="$24.8K" percentage={62} color="bg-[#00a99d]" /><VendorItem name="Northwind Traders" amount="$18.4K" percentage={46} color="bg-[#e6a63b]" /><VendorItem name="Other vendors" amount="$52.0K" percentage={34} color="bg-slate-400" /></div></div><div className="rounded-lg border border-[#efd7a7] bg-[#fffaf0] p-5"><div className="flex items-start gap-3"><div className="rounded-md bg-amber-100 p-2 text-amber-700"><ShieldAlert size={18} /></div><div><p className="text-sm font-bold text-[#5d430f]">Action needed today</p><p className="mt-1 text-xs leading-5 text-[#735722]">12 high-value payment pairs exceed the 24-hour review target.</p><button className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#9a6500] hover:underline">Review urgent cases <ArrowUpRight size={13} /></button></div></div></div></aside></section>
//   </div></div>;
// }

// function MetricCard({ label, value, detail, icon: Icon, tone }) { const tones = { blue: "bg-blue-50 text-[#075aa8]", amber: "bg-amber-50 text-amber-700", teal: "bg-teal-50 text-teal-700", green: "bg-emerald-50 text-emerald-700" }; return <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-normal text-[#111b38]">{value}</p></div><div className={`rounded-md p-2.5 ${tones[tone]}`}><Icon size={19} /></div></div><p className="mt-3 text-xs text-slate-500">{detail}</p></div>; }
// function PatternItem({ color, label, value }) { return <div className="flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-slate-600"><span className={`h-2.5 w-2.5 rounded-sm ${color}`} />{label}</span><span className="font-bold text-slate-800">{value}</span></div>; }
// function VendorItem({ name, amount, percentage, color }) { return <div><div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-semibold text-slate-700">{name}</span><span className="font-bold text-slate-800">{amount}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} /></div></div>; }
// function StatusBadge({ status }) { const styles = { New: "bg-blue-50 text-blue-700", "In review": "bg-amber-50 text-amber-700", Escalated: "bg-rose-50 text-rose-700" }; return <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${styles[status]}`}><AlertTriangle className="mr-1" size={12} />{status}</span>; }
