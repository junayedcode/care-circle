import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DEFAULT_THUMBNAIL } from "@/lib/api";

// Server-safe event card shared by the Home page sections.
const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between hover:shadow-xl transition duration-300">
      <div>
        {/* Thumbnail Image */}
        <div className="relative h-52 w-full bg-gray-100">
          <Image
            src={event.thumbnail || DEFAULT_THUMBNAIL}
            alt={event.title || "Event Thumbnail"}
            fill
            quality={90}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {event.type || "Community Drive"}
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
            Organizer:{" "}
            <span className="text-gray-600 font-medium">
              {event.organizerName || event.organizerEmail || "Organizer"}
            </span>
          </div>
        </div>
      </div>

      {/* View Event Button */}
      <div className="p-6 pt-0">
        <Link
          href={`/events/${event._id}`}
          className="block w-full text-center bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-2xl transition duration-300 shadow-sm text-sm"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
