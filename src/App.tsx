import React, { useState } from 'react';
import TopBar from "./components/TopBar";
import KPISection from './components/KPISection';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';
import StockDemandChart from './components/StockDemandChart';

const App = () => {
  const [filters, setFilters] = useState({ search: "", warehouse: "", status: "" });
  const [selectedRange, setSelectedRange] = useState("7d");
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Top Bar */}
      <TopBar selectedRange={selectedRange} onRangeChange={setSelectedRange} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <KPISection />
        <StockDemandChart range={selectedRange}/>
        <Filters onFilterChange={setFilters} />
        <ProductsTable  filters={filters} />
      </div>
    </div>
  );
};

export default App;