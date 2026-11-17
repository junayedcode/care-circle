"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify/unstyled";
import { API_BASE } from "@/lib/api";

const CreateEventContent = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [minDate, setMinDate] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Donation",
    date: "",
    location: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);

  
  const handleDateFocus = () => {
    if (minDate) return;
    const today = new Date().toLocaleDateString("en-CA");
    setMinDate(today);
    setFormData((prev) => ({ ...prev, date: prev.date || today }));
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-green-700 font-semibold animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The backend requires a verified session — never publish anonymously.
    if (!session?.user?.email) {
      toast.error("Please log in to create an event.");
      return;
    }

    setLoading(true);

    try {
      const eventPayload = {
        ...formData,
        organizerEmail: session.user.email,
        organizerName: session.user.name || "Organizer",
        organizerImage: session.user.image || "",
      };

      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send the Better Auth session cookie
        body: JSON.stringify(eventPayload),
      });

      if (res.ok) {
        toast.success("Event created successfully!");
        router.push("/events");
        router.refresh();
      } else {
        let message = "Failed to create event. Please try again.";
        try {
          const data = await res.json();
          if (data?.message || data?.error) message = data.message || data.error;
        } catch {
          /* non-JSON error body */
        }
        toast.error(message);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "FoodDistribution",
    "Health Camp",
  ];

  return (
    <section className="px-4 md:px-10 py-10 bg-[#f7faf7] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
            🌱 Community Initiative
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#123c2c]">
            Create Volunteer Event
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the details below to launch a new community drive and invite volunteers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Winter Clothing Distribution Drive"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
            />
          </div>

          {/* Category & Date Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Category / Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Event Date
              </label>
              <input
                type="date"
                name="date"
                min={minDate}
                value={formData.date}
                onFocus={handleDateFocus}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Location / Venue
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Central Park, Dhaka"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
            />
          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Thumbnail Image URL
            </label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium"
            />
            <p className="text-[11px] text-gray-400 mt-1">Leave empty to use a default community photo.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the initiative, schedule, and what volunteers should bring..."
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800 font-medium resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition duration-300 text-sm disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Creating Event..." : "Publish Event"}
          </button>

        </form>
      </div>
    </section>
  );
};


export default function CreateEventPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-green-700 font-semibold">Loading...</div>}>
      <CreateEventContent />
    </Suspense>
  );
}