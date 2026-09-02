"use client";

export const VendorCommunicationsTable = () => {
  const communications = [
    ["12 May 2026 10:30 AM", "Anita Verma", "abc.finance@abc.com", "Escalation – Pending Items", "Sent", "2"],
    ["09 May 2026 11:20 AM", "AI Agent", "abc.finance@abc.com", "Follow-up – Missing Invoices", "Sent", "1"],
    ["08 May 2026 02:40 PM", "abc.finance@abc.com", "Anita Verma", "Re: Statement for Jul 2026", "Received", "3"],
    ["05 May 2026 09:15 AM", "Anita Verma", "abc.finance@abc.com", "Statement Request – Jul 2026", "Sent", "1"],
  ];

  return (
    <div className="col-span-12 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-12">
      <div className="mb-3 flex justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Recent Communications
        </h2>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
          View All
        </button>
      </div>

      <table className="w-full min-w-[680px] text-xs ">
        <thead className="bg-[#f8fafc] text-xs  uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-2 py-2 text-left">Date & Time</th>
            <th className="px-2 py-2 text-left">From</th>
            <th className="px-2 py-2 text-left">To</th>
            <th className="px-2 py-2 text-left">Subject</th>
            <th className="px-2 py-2 text-left">Status</th>
            <th className="px-2 py-2 text-left">Attachments</th>
          </tr>
        </thead>

        <tbody>
          {communications.map(([date, from, to, subject, status, attachments]) => (
            <tr key={`${date}-${subject}`} className="border-t border-slate-100 text-slate-600">
              <td className="px-2 py-2.5">{date}</td>
              <td className="px-2 py-2.5">{from}</td>
              <td className="px-2 py-2.5">{to}</td>
              <td className="px-2 py-2.5 text-slate-700">{subject}</td>
              <td className={`px-2 py-2.5 font-semibold ${status === "Received" ? "text-blue-600" : "text-emerald-600"}`}>{status}</td>
              <td className="px-2 py-2.5">{attachments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
