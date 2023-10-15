"use client";

import { AreaChart } from "@tremor/react";

const data = [
    {
      Month: 'May 23',
      Sales: 2890,
      Profit: 2400
    },
    {
      Month: 'Jun 23',
      Sales: 1890,
      Profit: 1398
    },
    {
      Month: 'Jul 23',
      Sales: 3890,
      Profit: 2980
    },
    {
      Month: 'Aug 23',
      Sales: 2890,
      Profit: 2400
    },
    {
      Month: 'Sept 23',
      Sales: 1890,
      Profit: 1398
    },
    {
      Month: 'Oct 23',
      Sales: 3890,
      Profit: 2980
    }
  ];

const dataFormatter = (number: number) => {
    return number.toString();
};

export function Overview() {
    return (
        <AreaChart
            className="h-72 mt-4"
            data={data}
            index="Month"
            categories={['Sales', 'Profit']}
            colors={['indigo', 'fuchsia']}
            valueFormatter={dataFormatter}
        />
    );
}
