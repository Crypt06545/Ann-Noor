import { useForm } from "react-hook-form";
import bkashLogo from '../assets/bkash.png';

const BkashPayment = ({ amount, currency }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // console.log("Bkash payment submitted:", data);
    // Handle payment submission
  };

  return (
    <div className="mt-4 bg-zinc-750 p-4 rounded-lg border border-zinc-700">
      {/* Heading with Logo */}
      <div className="flex items-center gap-2 mb-3">
        <img src={bkashLogo} alt="Bkash Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
        <h3 className="text-lg font-semibold text-amber-400">BKASH Payment</h3>
      </div>

      <div className="mb-4">
        <p className="text-zinc-300">
          Send <span className="text-amber-400 font-bold">{currency}{amount.toFixed(2)}</span> to:
        </p>
        <p className="text-zinc-300">
          Account: <span className="font-bold">01316979159</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-zinc-300 mb-1">Your BKASH Number</label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Invalid BKASH number"
              }
            })}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-zinc-300 mb-1">Transaction ID</label>
          <input
            type="text"
            placeholder="TRX123456"
            className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
            {...register("transactionId", {
              required: "Transaction ID is required",
              minLength: {
                value: 5,
                message: "Transaction ID must be at least 5 characters"
              }
            })}
          />
          {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-zinc-900 font-medium rounded"
        >
          Confirm BKASH Payment
        </button>
      </form>
    </div>
  );
};

export default BkashPayment;
