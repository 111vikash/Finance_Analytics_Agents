"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAutoLogin } from "@/app/hooks/useAutoLogin";
import fetchSettingsPageData from "@/app/lib/settings";
import {
  ChevronRight,
  Settings,
  Shield,
  Zap,
  Users,
  MessageSquare,
  Gauge,
  Database,
  Workflow,
  AlertCircle,
  CheckCircle,
  ScanLine,
  Copy,
  Clock,
  Clock3,
  FlaskConical,
  Plus,
  Pencil,
  BadgeAlert,
  Trash2,
  CopyCheck,
  ClipboardCheck,
  MailSearch,
  FileSearch,
  FileWarning,
  FileText,
  UserRound,
  Settings2,
  TriangleAlert,
  FileKey2,
  ClipboardList,
  ShieldCheck,
  Bot,
  UsersRound,
  ChevronDown,
} from "lucide-react";

export default function SettingsPage() {
  const { loading: authLoading, error: authError } = useAutoLogin();

  const {
    data: settingsData,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["settingsPage"],
    queryFn: fetchSettingsPageData,
    enabled: !authLoading && !authError,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const [expandedSection, setExpandedSection] = useState("ai-config");
  const [confidence, setConfidence] = useState(85);
  const [settings, setSettings] = useState({
    "Auto Resolution": true,
    "Learning Mode": true,
    "Escalation Intelligence": true,
    "Root Cause Analysis": true,
    "Predictive Exception Detection": true,
  });

  const kpiData = useMemo(() => {
    const apiKpis = settingsData?.kpis || [];
    const iconMap = {
      "Active Reconciliation Rules": {
        icon: <Bot className="h-6 w-6 text-purple-600" />,
        bg: "bg-purple-100",
        valueColor: "text-slate-900",
      },
      "AI Models Configured": {
        icon: <Settings2 className="h-6 w-6 text-blue-600" />,
        bg: "bg-blue-100",
        valueColor: "text-slate-900",
      },
      "Vendor Profiles": {
        icon: <UsersRound className="h-6 w-6 text-purple-600" />,
        bg: "bg-purple-100",
        valueColor: "text-slate-900",
      },
      "Automation Coverage": {
        icon: <Gauge className="h-6 w-6 text-green-600" />,
        bg: "bg-green-100",
        valueColor: "text-slate-900",
      },
      "Approval Workflows": {
        icon: <ClipboardCheck className="h-6 w-6 text-purple-600" />,
        bg: "bg-purple-100",
        valueColor: "text-slate-900",
      },
      "Security Policies": {
        icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
        bg: "bg-green-100",
        valueColor: "text-green-600",
      },
    };

    return apiKpis.map((kpi) => ({
      ...kpi,
      ...iconMap[kpi.label],
      changeColor: kpi.isTrendPositive ? "text-green-600" : "text-slate-500",
    }));
  }, [settingsData]);

  const vendorItems = [
    {
      title: "Vendor Master Sync",
      description: settingsData?.supplierCount
        ? `${settingsData.supplierCount} vendor profiles available`
        : "Sync vendor data from ERP",
      icon: Database,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Risk Scoring Setup",
      description: "Configure vendor risk parameters",
      icon: Shield,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      title: "Communication Preferences",
      description: settingsData?.raw?.comms?.lastUpdated
        ? `Last updated ${settingsData.raw.comms.lastUpdated}`
        : "Set vendor communication channels",
      icon: MessageSquare,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Statement Format Mapping",
      description: "Map vendor statement formats",
      icon: FileText,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Portal Access Settings",
      description: "Manage vendor portal access",
      icon: Settings,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  const slaItems = [
    { label: "Open Exception", days: "Day 0", dot: "bg-green-500" },
    { label: "Reminder 1", days: "2 Days", dot: "bg-blue-600" },
    { label: "Reminder 2", days: "5 Days", dot: "bg-blue-600" },
    { label: "Escalation L1", days: "7 Days", dot: "bg-orange-500" },
    { label: "Escalation L2", days: "10 Days", dot: "bg-orange-500" },
    { label: "Management Escalation", days: "15 Days", dot: "bg-red-500" },
  ];

  const integrations = [
    { name: "SAP S/4HANA", logo: "SAP", logoClass: "bg-blue-600 text-white" },
    { name: "Oracle ERP Cloud", logo: "O", logoClass: "bg-red-500 text-white" },
    { name: "Coupa", logo: "C", logoClass: "bg-sky-500 text-white" },
    { name: "Ariba Network", logo: "A", logoClass: "bg-amber-500 text-white" },
    { name: "Microsoft Teams", logo: "T", logoClass: "bg-indigo-600 text-white" },
    { name: "Outlook", logo: "O", logoClass: "bg-blue-500 text-white" },
  ];

  const templateData = useMemo(() => {
    return (
      settingsData?.templateCounts || [
        { label: "Initial Statement Request", count: 8 },
        { label: "Missing Invoice Request", count: 5 },
        { label: "Credit Memo Clarification", count: 6 },
        { label: "Payment Confirmation", count: 4 },
        { label: "Balance Confirmation", count: 5 },
        { label: "Escalation Notice", count: 3 },
      ]
    );
  }, [settingsData]);

  const recentChanges = useMemo(() => {
    return (
      settingsData?.recentChanges || [
        { icon: "📋", label: "Rule RR-015 Updated", time: "10:30 AM", date: "15 May 2026" },
        { icon: "📋", label: "SLA Policy Modified", time: "04:30 PM", date: "15 May 2026" },
        { icon: "➕", label: "New User Template Added", time: "11:15 AM", date: "15 May 2026" },
        { icon: "🔄", label: "Workflow Updated", time: "03:45 PM", date: "14 May 2026" },
        { icon: "🤖", label: "AI Model Retrained", time: "09:30 AM", date: "14 May 2026" },
      ]
    );
  }, [settingsData]);

  const rulesTableData = [
    { id: "RR-001", desc: "Invoice Match", type: "Automated", status: "Active", date: "16 May 2026" },
    { id: "RR-002", desc: "Credit Memo Validation", type: "Automated", status: "Active", date: "15 May 2026" },
    { id: "RR-003", desc: "Duplicate Payment Check", type: "Semi-Auto", status: "Active", date: "16 May 2026" },
    { id: "RR-004", desc: "Amount Tolerance Check", type: "Automated", status: "Active", date: "14 May 2026" },
    { id: "RR-005", desc: "GL Account Validation", type: "Automated", status: "Active", date: "13 May 2026" },
  ];

  const securityCards = useMemo(() => {
    const roleCount = settingsData?.rbacSummary?.length || 0;
    const securityEventCount = settingsData?.securityEvents?.length || 0;

    return [
      {
        icon: Users,
        title: "RBAC Management",
        desc: roleCount ? `${roleCount} roles configured` : "Manage roles and permissions",
        color: "text-purple-600",
        bg: "bg-purple-50",
      },
      {
        icon: TriangleAlert,
        title: "Azure AD Integration",
        desc: "Single sign-on and directory sync",
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        icon: FileKey2,
        title: "SoD Controls",
        desc: "Segregation of duties setup",
        color: "text-sky-600",
        bg: "bg-sky-50",
      },
      {
        icon: ClipboardList,
        title: "Data Retention Policies",
        desc: "Configure data retention rules",
        color: "text-orange-500",
        bg: "bg-orange-50",
      },
      {
        icon: FileSearch,
        title: "Audit Logging",
        desc: settingsData?.auditTotal
          ? `${settingsData.auditTotal} audit events available`
          : "System and user activity logs",
        color: "text-green-600",
        bg: "bg-green-50",
      },
      {
        icon: ShieldCheck,
        title: "Compliance Monitoring",
        desc: securityEventCount
          ? `${securityEventCount} recent security events checked`
          : "Track compliance and certifications",
        color: "text-slate-500",
        bg: "bg-slate-100",
      },
    ];
  }, [settingsData]);

  if (authLoading || queryLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl text-slate-600">Loading configuration...</div>
      </div>
    );
  }

  if (authError || queryError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mx-auto max-w-7xl text-red-600">
          Error: {(authError || queryError)?.message || "Failed to load configuration data"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>
          </div>
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm hover:text-blue-800"
            >
              Configuration Audit Log
              <ChevronRight className="h-3 w-3 text-blue-600" />
            </a>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {kpiData.map((kpi, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${kpi.bg}`}>
                  {kpi.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
                    {kpi.label}
                  </p>
                  <div className={`mt-1 text-2xl font-bold ${kpi.valueColor}`}>{kpi.value}</div>
                  <p className={`mt-1 text-xs font-semibold ${kpi.changeColor}`}>{kpi.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <Settings className="h-4 w-4 text-purple-600" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-800">1. AI Agent Configuration</h2>
                </div>

                <div className="p-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Confidence Threshold</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-600">{confidence}%</span>
                        <div className="relative w-28">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={confidence}
                            onChange={(e) => setConfidence(Number(e.target.value))}
                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                          />
                          <div className="h-1.5 rounded-full bg-slate-200">
                            <div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{ width: `${confidence}%` }} />
                          </div>
                          <div
                            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white shadow-sm transition-all"
                            style={{ left: `calc(${confidence}% - 8px)` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Auto Resolution", desc: "Automatically resolve eligible items" },
                      { title: "Learning Mode", desc: "Continuous learning from outcomes" },
                      { title: "Escalation Intelligence", desc: "AI-based escalation recommendations" },
                      { title: "Root Cause Analysis", desc: "Identify and learn from exception patterns" },
                      { title: "Predictive Exception Detection", desc: "Detect exceptions before they occur" },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setSettings((prev) => ({
                              ...prev,
                              [item.title]: !prev[item.title],
                            }))
                          }
                          className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                            settings[item.title] ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
                              settings[item.title] ? "right-1" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="flex w-full items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                  <span>View AI Agent Settings</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-4 py-3">
                  <h3 className="text-sm font-bold text-slate-800">Agent Health</h3>
                </div>

                <div className="flex h-[calc(100%-53px)] flex-col p-4">
                  {[
                    {
                      label: "AI Accuracy",
                      value: settingsData?.agentHealth?.aiAccuracy ?? "96.2%",
                      change: settingsData?.agentHealth?.aiAccuracyChange ?? "↑ 4.1%",
                    },
                    {
                      label: "Auto Resolution Rate",
                      value: settingsData?.agentHealth?.autoResolution ?? "58%",
                      change: settingsData?.agentHealth?.autoResolutionChange ?? "↑ 7.5%",
                    },
                    {
                      label: "Rule Success Rate",
                      value: settingsData?.agentHealth?.ruleSuccess ?? "94%",
                      change: settingsData?.agentHealth?.ruleSuccessChange ?? "↑ 3.8%",
                    },
                  ].map((metric, idx) => (
                    <div key={metric.label}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="mb-1 text-sm font-medium text-slate-700">{metric.label}</p>
                          <svg className="h-8 w-[160px]" viewBox="0 0 160 30" fill="none">
                            <path
                              d="M2 18 L18 17 L30 18 L42 14 L56 16 L70 15 L84 9 L98 16 L112 13 L126 16 L142 12 L158 13"
                              stroke="#9EDBB3"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="text-right">
                          <p className="text-[20px] font-bold leading-none text-slate-800">{metric.value}</p>
                          <p className="mt-1 text-xs font-semibold text-green-500">{metric.change}</p>
                        </div>
                      </div>
                      {idx < 2 && <div className="my-3 border-b border-slate-100" />}
                    </div>
                  ))}

                  <div className="flex-1" />

                  <div className="flex items-end justify-between border-t border-slate-100 pt-3">
                    <div>
                      <p className="mb-1 text-sm text-slate-700">Learning Status</p>
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${settingsData?.agentHealth?.isLive ? "bg-green-500" : "bg-slate-400"}`} />
                        <span className={`text-lg font-semibold ${settingsData?.agentHealth?.isLive ? "text-green-600" : "text-slate-500"}`}>
                          {settingsData?.agentHealth?.isLive ? "Active — Live" : "Active"}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Model</p>
                      <p className="text-lg font-semibold text-slate-700">v2.4</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <ScanLine className="h-3 w-3 text-purple-600" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-sm font-bold text-slate-800">2. Reconciliation Rules Management</h2>
                </div>

                <div className="flex flex-wrap gap-2 p-4 pb-3">
                  <button className="flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700">
                    <Plus className="h-3.5 w-3.5" /> Add Rule
                  </button>
                  <button className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <Pencil className="h-3.5 w-3.5 text-blue-600" /> Edit
                  </button>
                  <button className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <Copy className="h-3.5 w-3.5 text-blue-600" /> Clone
                  </button>
                  <button className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                    <FlaskConical className="h-3.5 w-3.5 text-blue-600" /> Test Rule
                  </button>
                </div>

                <div className="flex-1 px-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-3 text-left font-semibold text-slate-600">Rule ID</th>
                          <th className="py-3 text-left font-semibold text-slate-600">Description</th>
                          <th className="py-3 text-left font-semibold text-slate-600">Type</th>
                          <th className="py-3 text-left font-semibold text-slate-600">Status</th>
                          <th className="py-3 text-left font-semibold text-slate-600">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rulesTableData.map((rule) => (
                          <tr key={rule.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 font-semibold text-blue-600">{rule.id}</td>
                            <td className="py-3 text-slate-700">{rule.desc}</td>
                            <td className="py-3 text-slate-600">{rule.type}</td>
                            <td className="py-3"><span className="font-semibold text-green-600">{rule.status}</span></td>
                            <td className="py-3 text-slate-500">{rule.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <button className="mt-auto flex w-full items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                  <span className="cursor-pointer">View All Rules</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-purple-300 bg-purple-50">
                    <BadgeAlert className="h-3 w-3 text-purple-600" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-sm font-bold text-slate-800">3. Exception Configuration</h2>
                </div>

                <div className="flex-1 p-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      { icon: Trash2, title: "Missing Invoice Logic", color: "text-blue-600", bg: "bg-blue-50" },
                      { icon: CopyCheck, title: "Duplicate Detection Settings", color: "text-purple-600", bg: "bg-purple-50" },
                      { icon: ClipboardCheck, title: "Balance Mismatch Rules", color: "text-sky-600", bg: "bg-sky-50" },
                      { icon: MailSearch, title: "Unapplied Payment Logic", color: "text-purple-600", bg: "bg-purple-50" },
                      { icon: FileSearch, title: "Credit Note Validation", color: "text-green-600", bg: "bg-green-50" },
                      { icon: FileWarning, title: "Materiality Thresholds", color: "text-orange-500", bg: "bg-orange-50" },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={index}
                          className="flex min-h-[115px] flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4 text-center transition-all hover:border-blue-200 hover:shadow-sm"
                        >
                          <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${item.bg}`}>
                            <Icon className={`h-5 w-5 ${item.color}`} strokeWidth={2} />
                          </div>
                          <span className="text-sm font-semibold leading-5 text-slate-700">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                  <span className="cursor-pointer">View All Exception Settings</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="h-full rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Users className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">4. Vendor Configuration</h2>
                </div>

                <div className="p-4">
                  <div className="space-y-1">
                    {vendorItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.title}
                          className="w-full border-b border-slate-100 py-3 transition last:border-0 hover:bg-slate-50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconBg}`}>
                                <Icon className={`h-5 w-5 ${item.iconColor}`} />
                              </div>
                              <div className="text-left">
                                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                                <p className="text-xs text-slate-500">{item.description}</p>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-blue-500" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Clock3 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">5. SLA Configuration</h2>
                </div>

                <div className="flex-1 p-5">
                  <div className="relative">
                    <div className="absolute bottom-2 left-[11px] top-2 w-[2px] bg-slate-200" />
                    <div className="space-y-6">
                      {slaItems.map((item, idx) => (
                        <div key={idx} className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`relative z-10 h-5 w-5 rounded-full border-4 border-white shadow ${item.dot}`} />
                            <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-600">{item.days}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="flex items-center justify-between border-t border-slate-200 px-5 py-4 font-semibold text-blue-600 hover:bg-slate-50">
                  <span className="cursor-pointer">View SLA Policies</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
                  <Workflow className="h-4 w-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-slate-800">6. Approval Workflow Designer</h2>
                </div>

                <div className="flex-1 p-5">
                  <div className="flex items-center justify-center">
                    <div className="w-[145px] rounded-lg border border-blue-200 bg-blue-50 px-3 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <UserRound className="h-4 w-4 text-blue-600" />
                        <span className="text-[13px] font-semibold text-slate-700">AP Analyst</span>
                      </div>
                    </div>
                    <div className="mx-2 flex items-center">
                      <div className="w-8 border-t border-slate-300" />
                      <ChevronRight className="-ml-1 h-4 w-4 text-slate-500" />
                    </div>
                    <div className="w-[180px] rounded-lg border border-green-200 bg-green-50 px-3 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <UserRound className="h-4 w-4 text-green-600" />
                        <span className="text-[13px] font-semibold text-slate-700">AP Team Lead</span>
                      </div>
                    </div>
                    <div className="mx-2 flex items-center">
                      <div className="w-8 border-t border-slate-300" />
                      <ChevronRight className="-ml-1 h-4 w-4 text-slate-500" />
                    </div>
                    <div className="w-[145px] rounded-lg border border-purple-200 bg-purple-50 px-3 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <UserRound className="h-4 w-4 text-purple-600" />
                        <span className="text-[13px] font-semibold text-slate-700">Controller</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-center">
                    <div className="flex w-[560px] justify-end">
                      <div className="flex flex-col items-center">
                        <div className="h-8 border-l border-slate-300" />
                        <ChevronDown className="-mt-1 h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex w-[560px] justify-end">
                      <div className="w-[220px] rounded-lg border border-orange-200 bg-orange-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-orange-500" />
                          <span className="text-[13px] font-semibold text-slate-700">Finance Manager</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-center">
                    <div className="flex w-[560px] justify-end">
                      <div className="flex flex-col items-center">
                        <div className="h-8 border-l border-slate-300" />
                        <ChevronDown className="-mt-1 h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex w-[560px] justify-end">
                      <div className="w-[300px] rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center">
                        <h4 className="text-sm font-semibold text-slate-700">Auto Approval Conditions</h4>
                        <p className="mt-1 text-xs text-slate-500">(Amount, Risk, Confidence)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200">
                  <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                    <span className="cursor-pointer">Manage Workflows</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Recent Changes</h3>
                  <a href="#" className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-800">View All</a>
                </div>

                <div className="space-y-3">
                  {recentChanges.map((change, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0">
                      <div className="mt-0.5 text-lg">{change.icon}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-700">{change.label}</p>
                        <p className="text-[10px] text-slate-500">
                          {change.date}{change.time ? ` at ${change.time}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
              <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <h2 className="text-sm font-bold text-slate-800">7. Communication Templates</h2>
              </div>

              <div className="flex-1">
                {templateData.map((template, index) => (
                  <button
                    key={template.label}
                    className={`w-full px-4 py-3 transition hover:bg-slate-50 ${
                      index !== templateData.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">{template.label}</span>
                      </div>
                      <span className="min-w-[24px] rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                        {template.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-200">
                <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                  <span className="cursor-pointer">Manage All Templates</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
              <h3 className="mb-3 text-sm font-bold text-slate-800">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: "➕", label: "Create New Rule" },
                  { icon: "👥", label: "Add Vendor" },
                  { icon: "⚙️", label: "Import Configuration" },
                  { icon: "📊", label: "AI Optimization Review" },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{action.icon}</span>
                      {action.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-2 border-b border-slate-200 p-4">
                  <div className="flex h-5 w-5 items-center justify-center rounded border border-purple-300 bg-purple-50">
                    <Settings2 className="h-3 w-3 text-purple-600" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-800">8. Security & Governance</h2>
                </div>

                <div className="flex-1 p-3">
                  {securityCards.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        className="flex w-full items-center justify-between border-b border-slate-100 py-3 transition last:border-b-0 hover:bg-slate-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>
                            <Icon className={`h-5 w-5 ${item.color}`} strokeWidth={2} />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Database className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">9. Integration Management</h2>
                </div>

                <div className="flex-1">
                  {integrations.map((integration, index) => (
                    <button
                      key={integration.name}
                      className={`w-full px-4 py-3 transition hover:bg-slate-50 ${
                        index !== integrations.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded ${integration.logoClass}`}>
                            <span className="text-xs font-bold">{integration.logo}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-700">{integration.name}</span>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-slate-500">Connected</span>
                          </div>
                          <ChevronRight className="h-5 w-5 text-blue-500" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-200">
                  <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                    <span className="cursor-pointer">Manage Integrations</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
