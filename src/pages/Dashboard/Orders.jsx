// components/Orders.js
import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiXCircle,
} from "react-icons/fi";
import ordersData from "../../../public/dummy-order.json";
import Pagination from "../../components/Pagination";

const Orders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [editingId, setEditingId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <FiCheckCircle className="text-green-500" />;
      case "shipped":
        return <FiTruck className="text-blue-400" />;
      case "pending":
        return <FiClock className="text-amber-400" />;
      case "cancelled":
        return <FiXCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const handleEdit = (order) => {
    setEditingId(order.id);
    setNewStatus(order.status);
  };

  const handleSave = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6">
          Orders Management
        </h1>

        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Customer
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Product
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-amber-500 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-zinc-800 hover:bg-zinc-750 transition-colors"
                >
                  <td className="py-3 px-4 text-zinc-200 font-medium">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-zinc-200">{order.customer}</td>
                  <td className="py-3 px-4 text-zinc-300">
                    {order.product} (Qty: {order.quantity})
                  </td>
                  <td className="py-3 px-4 text-zinc-200 font-medium">
                    ${(order.price * order.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === order.id ? (
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="pending" className="bg-zinc-800">
                          Pending
                        </option>
                        <option value="shipped" className="bg-zinc-800">
                          Shipped
                        </option>
                        <option value="delivered" className="bg-zinc-800">
                          Delivered
                        </option>
                        <option value="cancelled" className="bg-zinc-800">
                          Cancelled
                        </option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        {getStatusIcon(order.status)}
                        <span className="ml-2 capitalize text-zinc-200">
                          {order.status}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-3">
                      {editingId === order.id ? (
                        <>
                          <button
                            onClick={() => handleSave(order.id)}
                            className="p-2 text-green-500 hover:text-green-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Save"
                          >
                            <FiCheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Cancel"
                          >
                            <FiXCircle className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(order)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
