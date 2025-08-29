import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import ProductDrawer from "./ProductDrawer";

interface ProductsTableProps {
  filters: { search: string; warehouse: string; status: string };
}

export default function ProductsTable({ filters }: ProductsTableProps) {
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { 
        search: filters.search || null,
        warehouse: filters.warehouse || null,
        status: filters.status || null,
        page,
        limit: 10,
     },
  });

  if (loading) return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <p className="text-gray-500">Loading products...</p>
    </div>
  );
  
  if (error) return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <p className="text-red-500">Error: {error.message}</p>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Products Inventory</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warehouse
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.products?.map((p: any, index: number) => (
                <tr
                  key={p.id || index}
                  onClick={() => setSelectedProduct(p)}
                  className={`cursor-pointer transition-colors duration-150 ${
                    p.status === "Critical" 
                      ? "bg-red-50 hover:bg-red-100" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{p.sku}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{p.warehouse}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-medium text-gray-900">{p.stock?.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-900">{p.demand?.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        p.status === "Healthy"
                          ? "bg-green-100 text-green-800"
                          : p.status === "Low"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-sm font-medium text-gray-700">
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data?.products?.length < 10}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-500">
            Showing {data?.products?.length || 0} products
          </div>
        </div>
      </div>

      {/* Drawer */}
      {selectedProduct && (
        <ProductDrawer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}