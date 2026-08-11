'use client';

import React from 'react';
import { getStepStatus, normalize } from '@/utils/workFlowStepStatusVisuals';

const getStepStyles = ({ isActive, isCompleted, isFailed }) => {
    if (isFailed) {
        return {
            circle: 'border-[#f87171]/50 bg-[#f87171]/10 text-[#f87171]',
            badge: 'border-[#f87171]/30 bg-[#f87171]/15 text-[#f87171]',
            connector: 'bg-gradient-to-r from-[#f87171]/40 to-[#f87171]/20',
        };
    }

    if (isCompleted) {
        return {
            circle: 'border-[#34d399] bg-[#34d399]/15 text-[#34d399]',
            badge: 'border-[#34d399]/40 bg-[#34d399]/15 text-[#34d399]',
            connector: 'bg-gradient-to-r from-[#34d399]/40 to-[#34d399]/20',
        };
    }

    if (isActive) {
        return {
            circle: 'border-[#e8a030]/40 bg-[#e8a030]/10 text-[#e8a030]',
            badge: 'border-[#e8a030]/30 bg-[#e8a030]/15 text-[#e8a030]',
            connector: 'bg-gradient-to-r from-[#e8a030]/40 to-[#e8a030]/20',
        };
    }

    return {
        circle: 'border-[#2a2f3a] bg-[#111318] text-[#cbd5e1]',
        badge: 'border-[#2a2f3a] bg-[#111318] text-[#cbd5e1]',
        connector: 'bg-slate-700',
    };
};

export default function QuoteStepperUI({
    checkpoints = {},
    steps = [],
    activeIndex = 0,
    onStepChange,
}) {
    return (
        <div className="rounded-xl border border-[#2a2f3a] bg-[#0a0c10]/90 px-6 py-5">
            <div className="flex flex-col gap-4 lg:hidden">
                {steps.map((step, i) => {
                    const status = normalize(getStepStatus(checkpoints, step.id));
                    const isActive = i === activeIndex;
                    const isCompleted = status === 'success' && !isActive;
                    const isFailed = status === 'failed';
                    const styles = getStepStyles({ isActive, isCompleted, isFailed });

                    return (
                        <div key={step.id} className="flex items-start gap-4">
                            <button
                                type="button"
                                onClick={() => onStepChange?.(i)}
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${styles.circle} cursor-pointer`}
                            >
                                {isFailed ? '!' : isCompleted ? '✓' : i + 1}
                            </button>

                            <button
                                type="button"
                                onClick={() => onStepChange?.(i)}
                                className={`flex-1 rounded-2xl border px-4 py-3 text-left cursor-pointer ${isFailed
                                    ? 'border-[#f87171]/30 bg-[#f87171]/10'
                                    : isCompleted
                                        ? 'border-[#34d399]/40 bg-[#34d399]/10'
                                        : isActive
                                            ? 'border-[#e8a030]/30 bg-[#e8a030]/10'
                                            : 'border-[#2a2f3a] bg-[#111318]'
                                    }`}
                            >
                                <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${styles.badge}`}>
                                    {step.label}
                                </div>
                                <div className="mt-2 text-[11px] capitalize text-[#6b7280]">
                                    {status}
                                </div>
                            </button>

                            {i !== steps.length - 1 && (
                                <div className="mx-auto my-3 h-8 w-[2px] bg-gradient-to-b from-[#e8a030]/40 to-[#e8a030]/20" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="hidden lg:flex lg:flex-row lg:items-start lg:justify-center">
                {steps.map((step, i) => {
                    const status = normalize(getStepStatus(checkpoints, step.id));
                    const isActive = i === activeIndex;
                    const isCompleted = status === 'success' && !isActive;
                    const isFailed = status === 'failed';
                    const styles = getStepStyles({ isActive, isCompleted, isFailed });

                    return (
                        <React.Fragment key={step.id}>
                            <button
                                type="button"
                                onClick={() => onStepChange?.(i)}
                                className="group relative flex flex-col items-center justify-center bg-transparent px-4 text-center transition-all duration-300 cursor-pointer focus:outline-none shrink-0"
                            >
                                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${styles.circle}`}>
                                    {isFailed ? '!' : isCompleted ? '✓' : i + 1}
                                </div>

                                <div className="mt-3 flex flex-col items-center gap-1">
                                    <div className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${styles.badge}`}>
                                        {step.label}
                                    </div>
                                </div>
                            </button>

                            {i !== steps.length - 1 && (
                                <div className="pointer-events-none mt-5 hidden h-[2px] w-12 lg:block flex-1 max-w-[80px]">
                                    <div className={`h-full ${styles.connector}`} />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}