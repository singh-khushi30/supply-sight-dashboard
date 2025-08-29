import React from "react";
import { Package, Target, TrendingUp } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";

export default function KPISection() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading KPIs...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
 
  const products = data.products;
  const totalStock = products.reduce((sum: number, p: any) => sum + p.stock, 0);
  const totalDemand = products.reduce((sum: number, p: any) => sum + p.demand, 0);
  const fillRate = ((products.reduce((sum: number, p: any) => sum + Math.min(p.stock, p.demand), 0) / totalDemand) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Stock */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-blue-500">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Total Stock</h2>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalStock}</p>
            <p className="text-sm text-gray-500">Units available across all warehouses</p>
          </div>
          <div className="p-2 rounded-lg bg-gray-50 text-blue-500">
            <Package size={24} />
          </div>
        </div>
      </div>

      {/* Total Demand */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-orange-500">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Total Demand</h2>
            <p className="text-3xl font-bold text-gray-900 mb-1">{totalDemand}</p>
            <p className="text-sm text-gray-500">Units required across all products</p>
          </div>
          <div className="p-2 rounded-lg bg-gray-50 text-orange-500">
            <Target size={24} />
          </div>
        </div>
      </div>

      {/* Fill Rate */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-yellow-500">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Fill Rate</h2>
            <p className="text-3xl font-bold text-gray-900 mb-1">{fillRate}</p>
            <p className="text-sm text-gray-500">Demand fulfillment percentage</p>
          </div>
          <div className="p-2 rounded-lg bg-gray-50 text-yellow-500">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}