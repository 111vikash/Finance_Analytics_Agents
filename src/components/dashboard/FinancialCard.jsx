import React from "react";
import {
  FileSpreadsheet, FolderOpen, History,
  CreditCard, TrendingUp,
} from "lucide-react";
import KpiCard from "./KpiCard";

const iconMap = {
  FileSpreadsheet,
  FolderOpen,
  History,
  CreditCard,
  TrendingUp,
};

const styleMap = {
  FileSpreadsheet: {
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    cardBgColor: "bg-blue-50/70",
    accent: { border: "border-blue-100" },
  },
  CreditCard: {
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    cardBgColor: "bg-emerald-50/70",
    accent: { border: "border-emerald-100" },
  },
  FolderOpen: {
    iconColor: "text-rose-600",
    iconBgColor: "bg-rose-100",
    cardBgColor: "bg-rose-50/70",
    accent: { border: "border-rose-100" },
  },
  TrendingUp: {
    iconColor: "text-amber-600",
    iconBgColor: "bg-amber-100",
    cardBgColor: "bg-amber-50/70",
    accent: { border: "border-amber-100" },
  },
};

export default function FinancialCard({ financialKpis = [] }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {financialKpis.map((kpi, idx) => {
          const Icon = iconMap[kpi.icon] || FileSpreadsheet;
          const styles = styleMap[kpi.icon] || {};
          return (
            <KpiCard
              key={idx}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              isTrendPositive={kpi.isTrendPositive}
              icon={Icon}
              iconColor={styles.iconColor}
              iconBgColor={styles.iconBgColor}
              cardBgColor={styles.cardBgColor}
              accent={styles.accent}
            />
          );
        })}
      </div>
    </div>
  );
}