import React, { useState } from "react";
import { FaUser, FaMapMarkedAlt, FaCreditCard, FaShoppingCart } from "react-icons/fa";
import bkashLogo from '../assets/bkash.png';
import nagadLogo from '../assets/nagad.png';
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [bkashData, setBkashData] = useState({ phone: "", transactionId: "" });
  const [nagadData, setNagadData] = useState({ phone: "", transactionId: "" });
  
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    country: "United States",
    state: "",
    postalCode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields based on payment method
    if (paymentMethod === "bkash") {
      if (!bkashData.phone || !bkashData.transactionId) {
        toast.error("Please fill all bKash payment details");
        return;
      }
    } else if (paymentMethod === "nagad") {
      if (!nagadData.phone || !nagadData.transactionId) {
        toast.error("Please fill all Nagad payment details");
        return;
      }
    }
    
    // Basic form validation
    const requiredFields = ['phone', 'firstName', 'lastName', 'address1', 'city', 'state', 'postalCode'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field`);
        return;
      }
    }
    
    // Prepare order data
    const orderData = {
      customer: formData,
      payment: {
        method: paymentMethod,
        details: paymentMethod === "bkash" ? bkashData : 
                paymentMethod === "nagad" ? nagadData : null
      },
      orderTotal: 199.89,
      items: [
        { name: "Black Automatic Watch", quantity: 1, price: 169.99 },
        { name: "Product 2", quantity: 1, price: 29.90 }
      ]
    };
    
    console.log("Order submitted:", orderData);
    toast.success("Order placed successfully!");
    // Here you would typically send this data to your backend
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-500 flex items-center">
            <span className="bg-zinc-800 text-amber-500 p-2 rounded-lg mr-3">
              <FaShoppingCart className="w-5 h-5" />
            </span>
            Checkout
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Section - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-zinc-700 p-2 rounded-md mr-3 text-amber-400">
                  <FaUser className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-amber-500">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className={inputStyle}
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className={inputStyle}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-zinc-700 p-2 rounded-md mr-3 text-amber-400">
                  <FaMapMarkedAlt className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-amber-500">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    className={inputStyle} 
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className={inputStyle} 
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Address Line 1</label>
                  <input 
                    type="text" 
                    name="address1"
                    className={inputStyle} 
                    placeholder="123 Main St"
                    value={formData.address1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Address Line 2 (Optional)</label>
                  <input 
                    type="text" 
                    name="address2"
                    className={inputStyle} 
                    placeholder="Apt, suite, etc."
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">City</label>
                  <input 
                    type="text" 
                    name="city"
                    className={inputStyle} 
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Country</label>
                  <select 
                    name="country"
                    className={inputStyle}
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">State/Province</label>
                  <input 
                    type="text" 
                    name="state"
                    className={inputStyle} 
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    className={inputStyle} 
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-800 rounded-lg border border-zinc-700 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-zinc-700 p-2 rounded-md mr-3 text-amber-400">
                  <FaCreditCard className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-semibold text-amber-500">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="cod"
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-zinc-600"
                  />
                  <label htmlFor="cod" className="ml-3 block text-sm font-medium text-zinc-300">
                    Cash on Delivery
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="bkash"
                    type="radio"
                    name="payment"
                    value="bkash"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-zinc-600"
                  />
                  <label htmlFor="bkash" className="ml-3 block text-sm font-medium text-zinc-300">
                    bKash
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="nagad"
                    type="radio"
                    name="payment"
                    value="nagad"
                    checked={paymentMethod === "nagad"}
                    onChange={() => setPaymentMethod("nagad")}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-zinc-600"
                  />
                  <label htmlFor="nagad" className="ml-3 block text-sm font-medium text-zinc-300">
                    Nagad
                  </label>
                </div>
              </div>

              {/* bKash Payment Section */}
              {paymentMethod === "bkash" && (
                <div className="mt-6 bg-zinc-750 p-4 rounded-lg border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={bkashLogo} alt="Bkash Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                    <h3 className="text-lg font-semibold text-amber-400">BKASH Payment</h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-zinc-300">
                      Send <span className="text-amber-400 font-bold">$199.89</span> to:
                    </p>
                    <p className="text-zinc-300">
                      Account: <span className="font-bold">01316979159</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-zinc-300 mb-1">Your BKASH Number</label>
                      <input
                        type="tel"
                        name="bkashPhone"
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                        value={bkashData.phone}
                        onChange={(e) => setBkashData({...bkashData, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1">Transaction ID</label>
                      <input
                        type="text"
                        name="bkashTransactionId"
                        placeholder="TRX123456"
                        className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                        value={bkashData.transactionId}
                        onChange={(e) => setBkashData({...bkashData, transactionId: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Nagad Payment Section */}
              {paymentMethod === "nagad" && (
                <div className="mt-6 bg-zinc-750 p-4 rounded-lg border border-zinc-700">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={nagadLogo} alt="Nagad Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                    <h3 className="text-lg font-semibold text-amber-400">NAGAD Payment</h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-zinc-300">
                      Send <span className="text-amber-400 font-bold">$199.89</span> to:
                    </p>
                    <p className="text-zinc-300">
                      Account: <span className="font-bold">01316979159</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-zinc-300 mb-1">Your NAGAD Number</label>
                      <input
                        type="tel"
                        name="nagadPhone"
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                        value={nagadData.phone}
                        onChange={(e) => setNagadData({...nagadData, phone: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1">Transaction ID</label>
                      <input
                        type="text"
                        name="nagadTransactionId"
                        placeholder="TRX123456"
                        className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                        value={nagadData.transactionId}
                        onChange={(e) => setNagadData({...nagadData, transactionId: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:sticky lg:top-8 bg-zinc-800 rounded-lg border border-zinc-700 p-6">
            <h2 className="text-lg font-semibold mb-6 text-amber-500 pb-4 border-b border-zinc-700">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {[1, 2].map((_, index) => (
                <div className="flex items-start gap-4" key={index}>
                  <div className="w-16 h-16 bg-zinc-700 rounded-md flex items-center justify-center text-amber-400 flex-shrink-0">
                    <span className="text-xl font-bold">P{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-zinc-200">Black Automatic Watch</h3>
                    <p className="text-xs text-zinc-400 mb-2">One size</p>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border border-zinc-600 rounded text-zinc-300 hover:bg-zinc-700 transition-colors">
                        -
                      </button>
                      <span className="text-zinc-200 text-sm w-6 text-center">1</span>
                      <button className="px-2 py-1 border border-zinc-600 rounded text-zinc-300 hover:bg-zinc-700 transition-colors">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-amber-400">$169.99</p>
                    <p className="text-xs text-zinc-500 line-through">$199.99</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-sm text-zinc-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$169.99</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$24.90</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-700 mb-6">
              <div className="flex justify-between font-semibold text-zinc-200">
                <span>Order Total</span>
                <span className="text-amber-400">$199.89</span>
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
              {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
            </button>

            <p className="mt-4 text-xs text-zinc-400 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = `w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-200 placeholder-zinc-400 text-sm transition-colors`;