"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify/unstyled";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // The auth proxy redirects protected pages to /login?callbackUrl=<path>.
  // Return the user there after logging in — only same-site paths are allowed
  // (must start with a single "/" so an attacker can't use "//evil.com").
  const rawCallbackUrl = searchParams.get("callbackUrl") || "/";
  const callbackUrl =
    rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")
      ? rawCallbackUrl
      : "/";

  const handlegooglelogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Google login failed. Please try again.");
        console.error(error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email");
      const password = formData.get("password");

      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: formData.get("remember") === "on",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Logged in successfully!");
      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-[#123c2c] p-8 md:p-12 flex flex-col justify-between text-white min-h-[300px]">

          <Link href="/" className="text-2xl font-bold">
            💚 CareCircle
          </Link>

          <div className="my-10">
            <p className="text-green-300 font-semibold mb-4">
              Welcome Back!
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Together We
              <br />
              Make a Difference.
            </h1>

            <p className="text-green-100 mt-5 leading-relaxed">
              Connect with your community, join meaningful events
              and help build a better society.
            </p>
          </div>

          <p className="text-sm text-green-200">
            © 2026 CareCircle. All rights reserved.
          </p>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#123c2c]">
              Login to your account
            </h2>

            <p className="text-gray-500 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition text-gray-800"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-green-800"
              />

              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
           onClick={handlegooglelogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition duration-300 cursor-pointer"
          >
            <svg viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.02 13.22l7.98 6.19C12.9 13.72 18.06 9.5 24 9.5Z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.93c-.58 3.01-2.26 5.55-4.76 7.27l7.73 6C44.42 37.97 46.98 31.84 46.98 24.55Z"/>
              <path fill="#FBBC05" d="M10.99 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.77l-7.73-6c-2.14 1.45-4.88 2.3-8.17 2.3-5.94 0-11.1-4.22-13-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z"/>
            </svg>

            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-green-800 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f7faf7]"></main>}>
      <LoginPageContent />
    </Suspense>
  );
}
