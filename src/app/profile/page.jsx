"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
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

  // Handle profile image selection with maximum quality
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.98);
        setPreview(dataUrl);
        setImageData(dataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Update profile (Name, Email & Image)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        name: fullName.trim(),
        email: email.trim(),
      };

      if (imageData) {
        updateData.image = imageData;
      }

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        toast.error(error.message || "Failed to update profile.");
        return;
      }

      // সেশন এবং রাউটার রিফ্রেশ করা যাতে নতুন ডাটা পার্মানেন্টলি সেভ হয়ে থাকে
      if (refetch) {
        await refetch();
      }
      router.refresh();

      toast.success("Profile updated successfully!");
      setImageData("");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f7faf7]">
        <p className="text-green-700 font-semibold animate-pulse text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#f7faf7]">
        <p className="text-gray-500 font-medium text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  const profileImage = preview || user.image;

  return (
    <section className="px-4 md:px-10 py-10 bg-[#f7faf7] min-h-screen flex items-center justify-center">
      <div className="relative max-w-4xl w-full mx-auto bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden p-8 md:p-12">

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
        <div className="mb-8">
          <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
            🛡️ Account Settings
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#123c2c]">
            My Profile
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Manage your personal credentials and profile appearance seamlessly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 items-center">

          {/* Left: Avatar + Change Photo */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md ring-4 ring-green-50 bg-gray-100 flex items-center justify-center">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile photo"
                  fill
                  unoptimized
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <span className="text-5xl font-bold text-green-800">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <label
              htmlFor="profileImage"
              className="mt-6 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-sm transition duration-300 cursor-pointer text-center"
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
                className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
              />
            </div>

            {/* Update Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition duration-300 text-sm disabled:bg-gray-400 cursor-pointer"
              >
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ProfilePage;