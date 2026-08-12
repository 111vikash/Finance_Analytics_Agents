import React, { useEffect, useState } from "react";
import {
  FileSpreadsheet,
  FolderOpen,
  History,
  CreditCard,
} from "lucide-react";
import axiosInstance from "./../../app/lib/api";
import KpiCard from "./KpiCard";

const iconMap = {
  FileSpreadsheet,
  FolderOpen,
  History,
  CreditCard,
};

const styleMap = {
  FileSpreadsheet: {
    iconColor: "text-blue-600",
    iconBgColor: "bg-blue-100",
    cardBgColor: "bg-blue-50/70",
    accent: {
      border: "border-blue-100",
    },
  },
  FolderOpen: {
    iconColor: "text-sky-600",
    iconBgColor: "bg-sky-100",
    cardBgColor: "bg-sky-50/70",
    accent: {
      border: "border-sky-100",
    },
  },
  History: {
    iconColor: "text-rose-600",
    iconBgColor: "bg-rose-100",
    cardBgColor: "bg-rose-50/70",
    accent: {
      border: "border-rose-100",
    },
  },
  CreditCard: {
    iconColor: "text-emerald-600",
    iconBgColor: "bg-emerald-100",
    cardBgColor: "bg-emerald-50/70",
    accent: {
      border: "border-emerald-100",
    },
  },
};

export default function FinancialCard() {
  const [dashboardData, setDashboardData] = useState({
    title: "Financial KPIs",
    lastUpdated: "",
    financialKpis: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get("/data/data.json");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to load financial KPI data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
        Loading financial KPI cards...
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
     

      <div className="grid grid-cols-1 gap-4">
        {(dashboardData.financialKpis || []).map((kpi, idx) => {
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