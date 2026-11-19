"use client";

import React, { useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify/unstyled";
import {
  getStoredLanguage,
  getStoredTheme,
  setStoredLanguage,
  setStoredTheme,
} from "@/lib/navbarPreferences";
import { applyDomTranslation } from "@/lib/translations";
import { notifyLanguageChange } from "@/lib/languageContext";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  // The inline script in the root layout applies stored preferences before
  // paint. Re-apply here after hydration (and after dev StrictMode remounts).
  // The translation observer handles text rendered by later navigation.
  useLayoutEffect(() => {
    const theme = getStoredTheme();
    const language = getStoredLanguage();

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("lang", language);
    applyDomTranslation(language);
    notifyLanguageChange(language);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = getStoredTheme() === "dark" ? "light" : "dark";
    setStoredTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleLanguageToggle = () => {
    const nextLanguage = getStoredLanguage() === "bn" ? "en" : "bn";
    setStoredLanguage(nextLanguage);
    document.documentElement.setAttribute("lang", nextLanguage);
    applyDomTranslation(nextLanguage);
    notifyLanguageChange(nextLanguage);
  };

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8 lg:px-12 justify-between gap-2">
      {/* Logo + Mobile Menu */}
      <div className="navbar-start !w-auto min-w-0 flex-1 gap-1">
        {/* Mobile Navigation Dropdown */}
        <div className="dropdown md:hidden">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open menu"
            className="btn btn-ghost btn-sm px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-2xl z-[2] mt-2 w-52 max-w-[calc(100vw-2rem)] p-2 shadow-2xl border border-gray-100"
          >
            <li>
              <Link href="/" className="rounded-xl">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="rounded-xl">
                About
              </Link>
            </li>
            <li>
              <Link href="/events" className="rounded-xl">
                Upcoming Events
              </Link>
            </li>
            <li>
              <Link href="/create-event" className="rounded-xl">
                Create Event
              </Link>
            </li>
            <li>
              <Link href="/manage-events" className="rounded-xl">
                Manage Events
              </Link>
            </li>
            <li>
              <Link href="/joined-events" className="rounded-xl">
                Joined Events
              </Link>
            </li>
            {session ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-xl text-red-600"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login" className="rounded-xl">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="rounded-xl">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link href="/" className="flex items-center gap-1 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0"
          >
            <path
              d="M20 35C15 30 4 23 4 14C4 7 13 4 20 12C27 4 36 7 36 14C36 23 25 30 20 35Z"
              stroke="#15803d"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M20 28C16 23 13 19 13 15M20 28C24 22 27 18 28 13"
              stroke="#15803d"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="20" cy="12" r="3" fill="#16a34a" />
          </svg>

          <span className="text-base sm:text-lg md:text-xl font-extrabold tracking-tight min-w-0 truncate">
            <span className="text-green-800">Care</span>
            <span className="text-green-600">Circle</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="navbar-center hidden md:flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-black font-semibold hover:text-green-700 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-sm text-black font-semibold hover:text-green-700 transition-colors"
        >
          About
        </Link>
        <Link
          href="/events"
          className="text-sm text-black font-semibold hover:text-green-700 transition-colors"
        >
          Upcoming Events
        </Link>
      </div>

      {/* Right Side */}
      <div className="navbar-end !w-auto min-w-0 flex-1 flex-wrap justify-end gap-2 md:gap-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleThemeToggle}
            className="btn btn-ghost btn-sm px-2"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4 hidden theme-icon-moon"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4 hidden theme-icon-sun"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleLanguageToggle}
            className="btn btn-ghost btn-sm px-2"
            aria-label="Toggle language"
            title="Toggle language"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-4 h-4 language-compact-icon"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3z"
              />
            </svg>
            <span className="hidden language-label-en">EN</span>
            <span className="hidden language-label-bn">বাংলা</span>
          </button>
        </div>

        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        ) : session ? (
          /* Profile Dropdown & Logout Button */
          <div className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-1.5 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-green-700 relative">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      quality={90}
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-800 text-white flex items-center justify-center font-bold text-sm">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-2xl z-[1] mt-3 w-64 max-w-[calc(100vw-2rem)] p-3 shadow-2xl border border-gray-100"
              >
                {/* User Info Header */}
                <li className="px-3 py-2.5 border-b border-gray-100 mb-1.5 pointer-events-none">
                  <p className="font-bold text-gray-800 text-sm truncate">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {session.user?.email || ""}
                  </p>
                </li>

                {/* Menu Links */}
                <li>
                  <Link
                    href="/profile"
                    className="py-2.5 px-3 font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create-event"
                    className="py-2.5 px-3 font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-events"
                    className="py-2.5 px-3 font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H3.75" />
                    </svg>
                    Manage Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/joined-events"
                    className="py-2.5 px-3 font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-xl transition flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Joined Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="!hidden sm:!flex items-center gap-1.5 border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-1.5 rounded-full font-semibold text-xs transition duration-300 cursor-pointer shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="!hidden sm:!inline-flex btn btn-sm rounded-full bg-white text-green-700 border border-green-700 hover:bg-green-50 px-4"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="!hidden sm:!inline-flex btn btn-sm rounded-full bg-green-700 hover:bg-green-800 text-white border-none px-4"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;