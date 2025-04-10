const NagadInstructions = ({ amount }) => {
  return (
    <div className="mt-6 p-4 bg-zinc-750 rounded-lg border border-amber-500/30">
      <h3 className="text-lg font-medium mb-3 text-amber-400">
        Nagad Payment Instructions
      </h3>
      <ol className="list-decimal list-inside space-y-2 text-zinc-300">
        <li>Go to your Nagad app or Dial *167#</li>
        <li>Choose "Send Money"</li>
        <li>Enter below Nagad Account Number</li>
        <li>
          Enter total amount: <span className="font-bold">{amount}৳</span>
        </li>
        <li>Now enter your Nagad Account PIN to confirm the transaction</li>
        <li>
          Copy Transaction ID from payment confirmation message and paste that
          Transaction ID below
        </li>
      </ol>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-amber-400">You need to send us:</span>
          <span className="font-bold">{amount}৳</span>
        </div>
        <div className="flex justify-between">
          <span className="text-amber-400">Account Type:</span>
          <span>Personal</span>
        </div>
        <div className="flex justify-between">
          <span className="text-amber-400">Account Number:</span>
          <span className="font-mono">01316979159</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2 text-amber-400">
          Your Nagad Account Number
        </label>
        <input
          type="text"
          placeholder="01XXXXXXXXX"
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-medium mb-2 text-amber-400">
          Your Nagad Transaction ID
        </label>
        <input
          type="text"
          placeholder="2M7A5"
          className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
    </div>
  );
};

export default NagadInstructions;
