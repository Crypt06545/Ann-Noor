import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import BkashInstructions from './BkashInstruction';
import NagadInstructions from './NagadInstructions';

const bangladeshDistricts = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "sylhet", label: "Sylhet" },
  { value: "khulna", label: "Khulna" },
  { value: "barishal", label: "Barishal" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "rangpur", label: "Rangpur" },
  { value: "mymensingh", label: "Mymensingh" },
  // Add all 64 districts here
];

const OrderInfo = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const totalAmount = 990.00;

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-500 mb-6">
          Billing Details
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Billing Details */}
          <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700 lg:w-1/2 h-fit">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-amber-400" htmlFor="fullName">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-amber-400" htmlFor="phone">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="01XXXXXXXXX or +8801XXXXXXXXX"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^(?:\+?88)?01[3-9]\d{8}$/,
                    message: "Please enter a valid Bangladeshi phone number"
                  }
                })}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-amber-400" htmlFor="country">
                Country / Region *
              </label>
              <input
                id="country"
                type="text"
                defaultValue="Bangladesh"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-amber-400">
                State / County *
              </label>
              <Controller
                name="state"
                control={control}
                rules={{ required: "Please select your district" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={bangladeshDistricts}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select your district..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: '#3f3f46',
                        borderColor: errors.state ? '#ef4444' : '#52525b',
                        color: '#e4e4e7',
                        '&:hover': {
                          borderColor: errors.state ? '#ef4444' : '#52525b'
                        }
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: '#3f3f46',
                        color: '#e4e4e7'
                      }),
                      option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused ? '#52525b' : '#3f3f46',
                        color: '#e4e4e7'
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: '#e4e4e7'
                      }),
                      input: (base) => ({
                        ...base,
                        color: '#e4e4e7'
                      })
                    }}
                    onChange={(selectedOption) => field.onChange(selectedOption?.value)}
                    value={bangladeshDistricts.find(c => c.value === field.value)}
                  />
                )}
              />
              {errors.state && <p className="mt-1 text-sm text-red-400">{errors.state.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-amber-400" htmlFor="streetAddress">
                Street address *
              </label>
              <input
                id="streetAddress"
                type="text"
                placeholder="House number and street name"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 mb-2"
                {...register("streetAddress", { required: "Street address is required" })}
              />
              {errors.streetAddress && <p className="mt-1 text-sm text-red-400">{errors.streetAddress.message}</p>}
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                {...register("apartment")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-amber-400" htmlFor="orderNotes">
                Order notes (optional)
              </label>
              <textarea
                id="orderNotes"
                rows="4"
                placeholder="Notes about your order, e.g. special notes for delivery."
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                {...register("orderNotes")}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-800 transition-colors"
            >
              Place order
            </button>
          </div>

          {/* Right Column - Order Summary and Payment */}
          <div className="lg:w-1/2 space-y-6">
            {/* Order Summary */}
            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <h2 className="text-xl font-bold mb-4 text-amber-500">Your order</h2>

              <div className="border-b border-zinc-700 pb-4 mb-4">
                <div className="flex justify-between font-medium text-amber-400">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between py-2 text-zinc-300">
                    <span>Vampire Blood Perfume Oil - 12 ML (Oil Version) × 1</span>
                    <span>990.00৳</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-zinc-700 pb-4 mb-4">
                <div className="flex justify-between py-2 text-zinc-300">
                  <span>Subtotal</span>
                  <span>990.00৳</span>
                </div>

                <div className="flex justify-between py-2 text-zinc-300">
                  <span>Shipping</span>
                  <span>ডেলিভারি চার্জ</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6 text-amber-400">
                <span>Total</span>
                <span>990.00৳</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <h3 className="text-lg font-medium mb-3 text-amber-400">Payment method</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="cod"
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-zinc-700 border-zinc-600"
                  />
                  <label htmlFor="cod" className="ml-2 text-zinc-300">
                    <span className="block">Cash on delivery</span>
                    <span className="block text-sm text-zinc-400">
                      Pay with cash upon delivery.
                    </span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="bkash"
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-zinc-700 border-zinc-600"
                  />
                  <label htmlFor="bkash" className="ml-2 text-zinc-300">
                    <span className="block">bKash</span>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="nagad"
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-zinc-700 border-zinc-600"
                  />
                  <label htmlFor="nagad" className="ml-2 text-zinc-300">
                    <span className="block">Nagad</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'bkash' && <BkashInstructions amount={totalAmount} />}
              {paymentMethod === 'nagad' && <NagadInstructions amount={totalAmount} />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderInfo;