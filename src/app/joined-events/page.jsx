import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { API_BASE, DEFAULT_THUMBNAIL } from "@/lib/api";

// ---------- Static shell (prerendered at build time) ----------

export default function JoinedEventsPage() {
  return (
    <main className="min-h-screen bg-[#f7faf7] py-12 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-3">
            🛡️ My Volunteer Commitments
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
            Joined Events
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Here are all the social development and community service drives you
            have signed up for, sorted by event date.
          </p>
        </div>

        {/* Data-dependent content streams in inside its own Suspense boundary.
            This keeps the shell prerenderable under cacheComponents. */}
        <Suspense fallback={<GridSkeleton />}>
          <JoinedEventsGrid />
        </Suspense>
      </div>
    </main>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
        >
          <div className="h-48 bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-200 rounded-xl mt-6" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- Dynamic content (streams in at request time) ----------

async function JoinedEventsGrid() {
  // Reading the session needs request data (cookies), which is only allowed
  // to block inside a Suspense boundary.
  const session = await auth.api.getSession({ headers: await headers() });
  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto mt-10">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
          🔒
        </div>
        <h3 className="font-bold text-gray-800 text-base mb-1">
          Log in to see your events
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          You need to be signed in to view the volunteer drives you have joined.
        </p>
        <Link
          href="/login"
          className="inline-block bg-[#0d9457] hover:bg-[#0b7a48] text-white text-xs font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  let joinedEvents = [];

  try {
    const res = await fetch(
      `${API_BASE}/events/joined?email=${encodeURIComponent(currentUserEmail)}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      joinedEvents = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch joined events:", error);
  }

  if (joinedEvents.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-md mx-auto mt-10">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
          📭
        </div>
        <h3 className="font-bold text-gray-800 text-base mb-1">
          No Joined Events Yet
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          You haven&apos;t signed up for any social drives yet. Explore upcoming
          initiatives and join hands!
        </p>
        <Link
          href="/events"
          className="inline-block bg-[#0d9457] hover:bg-[#0b7a48] text-white text-xs font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm"
        >
          Explore Upcoming Events
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {joinedEvents.map((event) => {
        const userVolunteerInfo = event.volunteers?.find(
          (v) => v.email === currentUserEmail
        );
        // Formatted at request time (inside Suspense), so this is safe.
        const joinedDateFormatted = userVolunteerInfo?.joinedAt
          ? new Date(userVolunteerInfo.joinedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recently";

        return (
          <div
            key={event._id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Banner */}
              <div className="relative h-48 w-full bg-gray-900">
                <Image
                  src={event.thumbnail || DEFAULT_THUMBNAIL}
                  alt={event.title || "Event Image"}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  {event.type || "Donation"}
                </span>

                {/* Date Badge */}
                <div className="absolute bottom-3 left-4 text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  📅 {event.date}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
                  📍 {event.location}
                </p>

                <p className="text-xs text-emerald-700 bg-emerald-50/60 border border-emerald-100/60 p-2.5 rounded-xl font-medium mb-4">
                  You have signed up as a confirmed volunteer for this
                  initiative.
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 pb-5 pt-0">
              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-4 border-t border-gray-100 pt-3">
                <span>Joined {joinedDateFormatted}</span>
              </div>

              <Link
                href={`/events/${event._id}`}
                className="w-full bg-[#0d9457] hover:bg-[#0b7a48] text-white font-semibold py-3 rounded-xl transition duration-300 text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Event</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
