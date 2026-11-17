import { Suspense } from "react";
import Link from "next/link";
import Heropage from "@/components/Heropage";
import FeatureCards from "@/components/FeatureCards";
import EventCard from "@/components/EventCard";
import { API_BASE } from "@/lib/api";

// ---------- Static shell (prerendered at build time) ----------

export default function Home() {
  return (
    <>
      <Heropage />
      <FeatureCards />

      {/* Event data streams in inside one Suspense boundary — the shell above
          stays static and is served instantly under cacheComponents. */}
      <Suspense fallback={<EventsFallback />}>
        <EventSections />
      </Suspense>

      {/* Call-to-Action Section */}
      <section className="bg-[#123c2c] text-white px-6 md:px-14 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="inline-block bg-green-700/40 text-green-100 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            🌱 Join the Movement
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Small Acts, Big Impact.
          </h2>
          <p className="text-green-100/90 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Every donation drive, cleanup, and plantation counts. Join
            thousands of volunteers building a better community — one event at
            a time. Create your own initiative or lend a hand to one that
            already exists.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/events"
              className="btn bg-green-600 hover:bg-green-500 text-white border-none rounded-full px-8 h-12 min-h-12 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Explore Events →
            </Link>
            <Link
              href="/create-event"
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full px-8 h-12 min-h-12 transition-all duration-300"
            >
              + Create an Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function EventsFallback() {
  return (
    <section className="bg-[#f7faf7] px-4 md:px-8 lg:px-12 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
            >
              <div className="h-52 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded-2xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Dynamic content (streams in at request time) ----------

function EventSection({ id, title, subtitle, accentClass, events, status, emptyText, showViewAll }) {
  if (!events || events.length === 0) {
    if (!emptyText) return null; // hide the section entirely when empty
    return (
      <section id={id} className="bg-[#f7faf7] px-4 md:px-8 lg:px-12 py-14">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            accentClass={accentClass}
            showViewAll={false}
          />
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
              🗓️
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1">
              {emptyText}
            </h3>
            <Link
              href="/events"
              className="inline-block mt-4 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-sm"
            >
              Explore Upcoming Initiatives
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="bg-[#f7faf7] px-4 md:px-8 lg:px-12 py-14">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          accentClass={accentClass}
          showViewAll={showViewAll}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} status={status} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle, accentClass, showViewAll }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
      <div>
        <div
          className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-wider ${accentClass}`}
        >
          CareCircle
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#123c2c]">
          {title}
        </h2>
        <p className="text-gray-500 text-sm mt-1 max-w-2xl">{subtitle}</p>
      </div>
      {showViewAll && (
        <Link
          href="/events"
          className="text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap"
        >
          View All Events →
        </Link>
      )}
    </div>
  );
}

async function EventSections() {
  let events = [];

  try {
    // `cache: "no-store"` keeps this fetch uncached so brand-new events
    // appear on the home page immediately.
    const res = await fetch(`${API_BASE}/events`, { cache: "no-store" });
    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    // During build prerendering the runtime aborts pending fetches once the
    // static shell completes — that rejection is expected and harmless.
    if (!String(error?.message || "").includes("prerender")) {
      console.error("Failed to fetch home page events:", error);
    }
  }

  // All of this runs at request time (inside Suspense), so using
  // Date.now()/new Date() here is safe and deterministic per request.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const isValidDate = (e) => {
    if (!e?.date) return false;
    const d = new Date(e.date);
    return !Number.isNaN(d.getTime());
  };

  // Conditional check requested: an event is active/upcoming when its date is
  // today or in the future; otherwise it is past/completed.
  const upcoming = events
    .filter(isValidDate)
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first

  const past = events
    .filter(isValidDate)
    .filter((e) => new Date(e.date) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first

  return (
    <>
      {/* TOP: upcoming/active initiatives (Join-ready) */}
      <EventSection
        id="upcoming-initiatives"
        title="Upcoming Initiatives"
        subtitle="Community drives happening today or scheduled for the coming days. Find one near you and click Join Initiative to take part."
        accentClass="bg-green-50 text-green-700"
        events={upcoming}
        status="upcoming"
        emptyText="No upcoming initiatives right now."
        showViewAll
      />

      {/* BOTTOM: past/completed initiatives (grayscale, view-only) */}
      <EventSection
        id="past-initiatives"
        title="Past Initiatives"
        subtitle="A look back at the drives our community has already completed."
        accentClass="bg-amber-50 text-amber-700"
        events={past}
        status="past"
        emptyText={null} /* hidden entirely when there are no past events */
        showViewAll={false}
      />
    </>
  );
}
