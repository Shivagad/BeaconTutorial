import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react"; // Cross icon from lucide-react

export default function OTPModal({
  setToast,
  setEmailVerified,
  passedOTP,
  expiryTime,
  email,
  onClose,
  setPassedOTP, // Callback to update the OTP in the parent component
}) {
  const [otpInput, setOtpInput] = useState(["", "", "", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30); // 30 seconds delay

  // Create refs for each input so we can focus the next one automatically
  const inputRefs = useRef([]);

  // Handle OTP input change and auto-focus next box
  const handleChange = (index, value) => {
    // Only allow a single numeric digit
    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);

    // If a value is entered, focus next input
    if (value && index < otpInput.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP Verification
  const verifyOtp = () => {
    const enteredOtp = otpInput.join("");
    if (enteredOtp === passedOTP) {
      setToast({ success: true });
      setEmailVerified(true);
      onClose(); // Close the modal once verified
    } else {
      setToast({ success: false });
    }
  };

  // Resend OTP Logic: Generate a new OTP, update parent's OTP, and send it to email
  const resendOtp = async () => {
    setResendDisabled(true);
    setCountdown(30);

    try {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await axios.post("http://localhost:4000/server/student/otp-email", {
        email,
        otp: newOtp,
      });
      toast.success("New OTP sent to your email.");

      // Update the passed OTP in the parent component
      if (typeof setPassedOTP === "function") {
        setPassedOTP(newOtp);
      }
    } catch (error) {
      toast.error("Failed to resend OTP, try again.");
    }
  };

  // Countdown Timer for Resend OTP Button
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  return (
    // Overlay
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      {/* Modal Container */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        {/* OTP Input Boxes */}
        <div className="flex justify-center space-x-2 mb-4">
          {otpInput.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        {/* Verify OTP Button */}
        <button
          onClick={verifyOtp}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-3"
        >
          Verify OTP
        </button>
        {/* Resend OTP Button */}
        <button
          onClick={resendOtp}
          disabled={resendDisabled}
          className={`w-full py-2 rounded-md transition-colors ${
            resendDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}
