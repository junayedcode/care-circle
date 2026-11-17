"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify/unstyled";
import { API_BASE } from "@/lib/api";

const EventActionButtons = ({ event, currentUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isCreator = currentUser?.email && event.organizerEmail === currentUser.email;
  const isJoined = currentUser?.email && event.volunteers?.some((vol) => vol.email === currentUser.email);

 
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Event link copied to clipboard!");
  };

  
  const handleJoin = async () => {
    if (!currentUser?.email) {
      toast.error("Please login first to join this event!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/event/${event._id}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send the Better Auth session cookie
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name || "Volunteer",
          image: currentUser.image || "",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Successfully joined the event!");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to join");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Leave Event হ্যান্ডলার
  const handleLeave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/event/${event._id}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send the Better Auth session cookie
        body: JSON.stringify({
          email: currentUser.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.info("You have left the event.");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to leave event");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition shadow-sm"
        title="Share Event"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>

      {/* Organizer / Joined / Unjoined Buttons */}
      {isCreator ? (
        <div className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold px-4 py-3 rounded-xl">
          ⚠️ You are the organizer
        </div>
      ) : isJoined ? (
        <button
          onClick={handleLeave}
          disabled={loading}
          className="bg-emerald-600 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm text-sm flex items-center gap-2 disabled:opacity-50"
        >
          <span>✓</span>
          <span>{loading ? "Processing..." : "Joined (Click to Leave)"}</span>
        </button>
      ) : (
        <button
          onClick={handleJoin}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm text-sm disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Event"}
        </button>
      )}
    </div>
  );
};

export default EventActionButtons;