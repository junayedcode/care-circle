import React, { Suspense } from "react";
import Link from "next/link";
import EventImage from "@/components/EventImage";
import LocalizedEventText from "@/components/LocalizedEventText";
import { getServerSession } from "@/lib/server-session";
import EventActionButtons from "@/components/EventActionButtons";
import ConfirmedVolunteers from "@/components/ConfirmedVolunteers";
import { API_BASE } from "@/lib/api";
import { isEventExpired } from "@/lib/event-date";

// ---------- Static shell (prerendered at build time) ----------

export default function EventDetailsPage({ params }) {
  return (
    <main className="min-h-screen bg-[#f7faf7] py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button — part of the static shell */}
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-700 transition mb-6"
        >
          ← Back to Upcoming Events
        </Link>

        {/* Data-dependent content streams in inside its own Suspense boundary */}
        <Suspense fallback={<DetailsSkeleton />}>
          <EventDetails paramsPromise={params} />
        </Suspense>
      </div>
    </main>
  );
}

function DetailsSkeleton() {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden pb-10 animate-pulse">
      <div className="h-[320px] md:h-[380px] w-full bg-gray-200" />
      <div className="px-6 md:px-10 pt-8 space-y-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-56 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-11 w-32 bg-gray-200 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-5 w-64 bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// ---------- Dynamic content (streams in at request time) ----------

async function EventDetails({ paramsPromise }) {
  const { id } = await paramsPromise;

  let event = null;

  try {
    const res = await fetch(`${API_BASE}/event/${id}`, {
      cache: "no-store",
    });

    if (res.ok) {
      event = await res.json();
    }
  } catch (error) {
    // During build prerendering the runtime aborts pending fetches once the
    // static shell completes — that rejection is expected and harmless.
    if (!String(error?.message || "").includes("prerender")) {
      console.error("Failed to fetch event details:", error);
    }
  }

  if (!event) {
    return (
      <div className="text-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-[#123c2c] mb-2">Event Not Found</h2>
        <Link href="/events" className="text-green-700 underline text-sm">
          ← Back to Upcoming Events
        </Link>
      </div>
    );
  }

  // Reading the session needs request data (cookies), which is only allowed
  // to block inside a Suspense boundary. A failed lookup degrades to the
  // signed-out view instead of crashing the page.
  const session = await getServerSession();
  const currentUser = session?.user ?? null;

  const isJoined =
    currentUser?.email &&
    event.volunteers?.some((vol) => vol.email === currentUser.email);

  const volunteerCount = event.volunteers?.length || 0;
  const expired = isEventExpired(event.date);

  const organizerImageUrl =
    event.organizerImage ||
    event.userImage ||
    event.creatorImage ||
    event.image ||
    event.organizer?.image ||
    event.user?.image;

  const finalOrganizerImage =
    organizerImageUrl ||
    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
      event.organizerEmail || event.organizerName || "organizer"
    )}`;

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden pb-10">
      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[380px] w-full bg-gray-900">
        <EventImage
          src={event.thumbnail}
          alt={event.title || "Event Image"}
          fill
          quality={90}
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
        <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-green-800 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          🏷️{" "}
          <LocalizedEventText
            value={event.type || "Donation"}
            bnValue={event.typeBn}
            field="type"
          />
        </span>
        <div className="absolute bottom-6 left-6 right-6 md:left-10 text-white">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2.5 leading-tight">
            <LocalizedEventText
              value={event.title}
              bnValue={event.titleBn}
              field="title"
            />
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-xs md:text-sm text-gray-200">
            <div className="flex items-center gap-1.5">
              📍{" "}
              <LocalizedEventText
                value={event.location}
                bnValue={event.locationBn}
                field="location"
              />
            </div>
            <div className="flex items-center gap-1.5">
              📅 <LocalizedEventText value={event.date} field="date" />
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
                {volunteerCount} {volunteerCount === 1 ? "Volunteer" : "Volunteers"} Joined
              </h3>
              <p className="text-xs text-gray-500">
                {isJoined
                  ? expired
                    ? "You volunteered for this completed initiative"
                    : "You are confirmed for this initiative"
                  : expired
                    ? "This initiative has been completed"
                    : "Sign up to join hands for this drive"}
              </p>
            </div>
          </div>
          <EventActionButtons
            event={event}
            currentUser={currentUser}
            isExpired={expired}
          />
        </div>

        {/* Expired-event notice */}
        {expired && (
          <div
            role="status"
            className="mb-8 flex items-start gap-3.5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4"
          >
            <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg">
              ⏰
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                This event has already ended. Joining is no longer available.
              </h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                The scheduled date has passed, so new volunteer sign-ups are
                closed. You can still browse the event details and the
                confirmed volunteer list below.
              </p>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-[#123c2c] mb-3">
                About this Social Initiative
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                <LocalizedEventText
                  value={event.description}
                  bnValue={event.descriptionBn}
                  field="description"
                />
              </p>
            </div>

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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={finalOrganizerImage}
                    alt={event.organizerName || "Organizer"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
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
            <ConfirmedVolunteers volunteers={event.volunteers || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
