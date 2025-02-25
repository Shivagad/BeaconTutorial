import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";
import OTPModal from "./Modals/OTPModal";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export function AuthForm({ mode }) {
  const navigate = useNavigate();
  const { login } = useAuth()
  const { loadings, error: errorMsg } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Toast helper for OTP modal
  const setToast = (obj) => {
    if (obj.success) {
      toast.success("Email Verified Successfully");
      setEmailVerified(true);
    } else {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  const isStudentLogin = mode === "student-login";
  const isAdminLogin = mode === "admin-login";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      let apiEndpoint = "";
      let requestData = {};

     if (isStudentLogin || isAdminLogin) {
        if (!email || !password) {
          throw new Error("Email and password are required!");
        }
        apiEndpoint = isStudentLogin
          ? "http://localhost:4000/server/student/login-student"
          : "http://localhost:4000/server/dashadmin/login-admin";
        requestData = { email, password };
      }

      dispatch(signInStart());
      const response = await axios.post(apiEndpoint, requestData);

      if (response.data.success === false) {
        toast.error(response.data.message);
        dispatch(signInFailure(response.data.message));
      } else {
        login(response.data.user)
        dispatch(signInSuccess(response.data.user));
        toast.success(response.data.message);
        if (isAdminLogin) {
          navigate('/dashboard');
        } else if (isStudentLogin) {
          navigate('/'); // Adjust route as needed
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      dispatch(signInFailure(error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">

        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {showPassword ? (
              <EyeOff
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {loading
            ? "Please wait..."
              : isStudentLogin
                ? "Student Login"
                : "Admin Login"}
        </button>
      </form>
    </>
  );
}
