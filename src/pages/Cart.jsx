import { useEffect, useState } from "react";
import { FaTrash, FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import BkashPayment from "./BkashPayment";
import NagadPayment from "./NagadPayment";

const Cart = () => {
  const {
    currency,
    cartItems,
    removeFromCart,
    cartCount,
    updateCartItem,
    cartAmount,
    products,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState(dummyAddress);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");
  const navigate = useNavigate();

  const isCartEmpty = cartCount() === 0;

  const palceOrder =()=>{
    
  }
  const gertCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      gertCart();
    }
  }, [products, cartItems]);

  if (products.length === 0 || !cartItems) {
    return null;
  }



  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1 bg-zinc-800 p-6 rounded-xl border border-zinc-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-amber-500">
                Shopping Cart
              </h1>
              <span className="text-sm bg-zinc-700 text-amber-400 px-3 py-1 rounded-full">
                {cartCount()} Items
              </span>
            </div>

            {isCartEmpty ? (
              <div className="text-center py-12">
                <p className="text-xl text-zinc-300 mb-4">Your cart is empty</p>
                <button
                  onClick={() => navigate("/")}
                  className="text-amber-500 hover:text-amber-400 font-medium flex items-center justify-center gap-2 mx-auto"
                >
                  <FaArrowLeft className="w-3 h-3" />
                  <span>Continue Shopping</span>
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[2fr_1fr_1fr] text-zinc-400 text-sm font-medium pb-4 border-b border-zinc-700">
                  <p className="text-left">PRODUCT DETAILS</p>
                  <p className="text-center">SUBTOTAL</p>
                  <p className="text-center">ACTION</p>
                </div>

                {cartArray.map((product, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_1fr_1fr] text-zinc-300 items-center py-5 border-b border-zinc-700 hover:bg-zinc-750 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          navigate(`/products/${product._id}`);
                          scrollTo(0, 0);
                        }}
                        className="w-20 h-20 flex items-center justify-center border border-zinc-700 rounded-lg bg-zinc-800 overflow-hidden cursor-pointer"
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={product.image[0]}
                          alt={product.name}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-200">
                          {product.name}
                        </p>
                        <div className="text-xs text-zinc-400 space-y-1 mt-1">
                          <p>weight: {product.weight || "N/A"}</p>
                          <div className="flex items-center">
                            <span className="mr-2">Qty:</span>
                            <select
                              onChange={(e) =>
                                updateCartItem(
                                  product._id,
                                  Number(e.target.value)
                                )
                              }
                              value={cartItems[product._id]}
                              className="bg-zinc-700 border border-zinc-600 text-zinc-200 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-amber-500"
                            >
                              {Array(
                                cartItems[product._id] > 9
                                  ? cartItems[product._id]
                                  : 9
                              )
                                .fill("")
                                .map((_, index) => (
                                  <option key={index} value={index + 1}>
                                    {index + 1}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center font-medium text-amber-400">
                      {currency}
                      {product.offerPrice * product.quantity}
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          removeFromCart(product._id);
                        }}
                        className="p-2 text-red-500 hover:text-red-400 hover:bg-zinc-700 rounded-full transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="flex items-center gap-2 mt-8 text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  <FaArrowLeft className="w-3 h-3" />
                  <span>Continue Shopping</span>
                </button>
              </>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96 bg-zinc-800 p-6 rounded-xl border border-zinc-700 h-fit sticky top-8">
            <h2 className="text-xl font-bold text-amber-500 mb-2">
              Order Summary
            </h2>
            <p className="text-sm text-zinc-400 mb-6">
              Review your order details
            </p>

            {isCartEmpty ? (
              <div className="text-center py-8">
                <p className="text-zinc-300 mb-4">No products in cart</p>
                <button
                  onClick={() => navigate("/")}
                  className="text-amber-500 hover:text-amber-400 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-zinc-400">
                        Delivery Address
                      </p>
                      <button
                        onClick={() => setShowAddress(!showAddress)}
                        className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        {selectedAddress ? "Change" : "Select Address"}
                        <FaChevronDown
                          className={`w-2 h-2 transition-transform ${
                            showAddress ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {showAddress ? (
                      <div className="bg-zinc-750 border border-zinc-700 rounded-lg p-3 space-y-2">
                        {addresses.length > 0 ? (
                          <>
                            {addresses.map((address, index) => (
                              <div
                                key={index}
                                className="p-2 hover:bg-zinc-700 rounded cursor-pointer"
                                onClick={() => {
                                  setSelectedAddress(address);
                                  setShowAddress(false);
                                }}
                              >
                                <p className="text-zinc-200 font-medium">
                                  {address.city}, {address.country}
                                </p>
                                <p className="text-xs text-zinc-400">
                                  {address.street}, {address.zipCode}
                                </p>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                navigate("/shipping-address");
                                setShowAddress(false);
                              }}
                              className="w-full cursor-pointer text-center text-amber-500 hover:text-amber-400 text-sm p-2"
                            >
                              + Add new address
                            </button>
                          </>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-zinc-400 mb-2">
                              No saved addresses
                            </p>
                            <button
                              onClick={() => {
                                navigate("/shipping-address");
                                setShowAddress(false);
                              }}
                              className="text-amber-500 hover:text-amber-400 text-sm"
                            >
                              + Add your first address
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-zinc-300 bg-zinc-750 border border-zinc-700 rounded-lg p-3">
                        {selectedAddress ? (
                          <>
                            <p className="text-zinc-200 font-medium">
                              {selectedAddress.city}, {selectedAddress.country}
                            </p>
                            <p className="text-xs text-zinc-400">
                              {selectedAddress.street},{" "}
                              {selectedAddress.zipCode}
                            </p>
                          </>
                        ) : (
                          <p>No address selected</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Payment Options */}
                  <div className="mt-4 mb-4 md:mt-0 md:mb-0">
                    <p className="text-sm font-medium text-zinc-400 mb-2">
                      Payment Method
                    </p>
                    <select
                      value={paymentOption}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="COD">Cash On Delivery</option>
                      <option value="BKASH">BKASH</option>
                      <option value="NAGAD">NAGAD</option>
                    </select>

                    {/* Render payment components conditionally */}
                    {paymentOption === "BKASH" && (
                      <BkashPayment amount={cartAmount()} currency={currency} />
                    )}

                    {paymentOption === "NAGAD" && (
                      <NagadPayment amount={cartAmount()} currency={currency} />
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-700 space-y-3">
                  <div className="flex justify-between text-zinc-300">
                    <span>Price</span>
                    <span>
                      {currency}
                      {cartAmount()}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Tax (2%)</span>
                    <span>
                      {currency}
                      {(cartAmount() * 2) / 100}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-amber-400 pt-3">
                    <span>Total</span>
                    <span>
                      {currency}
                      {cartAmount() + (cartAmount() * 2) / 100}
                    </span>
                  </div>
                </div>

                <button
                onClick={palceOrder}
                  className={`w-full  cursor-pointer py-3 mt-6 text-zinc-900 font-bold rounded-lg transition-colors ${
                    isCartEmpty
                      ? "bg-zinc-600 cursor-not-allowed"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                  disabled={isCartEmpty}
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
