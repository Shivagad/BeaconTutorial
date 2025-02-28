import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function ForgotPassword() {
    // Form data state
    const [formData, setFormData] = useState({
        email: "",
        dob: "",
    });
    // OTP & verification state
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [gotp, setgOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [otpAttempt, setOtpAttempt] = useState(0);
    const [otpTimer, setOtpTimer] = useState(10); // seconds countdown
    const [otpExpired, setOtpExpired] = useState(false);
    // New password state
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Update countdown timer once OTP is sent and not yet verified.
    useEffect(() => {
        let interval;
        if (otpSent && !otpVerified) {
            interval = setInterval(() => {
                setOtpTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setOtpExpired(true);
                        toast.error("OTP expired. Please try again.");
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpSent, otpVerified]);

    // Handle input changes for email and dob
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Generate OTP API call and disable email/dob inputs
    const handleCheckEmailAndGenerateOTP = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/server/student/check/email",
                formData
            );
            if (response.data.success) {
                toast.success("Student is successfuly Authenticated");
                try {
                    const gotp = Math.floor(100000 + Math.random() * 900000).toString()
                    const res = await axios.post(
                        "http://localhost:4000/server/student/otp-email", {
                        name: response.data.name,
                        email: formData.email,
                        otp: gotp
                    }
                    );

                    if (res.data.success) {
                        toast.success("OTP sent successfuly..!")
                        setOtpSent(true);
                        setgOtp(gotp);
                        setOtpTimer(120);
                    }
                } catch (error) {
                    toast.error(response.data.message || "Something went wrong!");
                }
                // setOtpSent(true);
                // setOtpTimer(120);
            } else {
                toast.error(response.data.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Validate OTP input against a dummy value (simulate backend check)
    const handleValidateOTP = () => {
        if (otpExpired) {
            toast.error("OTP has expired. Please try again.");
            window.location.href = "/";
            return;
        }
        // For demonstration, assume correct OTP is "123456"
        if (otp === gotp) {
            toast.success("OTP verified successfully.");
            setOtpVerified(true);
        } else {
            const attempts = otpAttempt + 1;
            setOtpAttempt(attempts);
            if (attempts >= 3) {
                toast.error("Too many incorrect attempts. Redirecting to home...");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                toast.error(`Incorrect OTP. You have ${3 - attempts} attempts left.`);
            }
        }
    };

    // Reset password handler – verify new and confirm passwords match
    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:4000/server/student/reset-password",
                { email: formData.email, password: newPassword }
            );
            if (response.data.success) {
                toast.success("Password reset successfully.");
                window.location.href = "/";
            } else {
                toast.error(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <Toaster position="top-right" />

            {/* Card for Forgot Password Form */}
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Forgot Password</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        disabled={otpSent}
                        className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${otpSent ? "bg-gray-100" : ""
                            }`}
                    />
                </div>

                {/* Date of Birth Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                        required
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        disabled={otpSent}
                        className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${otpSent ? "bg-gray-100" : ""
                            }`}
                    />
                </div>

                {/* If OTP not sent, show Generate OTP button */}
                {!otpSent && (
                    <button
                        onClick={handleCheckEmailAndGenerateOTP}
                        className="bg-[#4E77BB] hover:bg-[#73a6fa] hover:text-black text-white font-semibold py-2 px-4 rounded w-full"
                    >
                        Generate OTP
                    </button>
                )}

                {/* If OTP is sent but not yet verified, show OTP input and Validate OTP button */}
                {otpSent && !otpVerified && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-2 flex items-center justify-between">
                            <button
                                onClick={handleValidateOTP}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                            >
                                Validate OTP
                            </button>
                            <span className="text-sm text-gray-600">
                                {`Time left: ${Math.floor(otpTimer / 60)
                                    .toString()
                                    .padStart(2, "0")}:${(otpTimer % 60).toString().padStart(2, "0")}`}
                            </span>
                        </div>
                    </div>
                )}

                {/* If OTP is verified, show New Password and Confirm Password fields and Reset Password button */}
                {otpVerified && (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                required
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                required
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleResetPassword}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>
            <div className="max-w-4xl mt-8 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Instructions for Forgot Password</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>
                        Enter Email and Date of Birth then click on the Generate OTP button.
                        The OTP is only valid for 2 minutes.
                    </li>
                    <li>
                        If OTP was sent successfully, enter the OTP in the OTP field and click on the Validate OTP button.
                    </li>
                    <li>
                        If OTP is valid, you can reset your password by entering a new password and confirming it.
                    </li>
                    <li>
                        Finally, click on the Reset Password button to save your new password.
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default ForgotPassword;