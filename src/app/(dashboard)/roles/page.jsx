"use client";

import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "@/app/lib/api";
import { Shield, Users, Eye, CheckCircle2, Settings2, KeyRound, AlertTriangle } from "lucide-react";

const permissionGroups = {
  VIEW: {
    label: "View Access",
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  OVERRIDE: {
    label: "Override Actions",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  APPROVE: {
    label: "Approval Actions",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  REASSIGN: {
    label: "Assignment",
    color: "text-violet-600 bg-violet-50 border-violet-200",
  },
  COMMENT: {
    label: "Collaboration",
    color: "text-sky-600 bg-sky-50 border-sky-200",
  },
  CLOSE: {
    label: "Resolution",
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
  ESCALATE: {
    label: "Escalation",
    color: "text-orange-600 bg-orange-50 border-orange-200",
  },
  SEND: {
    label: "Notifications",
    color: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  DELETE: {
    label: "Admin Actions",
    color: "text-red-600 bg-red-50 border-red-200",
  },
  MANAGE: {
    label: "Administration",
    color: "text-slate-700 bg-slate-100 border-slate-200",
  },
};

function getPermissionGroup(permission) {
  if (permission.startsWith("VIEW")) return permissionGroups.VIEW;
  if (permission.startsWith("OVERRIDE")) return permissionGroups.OVERRIDE;
  if (permission.startsWith("APPROVE")) return permissionGroups.APPROVE;
  if (permission.startsWith("REASSIGN")) return permissionGroups.REASSIGN;
  if (permission.startsWith("COMMENT")) return permissionGroups.COMMENT;
  if (permission.startsWith("CLOSE")) return permissionGroups.CLOSE;
  if (permission.startsWith("ESCALATE")) return permissionGroups.ESCALATE;
  if (permission.startsWith("SEND")) return permissionGroups.SEND;
  if (permission.startsWith("DELETE")) return permissionGroups.DELETE;
  if (permission.startsWith("MANAGE")) return permissionGroups.MANAGE;
  return {
    label: "Other",
    color: "text-slate-600 bg-slate-50 border-slate-200",
  };
}

function RoleCard({ roleName, role }) {
  const permissions = role.permissions || [];
  const permissionCount = permissions.length;

  const grouped = permissions.reduce((acc, perm) => {
    const key = getPermissionGroup(perm).label;
    if (!acc[key]) acc[key] = [];
    acc[key].push(perm);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b57d0]/10">
              <Shield className="h-5 w-5 text-[#0b57d0]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{roleName}</h3>
              <p className="text-xs text-slate-500">{role.scope}</p>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {permissionCount} permissions
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {Object.entries(grouped).map(([groupName, perms]) => {
          const group = getPermissionGroup(perms[0]);

          return (
            <div key={groupName}>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${group.color}`}
                >
                  {groupName}
                </span>
                <span className="text-[11px] text-slate-400">{perms.length}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {perms.map((perm) => (
                  <span
                    key={perm}
                    className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RoleSummary({ roles }) {
  const roleNames = Object.keys(roles || {});
  const totalRoles = roleNames.length;
  const totalPermissions = roleNames.reduce(
    (sum, role) => sum + (roles[role]?.permissions?.length || 0),
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Settings2 className="h-4 w-4 text-[#0b57d0]" />
        <h2 className="text-sm font-bold text-slate-800">Role Summary</h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
            Total Roles
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalRoles}</p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
            Total Permissions
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{totalPermissions}</p>
        </div>

        <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
            Highest Access
          </p>
          <p className="mt-1 text-lg font-bold text-slate-900">Admin</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Access Model
          </p>
          <p className="mt-1 text-lg font-bold text-slate-900">Role-Based</p>
        </div>
      </div>
    </div>
  );
}

function PermissionLegend() {
  const items = [
    { label: "View / Read", icon: Eye, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Action / Approval", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Configuration", icon: Settings2, color: "text-slate-700 bg-slate-100 border-slate-200" },
    { label: "Sensitive Access", icon: AlertTriangle, color: "text-rose-600 bg-rose-50 border-rose-100" },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border ${item.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">{item.label}</p>
            <p className="mt-1 text-xs text-slate-500">
              Categorized permissions for dashboard access and governance.
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function RolesPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axiosInstance.get("/api/config/roles");
        setData(res.data || {});
      } catch (error) {
        console.error("Error loading roles:", error);
        setData({ roles: {} });
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const roles = data?.roles || {};
  const roleEntries = useMemo(() => Object.entries(roles), [roles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-[1400px] space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-8 w-56 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-96 animate-pulse rounded bg-slate-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-[1400px] space-y-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-[#0b57d0] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Roles & Permissions
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80">
                Manage access scopes and permissions across AP roles, auditors, and admins.
              </p>
            </div>

            <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0b57d0] hover:bg-slate-100">
              Export Roles
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <RoleSummary roles={roles} />
          <PermissionLegend />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {roleEntries.map(([roleName, role]) => (
              <RoleCard key={roleName} roleName={roleName} role={role} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}