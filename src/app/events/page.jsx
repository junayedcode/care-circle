"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { API_BASE } from "@/lib/api";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [today, setToday] = useState(null); // set inside useEffect (deferred)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // `cache: "no-store"` bypasses the browser's HTTP cache so events
        // created moments ago show up immediately (and on every visit).
        // Note: `export const dynamic = "force-dynamic"` cannot be used here —
        // this is a client component, and it is incompatible with the
        // `cacheComponents` option enabled in next.config.mjs.
        const res = await fetch(`${API_BASE}/events`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events from backend:", error);
      } finally {
        // Deferred `new Date()` read — cacheComponents forbids unstable time
        // values during prerender, so `today` is only set after data loads.
        const now = new Date();
        setToday(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  const matchesFilters = (event) => {
   
    const matchesCategory =
      selectedCategory === "All" ||
      event.type?.toLowerCase() === selectedCategory.toLowerCase();

    
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      term === "" ||
      event.title?.toLowerCase().includes(term) ||
      event.location?.toLowerCase().includes(term) ||
      event.description?.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  };


  const isValidDate = (event) => {
    if (!event.date) return false;
    return !Number.isNaN(new Date(event.date).getTime());
  };

  const upcomingEvents = events
    .filter((event) => isValidDate(event) && new Date(event.date) >= today)
    .filter(matchesFilters)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first

  const pastEvents = events
    .filter((event) => isValidDate(event) && new Date(event.date) < today)
    .filter(matchesFilters)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first

  const categories = ["All", "Donation", "Cleanup", "Plantation", "Winter Relief", "FoodDistribution", "Health Camp"];

  return (
    <main className="min-h-screen bg-[#f7faf7] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              🌱 Community Initiatives
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#123c2c]">
              All Initiatives
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base max-w-2xl">
              Browse every community drive in one place. Active and upcoming
              initiatives appear at the top so you can join right away, while
              past initiatives are archived at the bottom.
            </p>
          </div>

          {/* Create Event Button */}
          <Link
            href="/create-event"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 text-center text-sm w-fit"
          >
            + Create Event
          </Link>
        </div>

        {/* Filter Categories & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Dynamic Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none ">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer shadow-sm ${
                  selectedCategory === cat
                    ? "bg-green-800 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full lg:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events or venue..."
              className="w-full px-4 py-2.5 rounded-full border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Loading State (also until `today` is computed post-hydration) */}
        {loading || !today ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-green-700 font-semibold text-lg animate-pulse">Loading initiatives...</p>
          </div>
        ) : upcomingEvents.length === 0 && pastEvents.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg font-medium">No matching events found.</p>
            <p className="text-gray-400 text-sm mt-1">Try searching with a different keyword or category.</p>
          </div>
        ) : (
          <>
            {/* TOP: Active / Upcoming Initiatives */}
            <section id="upcoming-initiatives" className="mb-14">
              <SectionHeading
                accent="bg-green-50 text-green-700"
                title="Upcoming Initiatives"
                subtitle="Happening today or scheduled for the coming days — join before they fill up."
                count={upcomingEvents.length}
              />
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-base font-medium">No upcoming initiatives match your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event._id} event={event} status="upcoming" />
                  ))}
                </div>
              )}
            </section>

            {/* BOTTOM: Past / Completed Initiatives */}
            {pastEvents.length > 0 && (
              <section id="past-initiatives">
                <SectionHeading
                  accent="bg-amber-50 text-amber-700"
                  title="Past Initiatives"
                  subtitle="Completed community drives — browse the archive of what we have achieved together."
                  count={pastEvents.length}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event._id} event={event} status="past" />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

function SectionHeading({ accent, title, subtitle, count }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6">
      <div>
        <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider ${accent}`}>
          CareCircle
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#123c2c]">
          {title} <span className="text-gray-400 text-base font-semibold">({count})</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1 max-w-2xl">{subtitle}</p>
      </div>
    </div>
  );
}

export default AllEvents;
