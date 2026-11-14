import React from "react";
import Link from "next/link";
import { connection } from "next/server"; 
import Image from "next/image";

const AllEvents = async () => {
  await connection();

  let events = [];
  
  try {
    const res = await fetch("http://localhost:8000/events", {
      cache: "no-store",
    });
    
    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch events from backend:", error);
  }

  return (
    <main className="min-h-screen bg-[#f7faf7] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider">
              🌱 Future Community Drives
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#123c2c]">
              Upcoming Events
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base max-w-2xl">
              Discover verified volunteer initiatives scheduled for upcoming dates. Past events are automatically excluded so you can focus on active drives that need support.
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
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button className="bg-green-800 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm">
              All
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-semibold transition">
              Donation
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-semibold transition">
              Cleanup
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-semibold transition">
              Plantation
            </button>
            <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-semibold transition">
              Winter Relief
            </button>
          </div>

          <div className="w-full lg:w-72">
            <input
              type="text"
              placeholder="Search events or venue..."
              className="w-full px-4 py-2.5 rounded-full border border-gray-200 bg-white outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg font-medium">No upcoming events found.</p>
            <p className="text-gray-400 text-sm mt-1">Make sure your backend server is running and database has events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-52 w-full bg-gray-100">
                    <Image
                      src={event.thumbnail || "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9"}
                      alt={event.title || "Event Thumbnail"}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {event.type}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
                      📅 {event.date}
                    </div>

                    <h2 className="text-xl font-bold text-[#123c2c] mb-2 line-clamp-1">
                      {event.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                      📍 {event.location}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {event.description}
                    </p>

                    <div className="text-xs text-gray-400 truncate border-t border-gray-100 pt-3">
                      Organizer: <span className="text-gray-600 font-medium">{event.organizerEmail}</span>
                    </div>
                  </div>
                </div>

                {/* View Event Button */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/events/${event._id}`}
                    className="block w-full text-center bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-sm text-sm"
                  >
                    View Event →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AllEvents;