import React from "react";

interface TopBarProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export default function TopBar({ selectedRange, onRangeChange }: TopBarProps) {
  const ranges = ["7d", "14d", "30d"];

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
          S
        </div>
        <h1 className="text-2xl font-bold text-gray-800">SupplySight</h1>
      </div>

      {/* Date Range Buttons */}
      <div className="flex rounded-lg border border-gray-300 overflow-hidden">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedRange === range
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </header>
  );
}
