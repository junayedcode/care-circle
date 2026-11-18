"use client";

import React from "react";
import Link from "next/link";
import EventImage from "@/components/EventImage";
import { useLanguage } from "@/lib/languageContext";
import { formatLocalizedDate, getLocalizedEventValue } from "@/lib/eventLanguage";

// Server-safe event card shared by the Home page and Events page sections.
//
// status:
//  - "upcoming" (default) → green "Join Initiative" CTA. The button links to
//    the event detail page, where the auth-aware join flow lives
//    (EventActionButtons prompts unauthenticated users to log in first).
//  - "past" → slightly grayed-out/grayscale design with a "View Details" CTA.
const EventCard = ({ event, status = "upcoming" }) => {
  const isPast = status === "past";
  const language = useLanguage();

  // Event content is localized from the same language state as the Navbar
  // toggle. Original MongoDB fields are never modified.
  const title = getLocalizedEventValue(event, "title", language);
  const description = getLocalizedEventValue(event, "description", language);
  const location = getLocalizedEventValue(event, "location", language);
  const type = getLocalizedEventValue(event, "type", language) || "Community Drive";
  const dateText = formatLocalizedDate(event.date, language);

  return (
    <div
      className={`bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300 ${
        isPast ? "opacity-90" : ""
      }`}
    >
      <div>
        {/* Thumbnail Image */}
        <div className="relative h-52 w-full bg-gray-100">
          <EventImage
            src={event.thumbnail}
            alt={title || "Event Thumbnail"}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover ${isPast ? "grayscale" : ""}`}
          />
          {isPast ? (
            <span className="absolute top-3 left-3 z-10 bg-gray-800/80 backdrop-blur-md text-gray-100 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Completed
            </span>
          ) : (
            <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {type}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2 min-w-0">
            <span>📅</span>
            <span className="truncate">{dateText}</span>
          </div>

          <h2 className="text-xl font-bold text-[#123c2c] mb-2 line-clamp-1 min-h-[1.75rem]">
            {title}
          </h2>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 min-w-0">
            <span>📍</span>
            <span className="truncate">{location}</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem] mb-4">
            {description}
          </p>

          <div className="text-xs text-gray-500 truncate border-t border-gray-100 pt-3">
            Organizer:{" "}
            <span className="text-gray-600 font-medium">
              {event.organizerName || event.organizerEmail || "Organizer"}
            </span>
          </div>
        </div>
      </div>

      {/* Status-aware CTA */}
      <div className="p-6 pt-0">
        {isPast ? (
          <Link
            href={`/events/${event._id}`}
            className="block w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 rounded-2xl transition duration-300 shadow-sm text-sm"
          >
            View Details →
          </Link>
        ) : (
          <Link
            href={`/events/${event._id}`}
            className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-sm text-sm"
          >
            Join Initiative →
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
