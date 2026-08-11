'use client';

import React, { useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';
import Input from '../Input';
import Link from 'next/link';

const customGlobalFilterFn = (row, columnId, filterValue) => {
    const { search, status } = filterValue || {};

    if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = row.getAllCells().some((cell) => {
            const value = cell.getValue();
            return value ? String(value).toLowerCase().includes(searchLower) : false;
        });
        if (!matchesSearch) return false;
    }

    if (status && row.original?.status !== status) {
        return false;
    }

    return true;
};

export const UniversalTable = ({ data = [], columns = [] }) => {
    const [globalFilter, setGlobalFilter] = useState({
        search: '',
        status: '',
        dateRange: '',
    });

    const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);
    const safeColumns = useMemo(() => (Array.isArray(columns) ? columns : []), [columns]);

    const table = useReactTable({
        data: safeData,
        columns: safeColumns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: customGlobalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const headerGroups = table.getHeaderGroups() || [];
    const rows = table.getRowModel()?.rows || [];

    return (
        <div className="overflow-hidden rounded-b-[28px]">
            {/* FILTER BAR */}
            <div className="border-b border-slate-700 bg-slate-950/70 px-6 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Search */}
                    <div className="w-full lg:max-w-md">
                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                            Search Here
                        </label>
                        <div className="relative">
                            <Search
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                size={15}
                            />
                            <input
                                type="search"
                                placeholder="Search RFQ, customer or company"
                                aria-label="Search RFQs"
                                value={globalFilter.search}
                                onChange={(e) =>
                                    setGlobalFilter((prev) => ({ ...prev, search: e.target.value }))
                                }
                                className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-3 pl-11 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                            />
                        </div>
                    </div>

                    {/* Quote filters */}
                    <div className="flex flex-wrap items-end gap-3">
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                                Filter by Status
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: 'running', label: 'Running', color: 'blue' },
                                    { key: 'success', label: 'Quote Sent', color: 'emerald' },
                                    { key: 'partial', label: 'Partial Quote', color: 'amber' },
                                    { key: 'failed', label: 'Failed', color: 'rose' },
                                ].map(({ key, label, color }) => {
                                    const isActive = globalFilter.status === key;
                                    const count = safeData.filter((item) => item?.status === key).length;

                                    const activeClasses = {
                                        blue: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
                                        emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
                                        amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
                                        rose: 'border-rose-500/20 bg-rose-500/10 text-rose-400',
                                    };

                                    const countActiveClasses = {
                                        blue: 'bg-blue-500/20 text-blue-300',
                                        emerald: 'bg-emerald-500/20 text-emerald-300',
                                        amber: 'bg-amber-500/20 text-amber-300',
                                        rose: 'bg-rose-500/20 text-rose-300',
                                    };

                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() =>
                                                setGlobalFilter((prev) => ({
                                                    ...prev,
                                                    status: prev.status === key ? '' : key,
                                                }))
                                            }
                                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition
                            ${isActive
                                                    ? activeClasses[color]
                                                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                                                }`}
                                        >
                                            <span>{label}</span>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[11px]
                                ${isActive ? countActiveClasses[color] : 'bg-slate-800 text-slate-300'}`}
                                            >
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-[13px] text-slate-300">
                    <thead className="bg-slate-950/90">
                        {headerGroups.map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {(headerGroup.headers || []).map((header) => (
                                    <th
                                        key={header.id}
                                        className="border-b border-slate-700 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={safeColumns.length} className="px-6 py-10 text-center text-slate-500">
                                    No matching records found.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-slate-800 transition hover:bg-white/5"
                                >
                                    {(row.getVisibleCells() || []).map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 align-middle text-slate-300">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 bg-slate-950/80 px-6 py-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <span>Items per page:</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-amber-400"
                    >
                        {[5, 10, 15, 20].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <span>
                        Page <strong className="text-slate-200">{table.getState().pagination.pageIndex + 1}</strong> of{' '}
                        <strong className="text-slate-200">{table.getPageCount() || 1}</strong>
                    </span>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            ‹ Previous
                        </button>
                        <button
                            type="button"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-amber-400 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next ›
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};