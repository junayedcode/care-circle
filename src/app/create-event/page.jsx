"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const today = new Date().toLocaleDateString("en-CA");

  const { data: session } = authClient.useSession();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const selectedDate = formData.get("date");

   
    if (selectedDate < today) {
      toast.error("Please select today or a future date!");
      return;
    }

    setLoading(true);

    const eventData = {
      title: formData.get("title"),
      type: formData.get("type"),
      date: selectedDate,
      location: formData.get("location"),
      thumbnail: formData.get("thumbnail"),
      description: formData.get("description"),
      organizerEmail: session?.user?.email || "",
    };

    try {
      const res = await fetch('http://localhost:8000/create-event',{
      method:"POST",
      headers:{
            "Content-Type":"application/json",
      },
      body:JSON.stringify(eventData)
    })
    const data = await res.json()
    console.log(data);
      console.log("Event Data:", eventData);

     
      toast.success("Community Event created successfully!");
      router.push("/events");
    } catch (error) {
      toast.error("Failed to create event. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7faf7] py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Back Link */}
        <Link
          href="/events"
          className="text-sm font-semibold text-gray-500 hover:text-green-700 flex items-center gap-1 mb-6 transition"
        >
          ← Back to Upcoming Events
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          {/* Header Tag */}
          <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            🌱 Social Service Drive
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#123c2c]">
            Create a Community Event
          </h1>
          <p className="text-gray-500 mt-1 mb-8 text-sm md:text-base">
            Organize a local relief effort, environment cleanup, or community support drive.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Winter Clothes Distribution – Mirpur-10, Dhaka"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800 text-sm"
              />
            </div>

            {/* Event Type & Event Date (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800 text-sm bg-white cursor-pointer"
                >
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup Drive</option>
                  <option value="MedicalCamp">Medical Camp</option>
                  <option value="FoodDistribution">Food Distribution</option>
                  <option value="TreePlantation">Tree Plantation</option>
                </select>
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  min={today}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800 text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Dates must be in the future (today or later).
                </p>
              </div>
            </div>

            {/* Location / Venue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location / Venue *
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800 text-sm"
              />
            </div>

            {/* Thumbnail Image URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Thumbnail Image URL *
              </label>
              <input
                type="url"
                name="thumbnail"
                placeholder="https://images.unsplash.com/photo-..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800 text-sm"
              />
              {/* Quick presets helper */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 flex-wrap">
                <span className="font-medium">Quick photo presets:</span>
                <span className="text-green-700 hover:underline cursor-pointer">Winter Clothes</span>
                <span>•</span>
                <span className="text-green-700 hover:underline cursor-pointer">Blanket Relief</span>
                <span>•</span>
                <span className="text-green-700 hover:underline cursor-pointer">Cleanup</span>
                <span>•</span>
                <span className="text-green-700 hover:underline cursor-pointer">Tree Plantation</span>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800 text-sm resize-none"
              ></textarea>
            </div>

            {/* Organizer Email (Read-only from session) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organizer Email attached:
              </label>
              <input
                type="email"
                value={session?.user?.email || "loading..."}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm select-none cursor-not-allowed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-500 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-green-700/20 cursor-pointer text-base mt-4"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateEvent;