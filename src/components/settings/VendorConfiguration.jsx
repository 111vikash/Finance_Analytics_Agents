"use client";
import {
  ChevronRight,
  Settings,
  Shield,
  Users,
  MessageSquare,
  Database,
  Clock3,
  FileText,
} from "lucide-react";  
export const VendorConfiguration = () => {
const vendorItems = [
    {
      title: "Vendor Master Sync",
      description: "Sync vendor data from ERP",
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
      description: "Set vendor communication channels",
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
    {
      label: "Open Exception",
      days: "Day 0",
      dot: "bg-green-500",
    },
    {
      label: "Reminder 1",
      days: "2 Days",
      dot: "bg-blue-600",
    },
    {
      label: "Reminder 2",
      days: "5 Days",
      dot: "bg-blue-600",
    },
    {
      label: "Escalation L1",
      days: "7 Days",
      dot: "bg-orange-500",
    },
    {
      label: "Escalation L2",
      days: "10 Days",
      dot: "bg-orange-500",
    },
    {
      label: "Management Escalation",
      days: "15 Days",
      dot: "bg-red-500",
    },
  ];

  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {/* Vendor Configuration */}
              <div className="h-full rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Users className="w-5 h-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">
                    4. Vendor Configuration
                  </h2>
                </div>

                <div className="p-4">
                  <div className="space-y-1">
                    {vendorItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.title}
                          className="w-full flex items-center justify-between py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconBg}`}
                            >
                              <Icon className={`w-5 h-5 ${item.iconColor}`} />
                            </div>

                            <div className="text-left">
                              <p className="text-sm font-semibold text-slate-800">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <ChevronRight className="w-5 h-5 text-blue-500" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            <div>
              {/* SLA Configuration */}
              <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">
  
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 p-4">
                  <Clock3 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-bold text-slate-800">
                    5. SLA Configuration
                  </h2>
                </div>

                {/* Timeline */}
                <div className="flex-1 p-5">
                  <div className="relative">

                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-200" />

                    <div className="space-y-6">
                      {slaItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="relative flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            
                            {/* Dot */}
                            <div
                              className={`relative z-10 h-5 w-5 rounded-full border-4 border-white shadow ${item.dot}`}
                            />

                            {/* Label */}
                            <span className="text-sm font-semibold text-slate-700">
                              {item.label}
                            </span>
                          </div>

                          {/* Days */}
                          <span className="text-sm font-semibold text-slate-600">
                            {item.days}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <button className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-blue-600 font-semibold hover:bg-slate-50">
                  <span className="cursor-pointer">View SLA Policies</span>
                  <ChevronRight className="h-5 w-5" />
                </button>

              </div>
            </div>
          </div>

  );
}