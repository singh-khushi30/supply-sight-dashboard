import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_DEMAND, TRANSFER_STOCK, GET_PRODUCTS, GET_WAREHOUSES } from "../graphql/queries";
import { X, Package, Target, ArrowRight } from "lucide-react";

interface DrawerProps {
  product: any;
  onClose: () => void;
}

export default function ProductDrawer({ product, onClose }: DrawerProps) {
  const [demand, setDemand] = useState(product.demand);
  const [quantity, setQuantity] = useState("");
  const [toWarehouse, setToWarehouse] = useState("");
  const [closing, setClosing] = useState(false);

  const { data: warehouseData } = useQuery(GET_WAREHOUSES);

  const [updateDemand] = useMutation(UPDATE_DEMAND, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [transferStock] = useMutation(TRANSFER_STOCK, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleUpdateDemand = () => {
    updateDemand({ variables: { id: product.id, demand } });
  };

  const handleTransferStock = () => {
    if (quantity && toWarehouse) {
      transferStock({
        variables: { id: product.id, quantity: Number(quantity), toWarehouse },
      });
      setQuantity("");
      setToWarehouse("");
    }
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300); 
  };

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-300 ${
        closing ? "bg-black/0" : "bg-black/30"
      }`}
      onClick={handleClose}
    >
      {/* Drawer Panel */}
      <div
        className={`w-96 h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
          closing ? "translate-x-full" : "translate-x-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Product Info */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{product.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Product ID</p>
                  <p className="font-medium text-gray-900">{product.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">SKU</p>
                  <p className="font-medium text-gray-900">{product.sku}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">Warehouse</p>
                  <p className="font-medium text-gray-900">{product.warehouse}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === "Healthy"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Low"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                    {product.status === "Critical" && (
                      <span className="text-sm text-gray-500">Stock below demand</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Levels</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Package size={32} className="mx-auto text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">{product.stock}</div>
                  <div className="text-sm text-gray-500">Current Stock</div>
                </div>
                <div className="text-center">
                  <Target size={32} className="mx-auto text-orange-500 mb-2" />
                  <div className="text-2xl font-bold">{product.demand}</div>
                  <div className="text-sm text-gray-500">Demand</div>
                </div>
              </div>
            </div>

            {/* Update Demand */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h3 className="font-semibold mb-3">Update Demand</h3>
              <input
                type="number"
                value={demand}
                onChange={(e) => setDemand(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpdateDemand}
                className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg"
              >
                Update Demand
              </button>
            </div>

            {/* Transfer Stock */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h3 className="font-semibold mb-3">Transfer Stock</h3>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={toWarehouse}
                onChange={(e) => setToWarehouse(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select warehouse</option>
                {warehouseData?.warehouses?.map((w: string) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTransferStock}
                disabled={!quantity || !toWarehouse}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-2 rounded-lg"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
