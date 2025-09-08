/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import api from "@/app/axiosConfig";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const idParam = searchParams.get("id");

    if (tokenParam && idParam) {
      setToken(tokenParam);
      setUserId(idParam);
    } else {
      toast.error("Invalid or missing reset token.");
      router.push("/login");
    }
  }, [searchParams, router]);

  const onResetPassword = async () => {
    try {
      setLoading(true);

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      await api.post("/api/users/resetPassword", { password, token, userId });

      setMessage("Password has been reset successfully!");
      toast.success("Password Reset Successful!");

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      console.log("Reset password failed!", error.message);
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading ||
    password.length === 0 ||
    confirmPassword.length === 0 ||
    !token ||
    !userId;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Reset Password"}
        </h1>

        {message ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-4">{message}</p>
            <p className="text-gray-600 mb-2">
              You will be redirected to the login page shortly.
            </p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Go back to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600 mb-4">
              Set your new password below.
            </p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="new-password"
              >
                New Password
              </label>
              <input
                id="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a new password"
                type="password"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                type="password"
                required
              />
            </div>
            <button
              onClick={onResetPassword}
              className={`w-full px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isButtonDisabled}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
