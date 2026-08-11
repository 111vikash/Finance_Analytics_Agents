import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { RechartsDevtools } from '@recharts/devtools';

export default function LineChartData() {

    const data = [
        {
            name: '18 May',
            'RFQ processed - Partial': 4000,
            'RFQ received': 2400,
            "RFQ processed - full": 2400,
        },
        {
            name: '19 May',
            'RFQ processed - Partial': 3000,
            'RFQ received': 1398,
            "RFQ processed - full": 5000,
        },
        {
            name: '20 May',
            'RFQ processed - Partial': 2000,
            'RFQ received': 9800,
            "RFQ processed - full": 7000,
        },
        {
            name: '21 May',
            'RFQ processed - Partial': 2780,
            'RFQ received': 3908,
            "RFQ processed - full": 5000,
        },
        {
            name: '22 May',
            'RFQ processed - Partial': 1890,
            'RFQ received': 4800,
            "RFQ processed - full": 2181,
        },
        {
            name: '23 May',
            'RFQ processed - Partial': 2390,
            'RFQ received': 3800,
            "RFQ processed - full": 2500,
        },
        {
            name: '24 May',
            'RFQ processed - Partial': 3490,
            'RFQ received': 4300,
            "RFQ processed - full": 2100,
        },
    ];

    return (
        <LineChart
            style={{ width: '100%', maxWidth: '1400px', height: '100%', maxHeight: '50vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 12,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
            <XAxis dataKey="name" stroke="#666666" />
            <YAxis width="auto" stroke="#666666" />
            <Tooltip
                cursor={{
                stroke: '#666666',
                }}
                contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#666666',
                borderRadius: '4px',
                }}
            />
            <Legend 
                iconType='circle'
                wrapperStyle={{ display: "flex", paddingTop: "24px", gap: "42px", justifyContent: "center" }}
            />
            <Line
                type="monotone"
                dataKey="RFQ received"
                stroke="#3B82F6"
                dot={{
                fill: '#3B82F6',
                }}
                activeDot={{ r: 8, stroke: '#3B82F6' }}
            />
            <Line
                type="monotone"
                dataKey="RFQ processed - Partial"
                stroke="#F47C7C"
                dot={{
                fill: '#F47C7C',
                }}
                activeDot={{ r: 8, stroke: '#F47C7C' }}
            />
            <Line
                type="monotone"
                dataKey="RFQ processed - full"
                stroke="#10B981"
                dot={{
                fill: '#10B981',
                }}
                activeDot={{ r: 8, stroke: '#10B981' }}
            />
            {/* <RechartsDevtools /> */}
        </LineChart>
    );
}