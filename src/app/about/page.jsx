import React from "react";
import Link from "next/link";

export const metadata = {
  title: "About CareCircle — Our Mission, Vision & Purpose",
  description:
    "Learn how CareCircle connects caring volunteers with community-led social development events, and why our mission is to turn shared kindness into lasting local impact.",
};

const missionVision = [
  {
    label: "Our Mission",
    title: "Make doing good simple, accessible, and meaningful.",
    description:
      "CareCircle connects people who care with community initiatives that need them — removing the friction between a helping hand and a cause that matters.",
    points: [
      "Make volunteering easy to discover and join",
      "Support community-led social development",
      "Turn good intentions into collective action",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Our Vision",
    title: "A world where every community has what it needs to thrive.",
    description:
      "We imagine neighborhoods where giving back is part of everyday life, and where anyone can step forward to make their corner of the world a little better.",
    points: [
      "Stronger, more connected neighborhoods",
      "A place for everyone to contribute",
      "Lasting impact, one event at a time",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    iconClass: "bg-teal-50 text-teal-700",
  },
  {
    label: "Our Purpose",
    title: "Give good people the tools to lead good work.",
    description:
      "CareCircle exists to strengthen the circle between organizers, volunteers, and the communities they serve — so every act of care can grow into something bigger.",
    points: [
      "Empower organizers with simple tools",
      "Help volunteers find their cause",
      "Build stronger, kinder communities",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    ),
    iconClass: "bg-amber-50 text-amber-700",
  },
];

const steps = [
  {
    step: "01",
    title: "Discover or create",
    description:
      "Browse upcoming initiatives by cause and location, or publish your own community drive in just a few minutes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Join the circle",
    description:
      "Sign up for a cause you care about with one click. Your spot is confirmed and your commitment is tracked.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Show up and serve",
    description:
      "Meet your neighbors, lend a hand on the ground, and be part of a shared effort that creates real change.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.3l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Grow the impact",
    description:
      "Return for more initiatives, invite a friend, and help turn one good day into a lasting culture of care.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
];

const audiences = [
  {
    label: "For Volunteers",
    description:
      "Find drives that match your passion and schedule, join securely, and keep a record of every initiative you support.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "For Organizers",
    description:
      "Create and manage events, share opportunities with your network, and see exactly who is joining your cause.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
        <path d="M14 8a4 4 0 0 1 0 8" />
        <path d="M17 5a8 8 0 0 1 0 14" />
      </svg>
    ),
  },
  {
    label: "For Communities",
    description:
      "Bring neighbors together around shared challenges and turn everyday compassion into collective, visible action.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
];

const glanceItems = [
  "Discover local volunteer initiatives",
  "Join a cause with one secure click",
  "Create and manage your own drives",
  "Keep track of your volunteer journey",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f7faf7]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#edf5e7]">
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-green-200/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-20 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-green-800 bg-white/80 border border-green-200 rounded-full px-4 py-2 text-xs md:text-sm font-semibold mb-6 shadow-sm">
              💚 About CareCircle
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-[#123c2c] leading-[1.12] tracking-tight">
              Turning shared kindness into{" "}
              <span className="text-green-700">lasting community change.</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg mt-6 leading-8 max-w-2xl">
              CareCircle is a community-powered volunteering platform that
              connects people who care with social development initiatives that
              need them — from donation drives and cleanups to plantation days,
              winter relief, and health camps.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/events"
                className="btn bg-green-800 hover:bg-green-900 text-white border-none rounded-full px-8 h-12 min-h-12 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Events →
              </Link>
              <Link
                href="/signup"
                className="btn bg-white/80 border border-green-700 text-green-800 hover:bg-green-800 hover:text-white rounded-full px-8 h-12 min-h-12 transition-all duration-300"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>

          {/* At-a-glance card */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[38px] bg-green-200/40 blur-2xl"
            />
            <div className="relative bg-white/90 backdrop-blur rounded-[32px] border border-green-100 shadow-xl p-7 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12.5 10.5 15 16 9.5" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#123c2c]">
                    Our circle at a glance
                  </h2>
                  <p className="text-xs text-gray-500">
                    One platform, many ways to care.
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {glanceItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    </span>
                    <span className="text-sm text-gray-700 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl bg-[#123c2c] text-white px-5 py-4">
                <p className="text-xs uppercase tracking-wider text-green-300 font-bold">
                  Together
                </p>
                <p className="text-sm text-green-50 mt-1 leading-relaxed">
                  Small acts of care become real change when we show up for one
                  another.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Purpose */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider bg-green-50 text-green-700">
              What Drives Us
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#123c2c]">
              Why CareCircle exists
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-3 leading-relaxed">
              We believe community change starts with connection. Our mission,
              vision, and purpose keep every event, every volunteer, and every
              organizer moving in the same direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {missionVision.map((item) => (
              <article
                key={item.label}
                className="group bg-white rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.iconClass}`}
                >
                  {item.icon}
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mt-5">
                  {item.label}
                </p>
                <h3 className="text-lg font-bold text-[#123c2c] mt-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {item.description}
                </p>

                <ul className="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs text-gray-600"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-gray-100 px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider bg-green-50 text-green-700">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#123c2c]">
                From good intentions to good work
              </h2>
              <p className="text-gray-500 text-sm md:text-base mt-3 leading-relaxed">
                CareCircle keeps the path simple: find a cause, join the circle,
                show up, and grow the impact.
              </p>
            </div>
            <Link
              href="/events"
              className="text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap"
            >
              Browse Initiatives →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item) => (
              <article
                key={item.step}
                className="relative bg-[#f7faf7] rounded-[26px] border border-gray-100 p-6 hover:border-green-200 hover:shadow-md transition-all duration-300"
              >
                <span className="absolute top-5 right-5 text-3xl font-extrabold text-green-600 select-none">
                  {item.step}
                </span>
                <div className="relative w-11 h-11 rounded-xl bg-white text-green-700 border border-green-100 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <h3 className="relative text-base font-bold text-[#123c2c] mt-5">
                  {item.title}
                </h3>
                <p className="relative text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who it helps */}
      <section className="bg-[#edf5e7] px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider bg-white/80 text-green-700">
              Built for Everyone
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#123c2c]">
              One circle, many ways to make a difference
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed">
              Whether you have an hour to give, an initiative to lead, or a
              community to strengthen, there is a place for you here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {audiences.map((item) => (
              <article
                key={item.label}
                className="bg-white rounded-[26px] border border-green-100 shadow-sm p-7 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-[#123c2c] mt-4">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-[#123c2c] text-white px-6 md:px-14 lg:px-20 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-block bg-green-700/40 text-green-100 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            🌱 Join the Movement
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Ready to make a difference?
          </h2>
          <p className="text-green-100/90 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Every volunteer, every organizer, and every shared moment of care
            adds to the circle. Find an initiative near you or start one of your
            own today.
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
    </main>
  );
}
