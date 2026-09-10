"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  UserRound,
  Mail,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import { APP_NAME, ROLE_OPTIONS } from "@/utils/constants";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { loginUser } from "@/app/lib/auth";
import { useAuthStore } from "@/store/auth-store";

const demoUsers = [
  {
    name: "Ava Johnson",
    email: "analyst@capgemini.com",
    role: "AP Analyst",
    scope: "Assigned vendors",
    limit: "$10K",
    permissions: ["View Own", "Override Request", "Comment", "Close Exception"],
    color: "blue",
  },
  {
    name: "Marcus Lee",
    email: "marcus.lee@capgemini.com",
    role: "AP Team Lead",
    scope: "Team vendors",
    limit: "$25K",
    permissions: ["View Team", "Approve Analyst", "Reassign", "Override Request"],
    color: "violet",
  },
  {
    name: "Sophia Patel",
    email: "sophia.patel@capgemini.com",
    role: "AP Manager",
    scope: "All vendors",
    limit: "Unlimited",
    permissions: ["View All", "Approve All", "Escalate", "Send Email", "Delete"],
    color: "emerald",
  },
  {
    name: "vigneshwaran",
    email: "d-vigneshwaran.d-vigneshwaran@capgemini.com",
    role: "Auditor",
    scope: "All vendors (read-only)",
    limit: "$0",
    permissions: ["View All", "View Audit Trail", "Export Reports"],
    color: "amber",
  },
  {
    name: "venkatraman",
    email: "venkatraman.a.m@capgemini.com",
    role: "Admin",
    scope: "Full access",
    limit: "Unlimited",
    permissions: ["All Permissions", "Manage Users", "Manage Rules", "Manage Config"],
    color: "rose",
  },
];

const colorMap = {
  blue:    { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",   ring: "ring-blue-400"    },
  violet:  { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200", ring: "ring-violet-400"  },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",ring: "ring-emerald-400" },
  amber:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",  ring: "ring-amber-400"  },
  rose:    { bg: "bg-rose-50",    text: "text-rose-700",    border: "border-rose-200",   ring: "ring-rose-400"   },
};

export default function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLE_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectDemoUser = (user) => {
    setEmail(user.email);
    setRole(user.role);
    setError("");
  };

  const handleSignIn = async () => {
    if (!email.trim()) {
      setError("Please enter an email or select a demo user.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginUser(email, role);
      setSession(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="page-container flex min-h-screen items-center justify-center py-8">
        <div className="grid w-full max-w-6xl items-start gap-8 lg:grid-cols-2">

          {/* Left — branding + demo users */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles className="h-4 w-4" />
              AI-powered reconciliation
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {APP_NAME}
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600">
                Secure, role-based reconciliation workspace for AP teams, approvals,
                vendor collaboration, and audit visibility.
              </p>
            </div>

            {/* Demo users — click to auto-fill */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <BadgeCheck className="h-4 w-4 text-blue-600" />
                Quick login — click any user
              </div>

              <div className="space-y-2">
                {demoUsers.map((user) => {
                  const c = colorMap[user.color];
                  const isSelected = email === user.email && role === user.role;

                  return (
                    <button
                      key={user.email}
                      type="button"
                      onClick={() => selectDemoUser(user)}
                      className={`w-full rounded-xl border p-4 text-left transition
                        ${isSelected
                          ? `${c.border} ${c.bg} ring-2 ${c.ring}`
                          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900">{user.name}</p>
                          <p className="truncate text-xs text-slate-500">{user.email}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${c.bg} ${c.text}`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>Scope: {user.scope}</span>
                        <span>·</span>
                        <span>Limit: {user.limit}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {user.permissions.map((p) => (
                          <span
                            key={p}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Session expires after 30 minutes of inactivity.
            </div>
          </div>

          {/* Right — login form */}
          <Card className="sticky top-8 mx-auto w-full max-w-lg p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a demo user or enter credentials manually.
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={role}
                    onChange={(e) => { setRole(e.target.value); setError(""); }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </label>

              {error && (
                <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                className="w-full justify-center"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-slate-500">
                Session-based auth · No password required · 30 min expiry
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}