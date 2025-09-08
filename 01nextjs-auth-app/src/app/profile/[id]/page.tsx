"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import api from "@/app/axiosConfig";
import { toast } from "react-hot-toast";

export default function UserProfile() {
  const params = useParams();
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!params.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // The API call is now correctly pointed to the `/api/users/me` endpoint.
        const res = await api.get(`/api/users/me`);

        // Data is extracted from the `data` key in the response.
        setUserData({
          username: res.data.data.username,
          email: res.data.data.email,
        });

        toast.success("User data fetched successfully!");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Could not fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hello, {userData.username}!
        </h1>
        <p className="text-gray-600 mb-6">
          <span className="font-semibold">Email:</span> {userData.email}
        </p>
        <hr className="mb-6 border-gray-200" />

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your unique Profile ID
          </h2>
          <span className="p-3 inline-block bg-gray-200 text-gray-800 font-mono rounded-md break-words">
            {params.id}
          </span>
        </div>

        <p className="text-gray-500 italic mt-6">
          The world is full of magical things patiently waiting for our wits to
          grow sharper. - Bertrand Russell
        </p>

        <Link
          href="/profile"
          className="block mt-6 text-blue-600 hover:underline transition duration-200"
        >
          Go back to your profile
        </Link>
      </div>
    </div>
  );
}
