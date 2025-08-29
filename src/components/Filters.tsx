import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_WAREHOUSES } from "../graphql/queries";

interface FiltersProps {
  onFilterChange: (filters: { search: string; warehouse: string; status: string }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const { data } = useQuery(GET_WAREHOUSES);
  const [search, setSearch] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [status, setStatus] = useState("");

  // Call onFilterChange whenever any filter changes
  useEffect(() => {
    onFilterChange({ search, warehouse, status });
  }, [search, warehouse, status, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row gap-4 items-center">
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by name, SKU, ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/3 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Warehouse Dropdown */}
      <select
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">All Warehouses</option>
        {data?.warehouses.map((w: string) => (
          <option key={w} value={w}>
            {w}
          </option>
        ))}
      </select>

      {/* Status Dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="Healthy">Healthy</option>
        <option value="Low">Low</option>
        <option value="Critical">Critical</option>
      </select>
    </div>
  );
}