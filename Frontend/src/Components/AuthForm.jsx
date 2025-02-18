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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState(null);
  const [passedOTP, setPassedOTP] = useState("");

  // Toast helper for OTP modal
  const setToast = (obj) => {
    if (obj.success) {
      toast.success("Email Verified Successfully");
      setEmailVerified(true);
    } else {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  const isSignup = mode === "student-signup";
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

      if (isSignup) {
        if (!name || !email || !password || !confirmPassword || !phone) {
          throw new Error("All fields are required!");
        }
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match!");
        }
        if (!/^\+91[6-9]\d{9}$/.test(phone)) {
          throw new Error("Enter a valid 10-digit phone number with +91");
        }

        // Generate OTP and set expiry time (2 minutes)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setPassedOTP(otp);
        setOtpSent(true);
        const expiryTime = Date.now() + 2 * 60 * 1000;
        setOtpExpiryTime(expiryTime);

        // Send OTP email
        axios
          .post("http://localhost:4000/server/student/otp-email", {
            email,
            name,
            otp,
          })
          .then(() => {
            toast.success("OTP sent to your email");
          })
          .catch(() => {
            toast.error("Failed to send OTP, try again");
          });

        // Clear OTP data if expired (after 2 minutes)
        setTimeout(() => {
          if (Date.now() >= expiryTime) {
            setGeneratedOtp("");
            setOtpSent(false);
            setOtpExpiryTime(null);
          }
        }, 2 * 60 * 1000);

        // Wait for OTP verification before proceeding to signup.
        return;
      } else if (isStudentLogin || isAdminLogin) {
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

  // Open the OTP modal once the OTP is generated (for signup)
  useEffect(() => {
    if (isSignup && generatedOtp) {
      setOtpModalOpen(true);
    }
  }, [generatedOtp, isSignup]);

  // After OTP verification (emailVerified becomes true), proceed with student signup
  useEffect(() => {
    if (isSignup && emailVerified) {
      axios
        .post("http://localhost:4000/server/student/signup-student", {
          name,
          email,
          password,
          mobile: phone,
        })
        .then((response) => {
          if (response.data.success === false) {
            toast.error(response.data.message);
            setEmailVerified(false)
            dispatch(signInFailure(response.data.message));
          } else {
            dispatch(signInSuccess(response.data.user));
            toast.success(response.data.message);
            setOtpModalOpen(false);
            navigate('/student-dashboard'); 
          }
        })
        .catch((error) => {
          setEmailVerified(false)
          toast.error(error.response?.data?.message || error.message);
          dispatch(signInFailure(error.response?.data?.message || error.message));
        });
    }
  }, [emailVerified, isSignup, name, email, password, phone, dispatch, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        {isSignup && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
          </div>
        )}

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

        {isSignup && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1 relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-12 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91XXXXXXXXXX"
              />
            </div>
          </div>
        )}

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

        {isSignup && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
              {showConfirmPassword ? (
                <EyeOff
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <Eye
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </div>
          </div>
        )}

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
            : isSignup
              ? "Sign Up"
              : isStudentLogin
                ? "Student Login"
                : "Admin Login"}
        </button>
      </form>

      {otpModalOpen && (
        <OTPModal
          setToast={setToast}
          setEmailVerified={setEmailVerified}
          passedOTP={passedOTP}
          expiryTime={otpExpiryTime}
          setPassedOTP={setPassedOTP}
          email={email}
          onClose={() => setOtpModalOpen(false)}
        />
      )}
    </>
  );
}
