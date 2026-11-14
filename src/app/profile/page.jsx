
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { authClient } from "../../lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(false);

  // Load logged-in user information
  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
        setImageData(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const updateData = {
        name: fullName.trim(),
      };

      if (imageData) {
        updateData.image = imageData;
      }

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        alert(error.message || "Failed to update profile.");
        return;
      }

      alert("Profile updated successfully!");

      setImageData("");

    } catch (error) {
      console.error("Profile update error:", error);
      alert("Something went wrong. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <p className="p-5 text-center text-gray-500">
        Loading profile...
      </p>
    );
  }

  if (!user) {
    return (
      <p className="p-5 text-center text-gray-500">
        Please log in to view your profile.
      </p>
    );
  }

  const profileImage = preview || user.image;

  return (
    <section className="px-4 md:px-10 pt-5 pb-10">
      <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8 md:p-10">

        {/* Decorative Leaves */}
        <div className="pointer-events-none absolute top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 120"
            fill="none"
            className="w-44 h-28 opacity-80"
          >
            <path
              d="M195 5C150 10 115 30 105 60c25 5 60-10 75-35"
              fill="#a7d7a0"
            />
            <path
              d="M200 45c-40 0-70 20-78 48 28 3 60-18 68-38"
              fill="#4caf50"
              fillOpacity="0.85"
            />
            <path
              d="M140 10c-25 15-40 35-42 58 22-3 40-28 42-58Z"
              fill="#c9e8c4"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          My Profile
        </h1>

        <p className="text-gray-500 text-sm md:text-base mt-1">
          Manage your profile information
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start mt-8">

          {/* Left: Avatar + Change Photo */}
          <div className="flex flex-col items-center">

            <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-[#edf5e7] flex items-center justify-center bg-gray-200">

              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile photo"
                  width={320}
                  height={320}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-gray-500">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}

            </div>

            <label
              htmlFor="profileImage"
              className="btn bg-green-800 hover:bg-green-900 text-white border-none rounded-full px-6 h-11 min-h-11 mt-5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Change Photo
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

          </div>

          {/* Right: Form */}
          <form onSubmit={handleUpdate} className="space-y-5">

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full input input-bordered border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-800 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full input input-bordered border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-green-800 hover:bg-green-900 text-white border-none rounded-lg h-12 min-h-12 shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
