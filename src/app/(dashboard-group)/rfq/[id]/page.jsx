'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils/formatDateTime';

import QuoteStepperUI from '@/components/ui/stepper/QuoteStepperUI';
import EmailReceived from '@/components/workflow-tabs/EmailReceived';
import CustomerIdentification from '@/components/workflow-tabs/CustomerIdentification';
import ProductExtracted from '@/components/workflow-tabs/ProductExtracted';
import QuoteGenerated from '@/components/workflow-tabs/QuoteGenerated';
import QuoteSent from '@/components/workflow-tabs/QuoteSent';

import axiosInstance from '@/app/lib/api';
import { RFQ_STEPS } from '@/components/ui/stepper/rfqSteps'

export default function RFQDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const rfqId = params?.id;

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(`/api/workflow/${rfqId}`);
                console.log(res?.data);
                setDetail(res?.data || null);
            } catch (err) {
                console.error(err);
                setDetail(null);
            } finally {
                setLoading(false);
            }
        };

        if (rfqId) fetchDetail();
    }, [rfqId]);

    const checkpoints = detail?.checkpoints || {};

    const mappedData = useMemo(() => {
        if (!detail) return null;

        const mail = detail.checkpoints?.mail_received || {};
        const customer = detail.checkpoints?.customer_identification || {};
        const product = detail.checkpoints?.product_extracted || {};
        const quote = detail.checkpoints?.quote_generated || {};
        const sent = detail.checkpoints?.quote_sent || {};

        return {
            emailReceived: {
                from: mail.from || '-',
                to: mail.to || '-',
                subject: mail.subject || '-',
                body: mail.body_content || '-',
                receivedAt: mail.received_at || detail.received_at || '-',
                attachments: mail.attachments || [],
            },
            customerIdentification: {
                customerName: customer.customer_name || '-',
                companyName: customer.company || '-',
                customerId: customer.id || '-',
                email: customer.email || '-',
                status: customer.account_status || '-',
                verificationSource: customer.verification_source || '-',
            },
            productExtracted: {
                summaryMessage: product.summary_message || '-',
                rows: product.product_list || [],
            },
            quoteGenerated: {
                quoteId: quote.quote_id || '-',
                generatedDate: quote.generated_date || '-',
                validUntil: quote.valid_until || '-',
                paymentTerms: quote.payment_terms || '-',
                summaryMessage: quote.summary_message || '-',
                erpPayloadLink: quote.erp_payload_link || '#',
                erpDownloadLink: quote.erp_download_link || '#',
                jsonQuote: quote.json_quote || '',
            },
            quoteSent: {
                to: sent.to || '-',
                subject: sent.subject || '-',
                sentAt: sent.sent_at || detail.received_at || '-',
                bodyContent: sent.body_content || '-',
                attachments: sent.attachments || [],
            },
        };
    }, [detail]);

    const tabs = [
        <EmailReceived key="mail_received" data={mappedData?.emailReceived} />,
        <CustomerIdentification key="customer_identification" data={mappedData?.customerIdentification} />,
        <ProductExtracted key="product_extracted" data={mappedData?.productExtracted} />,
        <QuoteGenerated key="quote_generated" data={mappedData?.quoteGenerated} />,
        <QuoteSent key="quote_sent" data={mappedData?.quoteSent} />,
    ];

    const handleStepChange = (idx) => setActiveStep(idx);

    if (loading) {
        return <div className="min-h-screen bg-[#0a0c10] p-6 text-[#e8eaed]">Loading details...</div>;
    }

    if (!detail) {
        return <div className="min-h-screen bg-[#0a0c10] p-6 text-red-400">RFQ not found</div>;
    }

    const customerName =
        detail?.checkpoints?.customer_identification?.customer_name || 'Unknown Customer';
    const companyName =
        detail?.checkpoints?.customer_identification?.company || 'Unknown Company';
    const receivedAt = detail?.received_at || '-';
    const quoteId = detail?.checkpoints?.quote_generated?.quote_id || '-';

    return (
        <div className="min-h-screen bg-[#0a0c10] text-[#e8eaed]">
            <div className="flex min-h-screen flex-col">
                <main className="flex-1">
                    <div className="sticky top-0 z-20 border-b border-[#2a2f3a] bg-[#0a0c10]/95 px-6 py-5 backdrop-blur">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-left">
                                <div className="text-sm font-semibold">
                                    {customerName}
                                    <br />
                                    {companyName}
                                </div>
                                <div className="mt-1 text-xs text-[#9aa0ad]">
                                    {detail.rfq_id} / Quote {quoteId}
                                </div>
                            </div>

                            <div className="text-xs text-[#9aa0ad] sm:text-right">
                                <button
                                    onClick={() => router.push('/rfq')}
                                    className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-[#2a2f3a] bg-[#111318] px-4 py-2 text-sm font-medium text-[#e8eaed] transition hover:border-[#e8a030] hover:text-[#e8a030]"
                                >
                                    ← Back to queue
                                </button>
                                <div className="mt-2">Received At: {formatDateTime(receivedAt)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 p-6">
                        <div className="rounded-xl border border-[#2a2f3a] bg-[#181b22] shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
                            <QuoteStepperUI
                                checkpoints={checkpoints}
                                steps={RFQ_STEPS}
                                activeIndex={activeStep}
                                onStepChange={handleStepChange}
                            />
                            <div className="p-6">{tabs[activeStep]}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}