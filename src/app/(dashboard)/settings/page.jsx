"use client";

import {
  ChevronRight,
  
} from "lucide-react"; 
import {SettingsKpiGrid} from "../../../components/settings/SettingsKpiGrid";
import {AiAgentConfiguration} from "../../../components/settings/AiAgentConfiguration"; 
import {ReconciliationRulesTable} from "../../../components/settings/ReconciliationRulesTable";
import {VendorConfiguration} from "../../../components/settings/VendorConfiguration";
import {ApprovalWorkflowDesigner} from "../../../components/settings/ApprovalWorkflowDesigner";
import {CommunicationTemplates} from "../../../components/settings/CommunicationTemplates";
import {SecurityGovernance} from "../../../components/settings/SecurityGovernance";
export default function SettingsPage() {
   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Configuration Audit Log (single row on top) */}
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight ">
                Configuration
              </h1>
          </div>
          <div>
          <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 shadow-sm">
            Configuration Audit Log <ChevronRight className="w-3 h-3 text-blue-600" />
          </a>
          </div>
        </div>

        {/* KPI row */}
         <SettingsKpiGrid />   
        {/* Ai AgentConfiguration */}
        
        
        <div className="space-y-4 mb-6">
          {/* Row 1: AI Config | Main Chart */}
          
          <AiAgentConfiguration/> 
          {/* Row 2: Reconciliation Rules | Exception Configuration */}
          <ReconciliationRulesTable />

          {/* Row 3: Vendor | SLA */}
          <VendorConfiguration />

          {/* Row 4: Approval Workflow | Right stack (Agent Health, Recent Changes, Quick Actions) */}

          <ApprovalWorkflowDesigner />

          <CommunicationTemplates />
          
        </div>

        {/* Bottom rows: each row 2 columns (full width) */}
        <div className="space-y-4">
          {/* Row A: Communication Templates | Security & Governance */}
             <SecurityGovernance />
        </div>
      </div>
    </div>
  );
}

