/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "@/app/axiosConfig";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await api.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
      return;
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await api.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      toast.success("User details fetched!");
      // Add this line to redirect
      router.push(`/profile/${res.data.data._id}`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user details"
      );
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 overflow-hidden flex items-center justify-center">
            {/* Placeholder for a profile picture */}
            <span className="text-sm text-gray-500">Photo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {data === "nothing" ? "User Profile" : data.slice(0, 8) + "..."}
          </h1>
          <p className="text-gray-500 mt-2">
            This is a bio for your social media profile. You can add a short
            description about yourself here.
          </p>
          <div className="flex gap-4 mt-4 text-sm font-semibold text-gray-600">
            <span>
              <span className="font-bold text-gray-800">120</span> Posts
            </span>
            <span>
              <span className="font-bold text-gray-800">2.5K</span> Followers
            </span>
            <span>
              <span className="font-bold text-gray-800">500</span> Following
            </span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button
            onClick={getUserDetails}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Get User Details
          </button>
          <button
            onClick={logout}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>

        <hr className="mb-6 border-gray-200" />

        {/* Photo Grid Section */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Recent Posts
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {/* Fake Posts - Add more div blocks for more posts */}
          <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center">
            <span className="text-gray-400">Post 1</span>
          </div>
          <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center">
            <span className="text-gray-400">Post 2</span>
          </div>
          <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center">
            <span className="text-gray-400">Post 3</span>
          </div>
          <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center">
            <span className="text-gray-400">Post 4</span>
          </div>
          <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center">
            <span className="text-gray-400">Post 5</span>
          </div>
          <div className="bg-gray-200 aspect-square rounded-md flex items-center justify-center">
            <span className="text-gray-400">Post 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}
