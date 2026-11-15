
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import EventActionButtons from "@/components/EventActionButtons";
import ConfirmedVolunteers from "@/components/ConfirmedVolunteers";

const EventDetailsPage = async ({ params }) => {
  await connection();
  const { id } = await params;

  let event = null;

  try {
    const res = await fetch(`http://localhost:8000/event/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      event = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch event details:", error);
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-[#123c2c] mb-2">
            Event Not Found
          </h2>

          <Link href="/events" className="text-green-700 underline text-sm">
            ← Back to Upcoming Events
          </Link>
        </div>
      </div>
    );
  }

  // Current logged-in user simulation
  const currentUser = {
    email: "user@gmail.com",
    name: "Dolore expedita dese",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  };

  const isJoined =
    currentUser?.email &&
    event.volunteers?.some(
      (vol) => vol.email === currentUser.email
    );

  const volunteerCount = event.volunteers?.length || 0;

  return (
    <main className="min-h-screen bg-[#f7faf7] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-700 transition mb-6"
        >
          ← Back to Upcoming Events
        </Link>

        {/* Main Card Container */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden pb-10">

          {/* Hero Banner */}
          <div className="relative h-[320px] md:h-[380px] w-full bg-gray-900">

            <Image
              src={
                event.thumbnail ||
                "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9"
              }
              alt={event.title || "Event Image"}
              fill
              unoptimized
              className="object-cover opacity-85"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

            <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-green-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              🏷️ {event.type || "Donation"}
            </span>

            <div className="absolute bottom-6 left-6 right-6 md:left-10 text-white">

              <h1 className="text-2xl md:text-4xl font-extrabold mb-2.5 leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-xs md:text-sm text-gray-200">
                <div className="flex items-center gap-1.5">
                  📍 {event.location}
                </div>

                <div className="flex items-center gap-1.5">
                  📅 {event.date}
                </div>
              </div>

            </div>
          </div>

          <div className="px-6 md:px-10 pt-8">

            {/* Action Bar */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-xl">
                  👥
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">
                    {volunteerCount}{" "}
                    {volunteerCount === 1 ? "Volunteer" : "Volunteers"} Joined
                  </h3>

                  <p className="text-xs text-gray-500">
                    {isJoined
                      ? "You are confirmed for this initiative"
                      : "Sign up to join hands for this drive"}
                  </p>
                </div>

              </div>

              <EventActionButtons
                event={event}
                currentUser={currentUser}
              />

            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">

                {/* About Event */}
                <div>
                  <h2 className="text-lg font-bold text-[#123c2c] mb-3">
                    About this Social Initiative
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>

                {/* Guidelines */}
                <div className="border-t border-gray-100 pt-6">

                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                    VOLUNTEER GUIDELINES
                  </h3>

                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-600">

                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                      <span>
                        Please arrive 15 minutes before the scheduled time at the designated location.
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                      <span>
                        Wear comfortable clothing suitable for physical social work and distribution.
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                      <span>
                        Bring any pre-coordinated relief packages or distribution items if requested.
                      </span>
                    </li>

                  </ul>
                </div>

              </div>

              {/* Right Column */}
              <div className="lg:col-span-1 space-y-6">

                {/* INITIATIVE ORGANIZER */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">

                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                    INITIATIVE ORGANIZER
                  </h3>

                  <div className="flex items-center gap-3 mb-4">

                    <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">

                      <Image
                        src={
                          event.organizerImage ||
                          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
                            event.organizerEmail || "organizer"
                          )}`
                        }
                        alt={event.organizerName || "Organizer"}
                        fill
                        unoptimized
                        className="object-cover"
                      />

                    </div>

                    <div className="min-w-0">

                      <h4 className="font-bold text-gray-800 text-sm truncate">
                        {event.organizerName || "Organizer"}
                      </h4>

                      <p className="text-xs text-gray-500 truncate">
                        ✉️ {event.organizerEmail || "No email available"}
                      </p>

                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
                    🛡️ Verified Platform Member
                  </div>

                </div>

                {/* CONFIRMED VOLUNTEERS */}
                <ConfirmedVolunteers
                  volunteers={event.volunteers || []}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
