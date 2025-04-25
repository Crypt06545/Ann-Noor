import React, { useState } from "react";
import { FaUser, FaMapMarkedAlt, FaCreditCard, FaShoppingCart } from "react-icons/fa";
import bkashLogo from '../assets/bkash.png';
import nagadLogo from '../assets/nagad.png';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    contact: {
      phone: "",
      email: ""
    },
    shipping: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      country: "United States",
      state: "",
      postalCode: ""
    },
    payment: {
      bkashPhone: "",
      bkashTransactionId: "",
      nagadPhone: "",
      nagadTransactionId: ""
    }
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Contact validation
    if (!formData.contact.phone.trim()) {
      newErrors.contact = { ...newErrors.contact, phone: "Phone number is required" };
    }
    if (!formData.contact.email.trim()) {
      newErrors.contact = { ...newErrors.contact, email: "Email is required" };
    } else if (!/^\S+@\S+\.\S+$/.test(formData.contact.email)) {
      newErrors.contact = { ...newErrors.contact, email: "Invalid email format" };
    }

    // Shipping validation
    if (!formData.shipping.firstName.trim()) {
      newErrors.shipping = { ...newErrors.shipping, firstName: "First name is required" };
    }
    if (!formData.shipping.lastName.trim()) {
      newErrors.shipping = { ...newErrors.shipping, lastName: "Last name is required" };
    }
    if (!formData.shipping.address1.trim()) {
      newErrors.shipping = { ...newErrors.shipping, address1: "Address is required" };
    }
    if (!formData.shipping.city.trim()) {
      newErrors.shipping = { ...newErrors.shipping, city: "City is required" };
    }
    if (!formData.shipping.state.trim()) {
      newErrors.shipping = { ...newErrors.shipping, state: "State is required" };
    }
    if (!formData.shipping.postalCode.trim()) {
      newErrors.shipping = { ...newErrors.shipping, postalCode: "Postal code is required" };
    }

    // Payment method specific validation
    if (paymentMethod === "bkash") {
      if (!formData.payment.bkashPhone.trim()) {
        newErrors.payment = { ...newErrors.payment, bkashPhone: "bKash number is required" };
      }
      if (!formData.payment.bkashTransactionId.trim()) {
        newErrors.payment = { ...newErrors.payment, bkashTransactionId: "Transaction ID is required" };
      }
    } else if (paymentMethod === "nagad") {
      if (!formData.payment.nagadPhone.trim()) {
        newErrors.payment = { ...newErrors.payment, nagadPhone: "Nagad number is required" };
      }
      if (!formData.payment.nagadTransactionId.trim()) {
        newErrors.payment = { ...newErrors.payment, nagadTransactionId: "Transaction ID is required" };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const orderData = {
        contact: formData.contact,
        shipping: formData.shipping,
        paymentMethod,
        paymentDetails: paymentMethod === "cod" ? null : 
          paymentMethod === "bkash" ? {
            phone: formData.payment.bkashPhone,
            transactionId: formData.payment.bkashTransactionId
          } : {
            phone: formData.payment.nagadPhone,
            transactionId: formData.payment.nagadTransactionId
          },
        orderTotal: 199.89
      };
      
      console.log("Order submitted:", orderData);
      alert("Order submitted successfully! Check console for details.");
    }
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

        <form onSubmit={handleSubmit}>
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
                      className={inputStyle}
                      placeholder="+1 (555) 123-4567" 
                      value={formData.contact.phone}
                      onChange={(e) => handleInputChange("contact", "phone", e.target.value)}
                    />
                    {errors.contact?.phone && <p className="text-red-500 text-xs mt-1">{errors.contact.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className={inputStyle}
                      placeholder="your@email.com" 
                      value={formData.contact.email}
                      onChange={(e) => handleInputChange("contact", "email", e.target.value)}
                    />
                    {errors.contact?.email && <p className="text-red-500 text-xs mt-1">{errors.contact.email}</p>}
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
                      className={inputStyle} 
                      placeholder="John" 
                      value={formData.shipping.firstName}
                      onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
                    />
                    {errors.shipping?.firstName && <p className="text-red-500 text-xs mt-1">{errors.shipping.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className={inputStyle} 
                      placeholder="Doe" 
                      value={formData.shipping.lastName}
                      onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
                    />
                    {errors.shipping?.lastName && <p className="text-red-500 text-xs mt-1">{errors.shipping.lastName}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Address Line 1</label>
                    <input 
                      type="text" 
                      className={inputStyle} 
                      placeholder="123 Main St" 
                      value={formData.shipping.address1}
                      onChange={(e) => handleInputChange("shipping", "address1", e.target.value)}
                    />
                    {errors.shipping?.address1 && <p className="text-red-500 text-xs mt-1">{errors.shipping.address1}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Address Line 2 (Optional)</label>
                    <input 
                      type="text" 
                      className={inputStyle} 
                      placeholder="Apt, suite, etc." 
                      value={formData.shipping.address2}
                      onChange={(e) => handleInputChange("shipping", "address2", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">City</label>
                    <input 
                      type="text" 
                      className={inputStyle} 
                      placeholder="New York" 
                      value={formData.shipping.city}
                      onChange={(e) => handleInputChange("shipping", "city", e.target.value)}
                    />
                    {errors.shipping?.city && <p className="text-red-500 text-xs mt-1">{errors.shipping.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Country</label>
                    <select 
                      className={inputStyle}
                      value={formData.shipping.country}
                      onChange={(e) => handleInputChange("shipping", "country", e.target.value)}
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
                      className={inputStyle} 
                      placeholder="NY" 
                      value={formData.shipping.state}
                      onChange={(e) => handleInputChange("shipping", "state", e.target.value)}
                    />
                    {errors.shipping?.state && <p className="text-red-500 text-xs mt-1">{errors.shipping.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Postal Code</label>
                    <input 
                      type="text" 
                      className={inputStyle} 
                      placeholder="10001" 
                      value={formData.shipping.postalCode}
                      onChange={(e) => handleInputChange("shipping", "postalCode", e.target.value)}
                    />
                    {errors.shipping?.postalCode && <p className="text-red-500 text-xs mt-1">{errors.shipping.postalCode}</p>}
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
                          placeholder="01XXXXXXXXX"
                          className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                          value={formData.payment.bkashPhone}
                          onChange={(e) => handleInputChange("payment", "bkashPhone", e.target.value)}
                        />
                        {errors.payment?.bkashPhone && <p className="text-red-500 text-xs mt-1">{errors.payment.bkashPhone}</p>}
                      </div>

                      <div>
                        <label className="block text-zinc-300 mb-1">Transaction ID</label>
                        <input
                          type="text"
                          placeholder="TRX123456"
                          className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                          value={formData.payment.bkashTransactionId}
                          onChange={(e) => handleInputChange("payment", "bkashTransactionId", e.target.value)}
                        />
                        {errors.payment?.bkashTransactionId && <p className="text-red-500 text-xs mt-1">{errors.payment.bkashTransactionId}</p>}
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
                          placeholder="01XXXXXXXXX"
                          className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                          value={formData.payment.nagadPhone}
                          onChange={(e) => handleInputChange("payment", "nagadPhone", e.target.value)}
                        />
                        {errors.payment?.nagadPhone && <p className="text-red-500 text-xs mt-1">{errors.payment.nagadPhone}</p>}
                      </div>

                      <div>
                        <label className="block text-zinc-300 mb-1">Transaction ID</label>
                        <input
                          type="text"
                          placeholder="TRX123456"
                          className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2 text-zinc-200"
                          value={formData.payment.nagadTransactionId}
                          onChange={(e) => handleInputChange("payment", "nagadTransactionId", e.target.value)}
                        />
                        {errors.payment?.nagadTransactionId && <p className="text-red-500 text-xs mt-1">{errors.payment.nagadTransactionId}</p>}
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
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
              </button>

              <p className="mt-4 text-xs text-zinc-400 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = `w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 text-zinc-200 placeholder-zinc-400 text-sm transition-colors`;