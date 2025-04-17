import React from 'react';

const MyOrders = () => {
    const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

    const orders = [
        { id: 1, items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }], address: { firstName: "John", lastName: "Doe", street: "123 Main St", city: "New York", state: "NY", zipcode: "10001", country: "USA"}, amount: 320.0, paymentType: "Credit Card", orderDate: "10/10/2022", isPaid: true },
        { id: 2, items: [{ product: { name: "Adidas Ultraboost" }, quantity: 2 }], address: { firstName: "Jane", lastName: "Doe", street: "456 Elm St", city: "Los Angeles", state: "CA", zipcode: "90001", country: "USA"}, amount: 450.0, paymentType: "PayPal", orderDate: "10/12/2022", isPaid: false },
        { id: 3, items: [{ product: { name: "Puma RS-X" }, quantity: 1 }], address: { firstName: "Bob", lastName: "Smith", street: "789 Oak St", city: "Chicago", state: "IL", zipcode: "60601", country: "USA"}, amount: 220.0, paymentType: "Debit Card", orderDate: "10/14/2022", isPaid: true },
    ];

    return (
        <div className="min-h-screen flex justify-center items-center bg-zinc-900">
            <div className="md:p-10 p-4 space-y-4 bg-zinc-900">
                <h2 className="text-2xl font-bold text-amber-500 text-center">Orders List</h2>
                {orders.map((order, index) => (
                    <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-750 transition-colors">
                        <div className="flex gap-5">
                            <img className="w-12 h-12 object-cover opacity-60" src={boxIcon} alt="boxIcon" />
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col justify-center">
                                    <p className="font-medium text-amber-500">
                                        {item.product.name} <span className={`text-indigo-500 ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text-sm">
                            <p className='font-medium text-emerald-600 mb-1'>{order.address.firstName} {order.address.lastName}</p>
                            <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                        </div>

                        <p className="font-medium text-amber-500 text-base my-auto">${order.amount}</p>

                        <div className="flex flex-col text-sm">
                            <p className="text-emerald-600">Method: {order.paymentType}</p>
                            <p>Date: {order.orderDate}</p>
                            <p className={order.isPaid ? "text-green-500" : "text-red-500"}>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
