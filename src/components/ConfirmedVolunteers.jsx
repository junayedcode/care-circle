
"use client";

import { useState } from "react";
import Image from "next/image";

const ConfirmedVolunteers = ({ volunteers = [] }) => {
  const [showAll, setShowAll] = useState(false);

  const previewCount = 2;
  const hasMore = volunteers.length > previewCount;

  const visibleVolunteers = showAll
    ? volunteers
    : volunteers.slice(0, previewCount);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
        CONFIRMED VOLUNTEERS ({volunteers.length})
      </h3>

      {volunteers.length > 0 ? (
        <div className="space-y-3">
          {visibleVolunteers.map((vol, index) => (
            <div key={vol.email || index} className="flex items-center gap-3">
              <Image
                width={32}
                height={32}
                unoptimized
                src={
                  vol.image ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                    vol.email || vol.name || "volunteer"
                  )}`
                }
                alt={vol.name || "Volunteer"}
                className="w-8 h-8 rounded-full object-cover border border-gray-200 bg-gray-50 shrink-0"
              />

              <span className="text-xs font-semibold text-gray-700 truncate">
                {vol.name || "Anonymous Volunteer"}
              </span>
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 pt-2 transition"
            >
              {showAll ? "− Show Less" : `See All Members (${volunteers.length})`}
            </button>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-400 italic">
          No volunteers joined yet.
        </p>
      )}
    </div>
  );
};

export default ConfirmedVolunteers;
