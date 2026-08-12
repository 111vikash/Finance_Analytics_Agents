"use client";

import React, { useState,useEffect } from "react";

import axiosInstance from "@/app/lib/api";
import FinancialCard from "@/components/dashboard/FinancialCard";
import LineTrendChart from "@/components/dashboard/LineTrendChart";



import KpiDashboardGrid from "@/components/dashboard/KpiDashboardGrid";
import SLAComplianceChart from "@/components/dashboard/SLAComplianceChart";
import ExceptionsByCategoryChart from "@/components/dashboard/ExceptionsByCategoryChart";
import TopVendorsTable from "@/components/dashboard/TopVendorsTable";
import AnalystWorkloadTable from "@/components/dashboard/AnalystWorkloadTable";
import ReconciliationStatusOverview from "@/components/dashboard/ReconciliationStatusOverview";


export default function DashboardPage() {

      const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get("/data/data.json");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!dashboardData) return <div>No data found</div>;

  return (
    <div className=" ">
      <div className="min-h-screen   text-slate-900 p-4 sm:p-6">
        <div className="mx-auto  space-y-6">
          <KpiDashboardGrid />

          {/* Main layout */}
 <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
  <div className="xl:col-span-2">
    <FinancialCard />
  </div>

  <div className="xl:col-span-3 space-y-4">
    <LineTrendChart  />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SLAComplianceChart  />
      <ExceptionsByCategoryChart/>
    <ReconciliationStatusOverview />
    </div>
  </div>
</div>
          
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <TopVendorsTable/>
      <AnalystWorkloadTable  />
    
    </div>
        </div>
      </div>
    </div>
  );
}
