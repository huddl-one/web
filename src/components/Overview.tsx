"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const data = [
    {
        name: "May",
        easy: Math.floor(Math.random() * 50) + 10,
        med: Math.floor(Math.random() * 50) + 10,
        hard: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Jun",
        easy: Math.floor(Math.random() * 50) + 10,
        med: Math.floor(Math.random() * 50) + 10,
        hard: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Jul",
        easy: Math.floor(Math.random() * 50) + 10,
        med: Math.floor(Math.random() * 50) + 10,
        hard: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Aug",
        easy: Math.floor(Math.random() * 50) + 10,
        med: Math.floor(Math.random() * 50) + 10,
        hard: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Sep",
        easy: Math.floor(Math.random() * 50) + 10,
        med: Math.floor(Math.random() * 50) + 10,
        hard: Math.floor(Math.random() * 50) + 10,
    },
    {
        name: "Oct",
        easy: Math.floor(Math.random() * 50) + 10,
        med: Math.floor(Math.random() * 50) + 10,
        hard: Math.floor(Math.random() * 50) + 10,
    },
];

export const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: any;
    payload?: any;
    label?: any;
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-secondary/75 rounded p-3">
                {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
                <div>
                    {payload.map((pld: any) => (
                        <div
                            key={pld}
                            className="flex items-center justify-between gap-2"
                        >
                            <div>{pld.value}</div>
                            <div
                                className="capitalize"
                                style={{ color: pld.fill }}
                            >
                                {pld.dataKey}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export function Overview() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                />
                <Bar
                    stackId={"a"}
                    dataKey="easy"
                    fill="#8E53E6"
                    radius={[4, 4, 0, 0]}
                />
                <Bar
                    stackId={"a"}
                    dataKey="med"
                    fill="#6D27D9"
                    radius={[4, 4, 0, 0]}
                />
                <Bar
                    stackId={"a"}
                    dataKey="hard"
                    fill="#5122A7"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
