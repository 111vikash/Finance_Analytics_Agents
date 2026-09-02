"use client";

import {
  AlertTriangle,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  Building2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import KpiCard from "../dashboard/KpiCard";

export const VendorMetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      <KpiCard
        label="Vendor"
        value="ABC Manufacturing Ltd."
        change="Vendor ID: VND-100234"
        isTrendPositive={true}
        icon={Building2}
        iconColor="text-violet-600"
        iconBgColor="bg-violet-100"
      />

      <KpiCard
        label="Statement Period"
        value="Jul 2026"
        change="01 Jul 2026 - 31 Jul 2026"
        isTrendPositive={true}
        icon={CalendarDays}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />

      <KpiCard
        label="Reconciliation Status"
        value="65% Completed"
        change="In Progress"
        isTrendPositive={true}
        icon={Clock3}
        iconColor="text-cyan-600"
        iconBgColor="bg-cyan-100"
      />

      <KpiCard
        label="SLA Status"
        value="At Risk"
        change="Response due in 2 days"
        isTrendPositive={false}
        icon={AlertTriangle}
        iconColor="text-orange-600"
        iconBgColor="bg-orange-100"
      />

      <KpiCard
        label="Outstanding Exceptions"
        value="8"
        change="Value: $126,540.00"
        isTrendPositive={false}
        icon={AlertCircle}
        iconColor="text-red-600"
        iconBgColor="bg-red-100"
      />

      <KpiCard
        label="Last Communication"
        value="12 May 2026"
        change="10:30 AM • Email Sent"
        isTrendPositive={true}
        icon={MessageSquare}
        iconColor="text-emerald-600"
        iconBgColor="bg-emerald-100"
      />
    </div>
  );
};
