import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa"; // Added FaGoogle
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Loader } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import axiosInstance from "../lib/axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loading, setLoading, setUser } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // console.log(googleClientId);

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

  // handle Google success
  const handleGoogleSuccess = async (credentialResponse) => {
    // console.log(credentialResponse);
    try {
      const token = credentialResponse.credential;
      const { data } = await axiosInstance.post("/users/auth/google-auth", {
        token,
      });
      if (data.success) {
        setUser(data?.data);
        toast.success("Google login successful");
        navigate("/");
      }
    } catch (error) {
      toast.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // handle Google failure
  const handleGoogleFailure = () => {
    toast.error("Google login failed");
  };

  // handle signinSubmit
  const onSubmit = async (formdata) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/users/login", {
        email: formdata.email,
        password: formdata.password,
      });

      if (data.success) {
        setUser(data?.data);
        toast.success(data?.message);
        reset();
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      setUser(false);
      toast.error(error?.response?.data?.message || "Login failed!!");
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
        <div className="form-signin w-full max-w-md p-8 space-y-6 rounded-xl bg-neutral-800 text-gray-200">
          <h1 className="text-2xl font-bold text-center text-[#AB572D]">
            Login
          </h1>
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

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-3 text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Google Sign In Button */}

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            render={({ onClick, disabled }) => (
              <button
                onClick={onClick}
                disabled={disabled || loading}
                className={`w-full py-3 px-4 rounded-md bg-white text-gray-800 font-semibold transition-colors flex items-center justify-center ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin text-gray-800" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
                    Continue with Google
                  </>
                )}
              </button>
            )}
          />
          <p className="text-sm text-center text-gray-400">
            Don't have an account?
            <Link
              to={"/signup"}
              className="text-[#AB572D] hover:underline ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
