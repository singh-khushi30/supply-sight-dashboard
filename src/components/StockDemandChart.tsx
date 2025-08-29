import React from "react";
import { useQuery } from "@apollo/client";
import { GET_KPIS } from "../graphql/queries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartProps {
  range: string;
}

export default function StockDemandChart({ range }: ChartProps) {
  const days = parseInt(range.replace("d", "")); // convert "7d" → 7
  const { loading, error, data } = useQuery(GET_KPIS, {
    variables: { range: days },
  });

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Stock vs Demand Trend ({range})</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.kpis}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="stock" stroke="#2563eb" strokeWidth={2} name="Stock" />
          <Line type="monotone" dataKey="demand" stroke="#dc2626" strokeWidth={2} name="Demand" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
