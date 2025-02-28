import React from "react";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Card for Forgot Password Form */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Forgot Password</h2>

        {/* User ID Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date of Birth Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Captcha Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Enter Captcha</label>
          <div className="flex">
            {/* Captcha Input */}
            <input
              type="text"
              placeholder="Enter Captcha"
              className="w-1/2 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Captcha Display */}
            <div className="w-1/2 flex items-center justify-center border border-gray-300 border-l-0 rounded-r bg-gray-100 text-gray-700">
              127fa
            </div>
          </div>
        </div>

        {/* Generate OTP Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">
          Generate OTP
        </button>
      </div>

      {/* Instructions Section */}
      <div className="max-w-4xl mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Instructions for Forgot Password</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>
            Enter User ID and Date of Birth then click on the Generate OTP button. 
            It will send the generated OTP to your registered mobile number and email ID.
          </li>
          <li>
            Go to the Login page. Enter your User ID and the generated OTP as the login credentials.
          </li>
          <li>
            Once logged in, you will be prompted for the OTP and then to set a new Password 
            and Confirm Password.
          </li>
          <li>
            <span className="font-semibold">Note:</span> Kindly allow pop-ups from your browser settings for this functionality. 
            If blocked, please follow the steps below:
            <ul className="list-disc list-inside ml-5 mt-1">
              <li>Click the Chrome menu in the browser toolbar</li>
              <li>Go to Settings → Advanced Settings → Privacy → "Show pop-ups" section, select "Always allow pop-up"</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default ForgotPassword;
