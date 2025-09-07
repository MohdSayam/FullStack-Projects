/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async (token: string, id: string) => {
    try {
      const res = await axios.get(
        `/api/users/verifyEmail?token=${token}&id=${id}`
      );
      if (res.status === 200) {
        setVerified(true);
      } else {
        setError(true);
      }
    } catch (err: any) {
      setError(true);
      console.log("Verification error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const idParam = searchParams.get("id");
    if (tokenParam && idParam) {
      setToken(tokenParam);
      setUserId(idParam);
      verifyUserEmail(tokenParam, idParam);
    } else {
      setError(true);
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [verified, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Email Verification
        </h1>

        {loading && (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
            <p className="text-lg font-medium text-gray-600">
              Verifying your email...
            </p>
          </div>
        )}

        {verified && (
          <div>
            <div className="text-green-500 text-6xl mb-4">
              <span className="p-2 inline-block bg-green-100 rounded-full">
                ✓
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-green-600 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-500 mb-4">
              You will be redirected to the login page shortly.
            </p>
            <Link href="/login" className="text-blue-600 hover:underline">
              Go to Login now
            </Link>
          </div>
        )}

        {error && !loading && (
          <div>
            <div className="text-red-500 text-6xl mb-4">
              <span className="p-2 inline-block bg-red-100 rounded-full">
                ✗
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-500 mb-4">
              The link may be invalid or expired.
            </p>
            <Link href="/signup" className="text-blue-600 hover:underline">
              Try Signing Up Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
