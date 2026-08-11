'use client';

import React, { useMemo, useState } from 'react';
import QuoteStepperUI from './QuoteStepperUI';
import { normalize, getStepStatus } from '@/utils/workFlowStepStatusVisuals';

import EmailReceived from '@/components/workflow-tabs/EmailReceived';
import CustomerIdentification from '@/components/workflow-tabs/CustomerIdentification';
import ProductExtracted from '@/components/workflow-tabs/ProductExtracted';
import QuoteGenerated from '@/components/workflow-tabs/QuoteGenerated';
import QuoteSent from '@/components/workflow-tabs/QuoteSent';

export default function QuoteStepper() {
    const [activeIndex, setActiveIndex] = useState(0);

    const steps = useMemo(
        () => [
            { id: 'MailReceived', label: 'Email Received', desc: 'RFQ received from customer' },
            { id: 'customerIdentification', label: 'Customer Lookup', desc: 'Customer verified in system' },
            { id: 'productExtracted', label: 'Product Check', desc: 'Products validated and checked' },
            { id: 'quoteGenerated', label: 'Quote Generation', desc: 'Quote prepared and ready' },
            { id: 'quoteSent', label: 'Quote Sent', desc: 'Quote sent to customer' },
        ],
        []
    );

    const checkpoints = {
        MailReceived: { status: 'success' },
        customerIdentification: { status: 'success' },
        productExtracted: { status: 'success' },
        quoteGenerated: { status: 'success' },
        quoteSent: { status: 'success' },
    };

    const tabs = [
        <EmailReceived key="MailReceived" data={checkpoints.MailReceived} />,
        <CustomerIdentification key="customerIdentification" data={checkpoints.customerIdentification} />,
        <ProductExtracted key="productExtracted" data={checkpoints.productExtracted} />,
        <QuoteGenerated key="quoteGenerated" data={checkpoints.quoteGenerated} />,
        <QuoteSent key="quoteSent" data={checkpoints.quoteSent} />,
    ];

    const lastCompletedIdx = (() => {
        let last = -1;
        for (let i = 0; i < steps.length; i++) {
            const status = normalize(getStepStatus(checkpoints, steps[i].id));
            if (status === 'success') last = i;
            else break;
        }
        return last;
    })();



    const handleStepChange = (idx) => {

        setActiveIndex(idx);
    };

    return (
        <div className="space-y-6">
            <QuoteStepperUI
                checkpoints={checkpoints}
                steps={steps}
                activeIndex={activeIndex}
                onStepChange={handleStepChange}
                lastCompletedIdx={lastCompletedIdx}

            />

            <div className="rounded-xl border border-[#2a2f3a] bg-[#181b22] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
                {tabs[activeIndex]}
            </div>
        </div>
    );
}