/** @type {import('next').NextConfig} */
import path from "node:path";

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    // Next.js 16 restricts the allowed quality values; 90 is used for
    // sharp hero/card images (75 stays the default for the rest).
    qualities: [75, 90],
  },
  experimental: { agentFeedback: true },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    // The Next.js app lives in this subfolder while the npm lockfile used for
    // cache validation sits in the parent (repo) directory.
    root: path.join(import.meta.dirname, ".."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;