import React from "react";
import { PieChart, Pie, Label, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Auto Processed', value: 854, fill: '#2D9CDB' },
  { name: 'Human Intervention', value: 133, fill: '#2D9CDB26' }
];

const COLORS = ["#2D9CDB", "#2D9CDB26", "#0ea5e9", "#f59e0b"];

const MyPie = () => (
  <Pie 
    data={data} 
    dataKey="value" 
    nameKey="name" 
    outerRadius="70%" 
    innerRadius="50%" 
    isAnimationActive={false} />
);

export default function PieChartData( { total=0, auto_process=0, human_review=0} ) {
  
  const autoVal = Math.max(0, Number(auto_process) || 0);
  const humanVal = Math.max(0, Number(human_review) || 0);

  const chartData = [
    { name: 'RFQ Processed',  value: autoVal,  fill: '#76A8F9' },
    { name: 'RFQ Partially Processed', value: humanVal, fill: '#00C950' },
  ];

  return (    
    <div className="border border-[#E5E7EB] rounded-lg p-3 bg-white">
      <label className="text-xs-sm text-primary-blue font-semibold">
        RFQ Distribution
      </label>

      {/* Center the chart horizontally */}
      <div className="mt-2 flex justify-center">
        {/* Give the chart a parent with a fixed height for ResponsiveContainer */}
        <div className="w-full max-w-[480px] min-h-[375px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"          // center horizontally inside the SVG
                cy="50%"          // center vertically
                outerRadius={120}
                innerRadius="45%"
              >
              </Pie>

              <Legend
                iconType="circle"
                iconSize={8}
                align="center"
                verticalAlign="bottom"
                layout="horizontal"
                formatter={(value, entry) => {
                  const count = entry?.payload?.value;
                  return (
                    <span style={{ fontSize: 12, color: "#4D4B46" }}>
                      {value} - {count}%
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}