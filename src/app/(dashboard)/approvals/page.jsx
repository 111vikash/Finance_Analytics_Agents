import {Card} from "@/components/common/Card";

export default function ApprovalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="title-lg">Approval Center</h1>
        <p className="subtitle mt-1">User Approval Center </p>
      </div>

      {/* <Card className="p-5">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Profile settings, notifications, and security preferences will be added later.
        </div>
      </Card> */}
    </div>
  );
}

// import React from 'react';
// import { MetricsGrid } from '@/components/approval/MetricsGrid';
// import { ApprovalTable } from '@/components/approval/ApprovalTable';
// import { RecentSubmissionsTable } from '@/components/approval/RecentSubmissionsTable';
// import { SidebarAnalytics } from '@/components/approval/SidebarAnalytics';
// import { FollowUpTimeline } from '@/components/approval/FollowUpTimeline';

// export const metadata = {
//   title: 'Approval Center - Agentic AI',
//   description: 'Review and take action on reconciliation items.',
// };

// export default function ApprovalCenterPage() {
//   return (
//     <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 bg-slate-50 space-y-6 text-slate-800">
//       {/* Title Header Section */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-slate-900">Approval Center</h1>
//           <p className="text-sm text-slate-500">Review and take action on reconciliation items requiring your approval.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors">
//             🎛️ Filters
//           </button>
//           <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
//             Export
//           </button>
//         </div>
//       </div>

//       {/* KPI Financial Metric Badges */}
//       <MetricsGrid />

//       {/* Main Core Split Workspace Grid */}
//       <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
//         {/* Left Data Streams & Action Ledgers */}
//         <div className="xl:col-span-3 space-y-6">
//           <ApprovalTable />
//           <RecentSubmissionsTable />
//           <FollowUpTimeline />
//         </div>

//         {/* Right Metric Analytics and Action Boxes */}
//         <div className="xl:col-span-1">
//           <SidebarAnalytics />
//         </div>
//       </div>
//     </div>
//   );
// }