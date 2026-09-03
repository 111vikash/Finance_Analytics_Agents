"use client";

import { useState } from "react";
import {
  ChevronRight,
  Settings,
} from "lucide-react";

export const AiAgentConfiguration = () => {
  const [confidence, setConfidence] = useState(85);

  const [settings, setSettings] = useState({
    "Auto Resolution": true,
    "Learning Mode": true,
    "Escalation Intelligence": true,
    "Root Cause Analysis": true,
    "Predictive Exception Detection": true,
  });

  const aiSettings = [
    {
      title: "Auto Resolution",
      desc: "Automatically resolve eligible items",
    },
    {
      title: "Learning Mode",
      desc: "Continuous learning from outcomes",
    },
    {
      title: "Escalation Intelligence",
      desc: "AI-based escalation recommendations",
    },
    {
      title: "Root Cause Analysis",
      desc: "Identify and learn from exception patterns",
    },
    {
      title: "Predictive Exception Detection",
      desc: "Detect exceptions before they occur",
    },
  ];

  const healthMetrics = [
    {
      title: "AI Accuracy",
      value: "96.2%",
      change: "↑ 4.1%",
      path: "M2 18 L18 17 L30 18 L42 14 L56 16 L70 15 L84 9 L98 16 L112 13 L126 16 L142 12 L158 13",
    },
    {
      title: "Auto Resolution Rate",
      value: "58%",
      change: "↑ 7.5%",
      path: "M2 18 L18 19 L34 18 L48 19 L62 16 L76 8 L92 14 L108 16 L124 10 L142 14 L158 11",
    },
    {
      title: "Rule Success Rate",
      value: "94%",
      change: "↑ 3.8%",
      path: "M2 19 L20 19 L36 18 L52 19 L68 17 L84 9 L100 18 L116 20 L132 17 L148 18 L158 15",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* AI Configuration */}
      <div>
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>

            <h2 className="text-sm font-bold text-slate-800">
              1. AI Agent Configuration
            </h2>
          </div>

          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Confidence Threshold
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-600">
                    {confidence}%
                  </span>

                  <div className="relative w-28">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={confidence}
                      onChange={(e) =>
                        setConfidence(Number(e.target.value))
                      }
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    />

                    <div className="h-1.5 rounded-full bg-slate-200">
                      <div
                        className="h-1.5 rounded-full bg-blue-600 transition-all"
                        style={{ width: `${confidence}%` }}
                      />
                    </div>

                    <div
                      className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-blue-600 bg-white shadow-sm transition-all"
                      style={{
                        left: `calc(${confidence}% - 8px)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {aiSettings.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        [item.title]: !prev[item.title],
                      }))
                    }
                    className={`relative h-6 w-11 rounded-full transition-all duration-300 ${
                      settings[item.title]
                        ? "bg-blue-600"
                        : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${
                        settings[item.title]
                          ? "right-1"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="flex w-full items-center justify-between border-t border-slate-200 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-slate-50">
            <span>View AI Agent Settings</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Agent Health */}
      <div>
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm h-full">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              Agent Health
            </h3>
          </div>

          <div className="p-4 flex flex-col h-[calc(100%-53px)]">
            {healthMetrics.map((metric, index) => (
              <div key={metric.title}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      {metric.title}
                    </p>

                    <svg
                      className="w-[160px] h-8"
                      viewBox="0 0 160 30"
                      fill="none"
                    >
                      <path
                        d={metric.path}
                        stroke="#9EDBB3"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="text-right">
                    <p className="text-[20px] font-bold text-slate-800 leading-none">
                      {metric.value}
                    </p>

                    <p className="text-xs font-semibold text-green-500 mt-1">
                      {metric.change}
                    </p>
                  </div>
                </div>

                {index !== healthMetrics.length - 1 && (
                  <div className="border-b border-slate-100 my-3" />
                )}
              </div>
            ))}

            <div className="flex-1" />

            <div className="border-t border-slate-100 pt-3 flex justify-between items-end">
              <div>
                <p className="text-sm text-slate-700 mb-1">
                  Learning Status
                </p>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                  <span className="text-lg font-semibold text-green-600">
                    Active
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-500">
                  Model
                </p>

                <p className="text-lg font-semibold text-slate-700">
                  v2.4
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}