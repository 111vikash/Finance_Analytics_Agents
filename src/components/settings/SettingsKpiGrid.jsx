"use client";
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
 export const SettingsKpiGrid = () => {
   const kpiData = [
  {
    label: "Active Reconciliation Rules",
    value: "156",
    change: "↑ 12 this month",
    icon: <Bot className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "AI Models Configured",
    value: "8",
    change: "↑ 1 this month",
    icon: <Settings2 className="h-6 w-6 text-blue-600" />,
    bg: "bg-blue-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "Vendor Profiles",
    value: "1,248",
    change: "↑ 28 this month",
    icon: <UsersRound className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "Automation Coverage",
    value: "91%",
    change: "↑ 6% vs last month",
    icon: <Gauge className="h-6 w-6 text-green-600" />,
    bg: "bg-green-100",
    valueColor: "text-slate-900",
    changeColor: "text-green-600",
  },
  {
    label: "Approval Workflows",
    value: "24",
    change: "No change",
    icon: <ClipboardCheck className="h-6 w-6 text-purple-600" />,
    bg: "bg-purple-100",
    valueColor: "text-slate-900",
    changeColor: "text-slate-500",
  },
  {
    label: "Security Policies",
    value: "Healthy",
    change: "All policies active",
    icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
    bg: "bg-green-100",
    valueColor: "text-green-600",
    changeColor: "text-slate-500",
  },
  ];
  return (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {kpiData.map((kpi, idx) => (
            <div
              key={idx}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_2px_8px_rgba(15,23,42,0.05)]
                hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)]
                transition
              "
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${kpi.bg}`}
                >
                  {kpi.icon}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:text-[11px]">
                    {kpi.label}
                  </p>

                  <div className={`mt-1 text-2xl font-bold ${kpi.valueColor}`}>
                    {kpi.value}
                  </div>

                  <p className={`mt-1 text-xs font-semibold ${kpi.changeColor}`}>
                    {kpi.change}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
  );
};
