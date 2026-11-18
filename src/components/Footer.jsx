import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0f2e22] text-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              fill="none"
              className="w-9 h-9"
            >
              <path
                d="M20 35C15 30 4 23 4 14C4 7 13 4 20 12C27 4 36 7 36 14C36 23 25 30 20 35Z"
                stroke="#4ade80"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M20 28C16 23 13 19 13 15M20 28C24 22 27 18 28 13"
                stroke="#4ade80"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="20" cy="12" r="3" fill="#22c55e" />
            </svg>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Care<span className="text-green-400">Circle</span>
            </span>
          </Link>
          <p className="text-sm text-green-200/80 mt-4 leading-relaxed max-w-xs">
            A community platform for social development — create, discover, and
            join volunteer events that make a real difference.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-white transition-colors"
              >
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link
                href="/create-event"
                className="hover:text-white transition-colors"
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                href="/manage-events"
                className="hover:text-white transition-colors"
              >
                Manage Events
              </Link>
            </li>
            <li>
              <Link
                href="/joined-events"
                className="hover:text-white transition-colors"
              >
                Joined Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Platform
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/#upcoming-initiatives"
                className="hover:text-white transition-colors"
              >
                Upcoming Initiatives
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="hover:text-white transition-colors"
              >
                Become a Volunteer
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div id="contact">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
            Contact
          </h3>
          <p className="text-sm text-green-200/80 mb-4">
            Questions or feedback? We&apos;d love to hear from you.
          </p>
          <a
            href="mailto:support@carecircle.app"
            className="text-sm text-green-300 hover:text-white transition-colors underline underline-offset-2"
          >
            support@carecircle.app
          </a>
          <div className="flex items-center gap-3 mt-5">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.7-1.6h1.6V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.6H7.5V13h2.9v8h3.1Z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.2l4.3 5.7L17.8 3Zm-1 16.2h1.7L7.3 4.7H5.4l11.4 14.5Z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-200/70">
          {/* Static shell — keep the year a build-time constant so prerendering
              stays deterministic (new Date() is not allowed in the shell). */}
          <p>© 2026 CareCircle. All rights reserved.</p>
          <p>Together we make a difference 💚</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
