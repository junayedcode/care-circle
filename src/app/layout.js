import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navber";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import {
  LANGUAGE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/lib/navbarPreferences";

const preferenceScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("${THEME_STORAGE_KEY}");d.setAttribute("data-theme",t==="dark"||t==="light"?t:"light");var l=localStorage.getItem("${LANGUAGE_STORAGE_KEY}");d.setAttribute("lang",l==="bn"||l==="en"?l:"en")}catch(e){}})()`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareCircle — Community Volunteer Events",
  description:
    "Join community events, volunteer for good causes, and help build a better society. Create, manage, and track volunteer initiatives.",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Navber />
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
