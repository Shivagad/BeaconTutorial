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
import ReCAPTCHA from "react-google-recaptcha";

export function AuthForm({ mode }) {
  const navigate = useNavigate();
  const { login } = useAuth()
  const { loadings, error: errorMsg } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  
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
          ? "https://beacon-tutorial.vercel.app/server/student/login-student"
          : "https://beacon-tutorial.vercel.app/server/dashadmin/login-admin";
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
          navigate('/dashboard/mainpage');
        } else if (isStudentLogin) {
          navigate('/'); 
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      dispatch(signInFailure(error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  }

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">

        <div className="mt-1 relative">
        <label className="block text-sm font-medium text-gray-700">Email</label>
          <Mail className="absolute left-3 top-1/2 -translate-y-1/5 text-gray-400 h-5 w-5" />
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

        <div className="flex justify-center">
        <ReCAPTCHA
          sitekey="6LdRWeUqAAAAAAazcvSCXbLru5yhdHPEtWd1HEQH"
          onChange={handleCaptchaChange}
        />
      </div>

     {
       isStudentLogin && (
        <div className="mt-2 px-1">
        <a href="/forgot-password" className="text-sm text-right text-[#4E77BB] hover:underline">
          Forgot Password?
        </a>
      </div>
       )
     }


          <button
        type="submit"
        disabled={loading || !captchaVerified}
        className={clsx(
          "w-full bg-[#4E77BB] text-white py-2 px-4 rounded-lg hover:bg-[#6ea3fa] hover:text-black transition-colors",
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
