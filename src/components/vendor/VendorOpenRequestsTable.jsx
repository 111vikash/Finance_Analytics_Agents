"use client";

export const VendorOpenRequestsTable = () => {
  const requests = [
    {
      id: "REQ-00124",
      type: "Missing Invoice",
      subject: "Invoice INV-10345 details missing",
      status: "Awaiting Response",
      owner: "Anita Verma",
      dueDate: "16 May 2026",
      priority: "High",
      daysPending: 2,
    },
    {
      id: "REQ-00125",
      type: "Payment Confirmation",
      subject: "Payment of $25,000 not reflected",
      status: "Awaiting Response",
      owner: "Rohit Mehta",
      dueDate: "15 May 2026",
      priority: "High",
      daysPending: 3,
    },
    {
      id: "REQ-00126",
      type: "Credit Note Clarification",
      subject: "Credit Note CN-2045 clarification",
      status: "In Progress",
      owner: "Anita Verma",
      dueDate: "18 May 2026",
      priority: "Medium",
      daysPending: 1,
    },
    {
      id: "REQ-00127",
      type: "Balance Confirmation",
      subject: "Confirm closing balance",
      status: "Pending",
      owner: "Rohit Mehta",
      dueDate: "20 May 2026",
      priority: "Low",
      daysPending: 5,
    },
  ];

  return (
    <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-12">
      <div className="flex items-center justify-between border-b border-slate-200 p-3 px-4">
        <h2 className="text-sm font-semibold text-slate-900">
          Open Requests
          <span className="ml-2 rounded bg-blue-600 px-1.5 py-0.5 text-xs font-bold text-white">4</span>
        </h2>

        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-xs ">
          <thead className="bg-[#f8fafc] text-xs  uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2.5 text-left">Request ID</th>
              <th className="px-3 py-2.5 text-left">Type</th>
              <th className="px-3 py-2.5 text-left">Subject</th>
              <th className="px-3 py-2.5 text-left">Status</th>
              <th className="px-3 py-2.5 text-left">Owner</th>
              <th className="px-3 py-2.5 text-left">Due Date</th>
              <th className="px-3 py-2.5 text-left">Priority</th>
              <th className="px-3 py-2.5 text-left">Days Pending</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 text-slate-600 transition hover:bg-blue-50/30">
                <td className="px-3 py-2.5 font-semibold text-blue-600">
                  {row.id}
                </td>
                <td className="px-3 py-2.5">{row.type}</td>
                <td className="px-3 py-2.5 text-slate-700">{row.subject}</td>
                <td className="px-3 py-2.5"><span className="rounded bg-blue-50 px-2 py-1 text-xs  font-semibold text-blue-700">{row.status}</span></td>
                <td className="px-3 py-2.5">{row.owner}</td>
                <td className={`px-3 py-2.5 ${row.priority === "High" ? "font-semibold text-red-500" : ""}`}>{row.dueDate}</td>
                <td className="px-3 py-2.5"><span className={`rounded px-2 py-1 text-xs  font-semibold ${row.priority === "High" ? "bg-red-50 text-red-600" : row.priority === "Medium" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{row.priority}</span></td>
                <td className="px-3 py-2.5">{row.daysPending}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
