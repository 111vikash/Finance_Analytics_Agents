"use client";

import { useState } from "react";

export const VendorNotes = () => {
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  return (
    <div className="col-span-12 rounded-lg border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] xl:col-span-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">
        Notes
      </h2>
      <textarea
        value={note}
        onChange={(event) => { setNote(event.target.value); setNoteSaved(false); }}
        className="h-24 w-full resize-none rounded border border-slate-200 bg-[#fbfcfe] p-3 text-xs  text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        placeholder="Add your notes..."
      />
      <button
        onClick={() => setNoteSaved(true)}
        className="mt-2 w-full cursor-pointer rounded bg-[#0969c8] py-2 text-xs  font-semibold text-white shadow-sm transition hover:bg-[#0759aa]"
      >
        {noteSaved ? "Note Saved" : "Save Note"}
      </button>
    </div>
  );
};
