import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navber";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navber />
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
