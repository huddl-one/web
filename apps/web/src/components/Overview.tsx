"use client";

import { AreaChart } from "@tremor/react";

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

const dataFormatter = (number: number) => {
    return number.toString();
};

export function Overview() {
    return (
        <AreaChart
            className="h-72 mt-4"
            data={data}
            index="name"
            categories={["easy", "med", "hard"]}
            colors={["green", "yellow", "red"]}
            valueFormatter={dataFormatter}
        />
    );
}
