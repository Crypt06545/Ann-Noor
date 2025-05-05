import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getOrders } from "../api/Api";
import { useAppContext } from "../context/AppContext";
import {LoadingSpinner} from '../components/LoadingSpinner'
const MyOrders = () => {
  const { user } = useAppContext();
  const email = user?.email;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", email],
    queryFn: () => getOrders(email),
  });

  // console.log("API Response:", data); // Debug log

  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // Extract orders from the response data
  const orders = data?.data?.data?.orders || [];

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-zinc-900">
        <div className="text-red-500">Error loading orders</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-900">
      <div className="md:p-10 p-4 space-y-4 bg-zinc-900 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-amber-500 text-center mb-8">
          My Orders
        </h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-zinc-400">You haven't placed any orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-750 transition-colors"
            >
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover opacity-60"
                  src={boxIcon}
                  alt="boxIcon"
                />
                <div className="flex flex-col justify-center">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      <p className="font-medium text-amber-500">
                        {item.name}{" "}
                        <span className="text-indigo-500">
                          x {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <p className="font-medium text-emerald-600 mb-1">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p>
                  {order.customer.address1}, {order.customer.city},{" "}
                  {order.customer.state}, {order.customer.postalCode},{" "}
                  {order.customer.country}
                </p>
              </div>

              <p className="font-medium text-amber-500 text-base my-auto">
                ${order.orderTotal.toFixed(2)}
              </p>

              <div className="flex flex-col text-sm">
                <p className="text-emerald-600">
                  Method:{" "}
                  {order.payment.method === "cod"
                    ? "Cash on Delivery"
                    : order.payment.method === "bkash"
                    ? "bKash"
                    : "Nagad"}
                </p>
                <p>Date: {formatDate(order.orderDate)}</p>
                <p className={order.isPaid ? "text-green-500" : "text-red-500"}>
                  Payment: {order.isPaid ? "Paid" : order.payment.method === "cod" ? "Pay on Delivery" : "Pending"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;