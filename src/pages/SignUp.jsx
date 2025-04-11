import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-neutral-800 text-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#AB572D]">
          Sign Up
        </h1>
        <form noValidate="" action="" className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#AB572D]"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md bg-[#AB572D] text-white font-semibold hover:bg-[#8c4624] transition-colors"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="#" className="text-[#AB572D] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
