"use client";
import {
  ChevronRight,
  Workflow,
  UserRound,
  ChevronDown, 
  
} from "lucide-react"; 
export const ApprovalWorkflowDesigner = () => {

  const resentChanges = [{ icon: "📋", label: "Rule RR-015 Updated", time: "10:30 AM", date: "15 May 2026" },{ icon: "📋", label: "SLA Policy Modified", time: "04:30 PM", date: "15 May 2026" },{ icon: "➕", label: "New User Template Added", time: "11:15 AM", date: "15 May 2026" },{ icon: "🔄", label: "Workflow Updated", time: "03:45 PM", date: "14 May 2026" },{ icon: "🤖", label: "AI Model Retrained", time: "09:30 AM", date: "14 May 2026" }];
  return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              {/* Approval Workflow Designer (6) */}
                <div className="h-full rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] flex flex-col">

                  {/* Header */}
                  <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
                    <Workflow className="h-4 w-4 text-blue-600" />

                    <h2 className="text-sm font-semibold text-slate-800">
                      6. Approval Workflow Designer
                    </h2>
                  </div>

                  {/* Body */}
                  <div className="flex-1 p-5">

                    {/* Top Workflow Row */}
                    <div className="flex items-center justify-center">

                      {/* AP Analyst */}
                      <div className="w-[145px] rounded-lg border border-blue-200 bg-blue-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-blue-600" />

                          <span className="text-[13px] font-semibold text-slate-700">
                            AP Analyst
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="mx-2 flex items-center">
                        <div className="w-8 border-t border-slate-300"></div>
                        <ChevronRight className="-ml-1 h-4 w-4 text-slate-500" />
                      </div>

                      {/* AP Team Lead */}
                      <div className="w-[180px] rounded-lg border border-green-200 bg-green-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-green-600" />

                          <span className="text-[13px] font-semibold text-slate-700">
                            AP Team Lead
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="mx-2 flex items-center">
                        <div className="w-8 border-t border-slate-300"></div>
                        <ChevronRight className="-ml-1 h-4 w-4 text-slate-500" />
                      </div>

                      {/* Controller */}
                      <div className="w-[145px] rounded-lg border border-purple-200 bg-purple-50 px-3 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <UserRound className="h-4 w-4 text-purple-600" />

                          <span className="text-[13px] font-semibold text-slate-700">
                            Controller
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Arrow */}
                    <div className="mt-2 flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="flex flex-col items-center">
                          <div className="h-8 border-l border-slate-300"></div>
                          <ChevronDown className="-mt-1 h-4 w-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    {/* Finance Manager */}
                    <div className="flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="w-[220px] rounded-lg border border-orange-200 bg-orange-50 px-3 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <UserRound className="h-4 w-4 text-orange-500" />

                            <span className="text-[13px] font-semibold text-slate-700">
                              Finance Manager
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow To Auto Approval */}
                    <div className="mt-2 flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="flex flex-col items-center">
                          <div className="h-8 border-l border-slate-300"></div>
                          <ChevronDown className="-mt-1 h-4 w-4 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    {/* Auto Approval Conditions */}
                    <div className="flex justify-center">
                      <div className="flex w-[560px] justify-end">
                        <div className="w-[300px] rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center">

                          <h4 className="text-sm font-semibold text-slate-700">
                            Auto Approval Conditions
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            (Amount, Risk, Confidence)
                          </p>

                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-200">
                    <button className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
                      <span className="cursor-pointer">Manage Workflows</span>

                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>

            </div>

            <div>
              {/* Right stacked cards */}
               {/* Recent Changes */}
               <div className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800">Recent Changes</h3>
                    <a href="#" className="text-xs cursor-pointer font-semibold text-blue-600 hover:text-blue-800">View All</a>
                  </div>

                  <div className="space-y-3">
                    {resentChanges.map((change, idx) => (
                      <div key={idx} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0">
                        <div className="text-lg mt-0.5">{change.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-700">{change.label}</p>
                          <p className="text-[10px] text-slate-500">{change.date} at {change.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              
            </div>
          </div>

  );
}