import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiXCircle,
  FiSearch,
  FiDollarSign,
  FiCreditCard,
} from "react-icons/fi";
import Pagination from "../../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../api/Api";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import axiosInstance from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [editingId, setEditingId] = useState(null);
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newPaymentStatus, setNewPaymentStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const ordersPerPage = 5;

  const {
    data: ordersResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="min-h-screen bg-zinc-900 p-4 md:p-6 flex justify-center items-center">
        Error loading orders
      </div>
    );

  const orders = ordersResponse?.data || [];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sortedAndFilteredOrders = [...orders]
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    .filter((order) => {
      const matchesSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${order.customer?.firstName} ${order.customer?.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedAndFilteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(sortedAndFilteredOrders.length / ordersPerPage);

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      delivered: "bg-green-900 text-green-100",
      shipped: "bg-blue-900 text-blue-100",
      pending: "bg-amber-900 text-amber-100",
      cancelled: "bg-red-900 text-red-100",
    };

    const statusIcons = {
      delivered: <FiCheckCircle className="mr-1" />,
      shipped: <FiTruck className="mr-1" />,
      pending: <FiClock className="mr-1" />,
      cancelled: <FiXCircle className="mr-1" />,
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
          statusStyles[status.toLowerCase()]
        }`}
      >
        {statusIcons[status.toLowerCase()]}
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const PaymentBadge = ({ isPaid }) => {
    const paymentStyles = {
      true: "bg-green-900 text-green-100",
      false: "bg-red-900 text-red-100",
    };

    const paymentIcons = {
      true: <FiCreditCard className="mr-1" />,
      false: <FiDollarSign className="mr-1" />,
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
          paymentStyles[isPaid]
        }`}
      >
        {paymentIcons[isPaid]}
        <span>{isPaid ? "Paid" : "Unpaid"}</span>
      </div>
    );
  };

  const handleEditStatus = (order) => {
    setEditingId(order._id);
    setNewStatus(order.status);
    setEditingPaymentId(null); // Close payment edit if open
  };

  const handleEditPayment = (order) => {
    setEditingPaymentId(order._id);
    setNewPaymentStatus(order.isPaid);
    setEditingId(null); // Close status edit if open
  };

  const handleSaveStatus = async (id) => {
    try {
      await axiosInstance.patch(`/orders/update-order-status/${id}`, {
        status: newStatus,
      });
      toast.success("Order status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    } finally {
      setEditingId(null);
    }
  };

  const handleSavePayment = async (id) => {
    try {
      await axiosInstance.patch(`/orders/update-payment-status/${id}`, {
        isPaid: newPaymentStatus,
      });
      toast.success("Payment status updated successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to update payment status");
      console.error(error);
    } finally {
      setEditingPaymentId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingPaymentId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/orders/delete/${id}`);
      toast.success("Order deleted successfully");
      refetch();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-500">
            Orders Management
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-zinc-700">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Order ID</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Customer</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Product</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Total</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Date</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Status</th>
                <th className="py-3 px-4 text-left text-amber-500 font-medium">Payment</th>
                <th className="py-3 px-4 text-center text-amber-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="bg-zinc-800 hover:bg-zinc-750 transition-colors"
                  >
                    <td className="py-3 px-4 text-zinc-200 font-medium">
                      {order._id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4 text-zinc-200">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </td>
                    <td className="py-3 px-4 text-zinc-300">
                      {order.items[0]?.name} (Qty: {order.items[0]?.quantity})
                    </td>
                    <td className="py-3 px-4 text-zinc-200 font-medium">
                      ${order.orderTotal?.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-zinc-300">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="py-3 px-4">
                      {editingId === order._id ? (
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <StatusBadge status={order.status} />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingPaymentId === order._id ? (
                        <select
                          value={newPaymentStatus}
                          onChange={(e) => setNewPaymentStatus(e.target.value === "true")}
                          className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="true">Paid</option>
                          <option value="false">Unpaid</option>
                        </select>
                      ) : (
                        <PaymentBadge isPaid={order.isPaid} />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center space-x-3">
                        {editingId === order._id || editingPaymentId === order._id ? (
                          <>
                            <button
                              onClick={() => 
                                editingId === order._id 
                                  ? handleSaveStatus(order._id) 
                                  : handleSavePayment(order._id)
                              }
                              className="p-2 text-green-500 hover:text-green-400 hover:bg-zinc-700 rounded-full transition-colors"
                              title="Save"
                            >
                              <FiCheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                              title="Cancel"
                            >
                              <FiXCircle className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditStatus(order)}
                              className="p-2 text-blue-400 hover:text-blue-300 hover:bg-zinc-700 rounded-full transition-colors"
                              title="Edit Status"
                            >
                              <FiEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditPayment(order)}
                              className="p-2 text-purple-400 hover:text-purple-300 hover:bg-zinc-700 rounded-full transition-colors"
                              title="Edit Payment"
                            >
                              <FiCreditCard className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(order._id)}
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-4 px-4 text-center text-zinc-400"
                  >
                    No orders found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

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