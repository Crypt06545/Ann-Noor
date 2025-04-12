import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserPlus, Loader } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // gsap animation
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".form-sinup", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.25,
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
      <div className="form-sinup w-full max-w-md p-8 space-y-6 rounded-xl bg-neutral-800 text-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#AB572D]">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              {...register("username", { required: true })}
              className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none"
              disabled={loading}
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
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none"
              disabled={loading}
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
                {...register("password", { required: true })}
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none pr-10"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#AB572D]"
                onClick={togglePasswordVisibility}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                {...register("confirmpassword", { required: true })}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none pr-10"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#AB572D]"
                onClick={toggleConfirmPasswordVisibility}
                disabled={loading}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md bg-[#AB572D] text-white font-semibold transition-colors flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#8c4624]"
            }`}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-5 w-5" />
                Create Account
              </>
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Already have an account?
          <Link to={"/login"} className="text-[#AB572D] hover:underline ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
