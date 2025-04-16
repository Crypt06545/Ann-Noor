import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LogIn, Loader } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading } = useState(false);


  // const [state, setState] = React.useState("login");
  //   const [name, setName] = React.useState("");
  //   const [email, setEmail] = React.useState("");
  //   const [password, setPassword] = React.useState("");



  // gsap animation
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".form-signin", {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.25,
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
      <div className="form-signin w-full max-w-md p-8 space-y-6 rounded-xl bg-neutral-800 text-gray-200">
        <h1 className="text-2xl font-bold text-center text-[#AB572D]">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="Email" className="block text-gray-300">
              Email
            </label>
            <input
              type="text"
              name="Email"
              id="Email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-600 bg-zinc-700 text-gray-200 focus:border-[#AB572D] focus:outline-none"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                    message:
                      "Password must contain at least one uppercase, one lowercase, and one special character",
                  },
                })}
                placeholder="Password"
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
            {errors.password && (
              <p
                style={{
                  color: "red",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.password.message}
              </p>
            )}
            <div className="flex justify-end text-xs">
              <a
                href="#"
                className="text-gray-400 hover:text-[#AB572D] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3 px-4 rounded-md bg-[#AB572D] text-white font-semibold transition-colors flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#8c4624]"
            }`}
          >
            {loading ? (
              <>
                <Loader className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                Sign in
              </>
            )}
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Don't have an account?
          <Link to={"/signup"} className="text-[#AB572D] hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
