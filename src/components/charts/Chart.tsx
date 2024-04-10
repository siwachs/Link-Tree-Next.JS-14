"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// @ts-ignore
import { TransformedAggregationObject } from "@/../global";

const Chart: React.FC<{
  data: TransformedAggregationObject[];
  combined?: boolean;
  dataKey?: string;
}> = ({ data, combined, dataKey }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart width={1240} height={450} data={data}>
        <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f5f5f5" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#aaa", fontSize: 14 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tick={{ fill: "#aaa" }}
        />
        <Tooltip />
        <Legend />

        {combined ? (
          <>
            <Line
              type="monotone"
              dataKey="views"
              stroke="#09f"
              strokeWidth="4"
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#8884d8"
              strokeWidth="4"
            />
          </>
        ) : (
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#09f"
            strokeWidth="4"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
