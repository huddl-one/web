"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

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
                <Bar
                    stackId={"a"}
                    dataKey="easy"
                    fill="#D8FCD9"
                    radius={[4, 4, 0, 0]}
                />
                <Bar
                    stackId={"a"}
                    dataKey="med"
                    fill="#FFFDE7"
                    radius={[4, 4, 0, 0]}
                />
                <Bar
                    stackId={"a"}
                    dataKey="hard"
                    fill="#FFD6A5"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
