"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react"

export default function SimpleTable({ 
    columns = [], 
    rows = [],
    rowKey = (row, i) => row.id ?? i, 
    renderExpandedContent = (row) => null
}) {
    const [expandedRows, setExpandedRows] = useState({});
    
    const toggleRow = (key) => {
        setExpandedRows(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const safeCols = columns || [];
    const safeRows = rows || [];
    return (
        <div className="overflow-x-auto mt-1">
            <table className="min-w-full text-sm">
                <thead style={{ backgroundColor: "#EFF6FF" }}>
                    <tr className="font-kumbh text-[0.85rem] font-semibold text-[#364153]">
                        {safeCols.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-2 text-left text-primary-grey_tabel_header"
                            >
                                {col.header}
                            </th>
                        ))}
                        <th className="w-10"></th>
                    </tr>
                </thead>
                <tbody>
                    {safeRows.length === 0 ? (
                        <tr>
                            <td>
                                {''}
                            </td>
                        </tr>
                    ) : (
                        safeRows.map((row, i) => {
                            const rowBg = (i % 2 === 0) ? "bg-white" : "bg-[#F6F7F9]";
                            const key = rowKey(row, i);
                            const isExpanded = expandedRows[key];

                            return (
                                <>
                                    {/* Main Row */}
                                    <tr key={key} className={rowBg}>
                                        {safeCols.map((col) => {
                                            const value = row[col.key];
                                            const content = col.render ? col.render(value, row) : value;
                                            return (
                                                <td key={col.key} className="px-4 py-2 text-gray-700">
                                                    {content}
                                                </td>
                                            );
                                        })}

                                        {/* Expand button */}
                                        <td className="px-2 cursor-pointer">
                                            <button onClick={() => toggleRow(key)}>
                                                <ChevronDown
                                                    size={16}
                                                    className={`cursor-pointer transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Expanded Row */}
                                    {isExpanded && (
                                        <tr className="bg-gray-50">
                                            <td colSpan={safeCols.length + 1} className="px-8 py-6">
                                                <div className="text-sm text-gray-600">
                                                    {renderExpandedContent(row)}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            );
                        })

                    )}
                </tbody>
            </table>
        </div>
    );
}