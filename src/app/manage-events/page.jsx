"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import EventImage from "@/components/EventImage";
import LocalizedEventText from "@/components/LocalizedEventText";
import DeleteEventButton from "@/components/DeleteEventModal";
import EditEventButton from "@/components/EditEventButton";
import { authClient } from "@/lib/auth-client";
import { API_BASE } from "@/lib/api";

const ManageMyEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const organizerEmail = session?.user?.email;

  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/events/organizer?email=${encodeURIComponent(organizerEmail)}`,
        { cache: "no-store" } // reflect create/edit/delete immediately
      );
      if (res.ok) {
        const data = await res.json();
        setMyEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending || !organizerEmail) return;
    // Data fetch on session resolve — setState calls here run after await,
    // not synchronously in the effect body.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, organizerEmail]);

  
  const handleUpdateSuccess = (updatedId, updatedData) => {
    setMyEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev._id === updatedId ? { ...ev, ...updatedData } : ev
      )
    );
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center">
        <p className="text-green-700 font-semibold animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!organizerEmail) {
    return (
      <div className="min-h-screen bg-[#f7faf7] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm font-medium">
          Please log in to manage your events.
        </p>
        <Link
          href="/login"
          className="bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-sm transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading your events...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf7] py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3">
              🛡️ Organizer Dashboard
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
              Manage My Events
            </h1>
            <p className="text-gray-500 text-xs md:text-sm max-w-xl">
              View, edit, and manage the social drives you have published. Only you have permission to edit or delete your created initiatives.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center gap-2 bg-[#0d9457] hover:bg-[#0b7a48] text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm text-xs md:text-sm shrink-0"
          >
            <span>+</span> Create New Event
          </Link>
        </div>

        {/* Events Grid */}
        {myEvents && myEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <div 
                key={event._id} 
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-48 w-full bg-gray-900">
                    <EventImage
                      src={event.thumbnail}
                      event={event}
                      alt={event.title || "Event Image"}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 right-4 sm:right-auto max-w-[calc(100%-2rem)] truncate bg-white/95 backdrop-blur-md text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      <LocalizedEventText
                        value={event.type || "Community Drive"}
                        bnValue={event.typeBn}
                        field="type"
                      />
                    </span>

                    {/* Date Badge */}
                    <div className="absolute bottom-3 left-4 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      📅 <LocalizedEventText value={event.date} field="date" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                      <LocalizedEventText
                        value={event.title}
                        bnValue={event.titleBn}
                        field="title"
                      />
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-3 min-w-0">
                      📍{" "}
                      <span className="truncate">
                        <LocalizedEventText
                          value={event.location}
                          bnValue={event.locationBn}
                          field="location"
                        />
                      </span>
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                      <LocalizedEventText
                        value={event.description}
                        bnValue={event.descriptionBn}
                        field="description"
                      />
                    </p>
                  </div>
                </div>

                {/* Card Footer & Action Buttons */}
                <div className="px-5 pb-5 pt-0">
                  <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs mb-3">
                    <span className="text-gray-400 truncate">👤 {event.organizerName || "Organizer"}</span>
                  </div>

                  {/* View, Edit, Delete Buttons Grid */}
                  <div className="grid grid-cols-3 gap-2 min-w-0">
                    <Link
                      href={`/events/${event._id}`}
                      className="bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl transition text-center text-xs border border-gray-200 flex items-center justify-center"
                    >
                      View
                    </Link>

                    {/* Edit Component with live update callback */}
                    <EditEventButton 
                      eventId={event._id} 
                      onUpdateSuccess={handleUpdateSuccess} 
                    />

                    {/* Delete Component */}
                    <DeleteEventButton 
                      eventId={event._id} 
                      onDeleteSuccess={(id) => {
                        setMyEvents((prev) => prev.filter((ev) => ev._id !== id));
                      }} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto mt-10">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              📂
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">No Events Found</h3>
            <p className="text-xs text-gray-500 mb-6">
              You haven&apos;t created any social initiatives yet. Publish a new drive to start managing!
            </p>
            <Link
              href="/create-event"
              className="inline-block bg-[#0d9457] hover:bg-[#0b7a48] text-white text-xs font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm"
            >
              Create New Event
            </Link>
          </div>
        )}

      </div>
    </main>
  );
};

export default ManageMyEventsPage;