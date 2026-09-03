"use client";

import {
  ChevronRight,
  Users,
  Database,
  CheckCircle,
  FileSearch,
  Settings2,
  TriangleAlert,
  FileKey2,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

export const SecurityGovernance = () => {
  const securityItems = [
    {
      icon: Users,
      title: "RBAC Management",
      desc: "Manage roles and permissions",
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
      desc: "System and user activity logs",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: ShieldCheck,
      title: "Compliance Monitoring",
      desc: "Track compliance and certifications",
      color: "text-slate-500",
      bg: "bg-slate-100",
    },
  ];

  const integrations = [
    {
      name: "SAP S/4HANA",
      logo: "SAP",
      logoClass: "bg-blue-600 text-white",
    },
    {
      name: "Oracle ERP Cloud",
      logo: "O",
      logoClass: "bg-red-500 text-white",
    },
    {
      name: "Coupa",
      logo: "C",
      logoClass: "bg-sky-500 text-white",
    },
    {
      name: "Ariba Network",
      logo: "A",
      logoClass: "bg-amber-500 text-white",
    },
    {
      name: "Microsoft Teams",
      logo: "T",
      logoClass: "bg-indigo-600 text-white",
    },
    {
      name: "Outlook",
      logo: "O",
      logoClass: "bg-blue-500 text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Security & Governance */}

      <div>
        <div className="h-full rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-slate-200 p-4">
            <div className="flex h-5 w-5 items-center justify-center rounded border border-purple-300 bg-purple-50">
              <Settings2 className="h-3 w-3 text-purple-600" />
            </div>

            <h2 className="text-sm font-bold text-slate-800">
              8. Security & Governance
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 p-3">
            {securityItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  className="flex w-full items-center justify-between border-b border-slate-100 py-3 last:border-b-0 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}
                    >
                      <Icon
                        className={`h-5 w-5 ${item.color}`}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </p>

                      <p className="text-xs text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4 text-blue-600" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Integration Management */}

      <div>
        <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200 p-4">
            <Database className="h-5 w-5 text-purple-600" />

            <h2 className="text-sm font-bold text-slate-800">
              9. Integration Management
            </h2>
          </div>

          {/* Integration List */}
          <div className="flex-1">
            {integrations.map((integration, index) => (
              <button
                key={integration.name}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition ${
                  index !== integrations.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                {/* Left Side */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded ${integration.logoClass}`}
                  >
                    <span className="text-xs font-bold">
                      {integration.logo}
                    </span>
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    {integration.name}
                  </span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />

                    <span className="text-sm font-medium text-slate-500">
                      Connected
                    </span>
                  </div>

                  <ChevronRight className="h-5 w-5 text-blue-500" />
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200">
            <button className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-blue-600 hover:bg-slate-50">
              <span className="cursor-pointer">
                Manage Integrations
              </span>

              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}