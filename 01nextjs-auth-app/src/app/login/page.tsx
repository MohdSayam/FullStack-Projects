/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";
import api from "@/app/axiosConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onlogin = async () => {
    try {
      setLoading(true);
      const response = await api.post("/api/users/login", user);
      console.log("Login success!", response.data);
      toast.success("Login success!");
      router.push("/profile");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Login failed!", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Welcome Back!"}
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Your email address"
            type="text"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Your password"
            type="password"
          />
        </div>
        <button
          onClick={onlogin}
          className={`w-full px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={buttonDisabled}
        >
          {loading ? "Processing..." : "Login"}
        </button>
        <div className="text-center mt-4">
          <Link
            href="/forgotPassword"
            className="text-sm text-blue-600 hover:underline block mb-2"
          >
            Forgot Password?
          </Link>
          <Link
            href="/signup"
            className="text-sm text-gray-500 hover:underline block"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
