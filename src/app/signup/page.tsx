"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [loading, setLoading] = React.useState(false);

  const onsignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      toast.success("signup successful");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Create an Account"}
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-3 py-2 text-black border border-gray-300 placeholder:text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Your username"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            className="w-full px-3 py-2 border text-black border-gray-300 placeholder:text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Create a password"
            type="password"
          />
        </div>
        <button
          onClick={onsignup}
          className={`w-full px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={buttonDisabled}
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>
        <Link
          href="/login"
          className="block text-center mt-4 text-blue-600 hover:underline"
        >
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
