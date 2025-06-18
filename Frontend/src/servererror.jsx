import React from "react";

export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-2">Server Error</h2>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong on our end. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
