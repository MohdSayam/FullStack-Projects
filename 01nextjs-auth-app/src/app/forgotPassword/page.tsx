"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

// Correct component name to follow PascalCase convention
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState(""); // Simplified state management
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onForgotPassword = async () => {
    try {
      setLoading(true);
      if (email.length === 0) {
        toast.error("Please enter your email.");
        setLoading(false);
        return;
      }

      await axios.post("/api/users/forgotPassword", { email });

      setMessage("Password reset email sent! Please check your inbox.");
      toast.success("Email Sent! Please check your inbox.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Forgot password failed!", error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to send password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Forgot Password"}
        </h1>

        {message ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">{message}</p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Go back to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-4">
              Enter your email to receive a password reset link.
            </p>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                E-mail
              </label>
              <input
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                type="email"
                required
              />
            </div>
            <button
              onClick={onForgotPassword}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out ${
                loading || email.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={loading || email.length === 0}
            >
              {loading ? "Processing..." : "Send Reset Link"}
            </button>
            <Link
              href="/login"
              className="block text-center mt-4 text-blue-600 hover:underline"
            >
              Remembered your password? Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
