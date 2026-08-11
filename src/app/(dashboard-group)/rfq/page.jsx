'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye } from 'lucide-react';
import { UniversalTable } from '@/components/ui/table/DataTable';
import axiosInstance from '@/app/lib/api';
import axios from 'axios';
import { formatDateTime } from '@/utils/formatDateTime';

export default function RFQPage() {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'running':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'success':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'partial':
                return 'bg-amber-500/20 text-amber-300 border-emerald-500/20';
            case 'failed':
                return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default:
                return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'success':
                return 'Quote Sent';
            case 'partial':
                return 'Partial Quote';
            case 'running':
                return 'Running';
            case 'failed':
                return 'Failed';
            default:
                return status || 'Unknown';
        }
    };

    useEffect(() => {
        const fetchRfqs = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('/api/rfq-list');
                // console.log('Fetched RFQs:', res.data);
                setData(res?.data?.rfq_list || []);
            } catch (err) {
                console.error(err);
                setError('Failed to load RFQ data');
            } finally {
                setLoading(false);
            }
        };


        fetchRfqs();
    }, []);

    const columns = useMemo(
        () => [
            {
                header: 'RFQ ID',
                accessorKey: 'rfq_id',
                cell: (info) => (
                    <span className="font-mono text-xs font-semibold text-amber-400">
                        {info.getValue()}
                    </span>
                ),
            },
            {
                header: 'Email Subject',
                accessorKey: 'subject',
                cell: (info) => <span className="text-slate-200">{info.getValue()}</span>,
            },
            {
                header: 'Customer',
                accessorKey: 'customer',
                cell: (info) => (
                    <div className="flex flex-col gap-1">
                        <span className="text-slate-200">{info.getValue()}</span>
                        <span className="text-xs text-slate-500">{info.row.original.company}</span>
                    </div>
                ),
            },
            {
                header: 'Received',
                accessorKey: 'received',
                cell: (info) => <span className="text-slate-400">{formatDateTime(info.getValue())}</span>,
            },
            {
                header: 'Products',
                accessorKey: 'products',
                cell: (info) => <span className="text-slate-400">{info.getValue()}</span>,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (info) => {
                    const val = info.getValue();
                    const statusText = getStatusLabel(val);
                    const badgeStyle = getStatusColor(val);

                    return (
                        <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold whitespace-nowrap ${badgeStyle}`}
                        >
                            {statusText}
                        </span>
                    );
                },
            },
            {
                header: 'Action',
                id: 'action',
                cell: ({ row }) => (
                    <button
                        type="button"
                        onClick={() => router.push(`/rfq/${row.original.rfq_id}`)}
                        className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800 p-2 text-xs font-semibold text-slate-200 transition hover:border-amber-400 hover:bg-slate-700 hover:text-amber-400 cursor-pointer"
                        title="View RFQ Details"
                    >
                        <Eye width={16} height={16} />
                    </button>
                ),
            },
        ],
        [router]
    );

    if (loading) {
        return (
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 text-slate-300">
                Loading RFQs...
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
                {error}
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
            <UniversalTable data={data} columns={columns} />
        </div>
    );
}