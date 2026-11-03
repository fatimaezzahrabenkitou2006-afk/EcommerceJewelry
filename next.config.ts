import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 95] },
  devIndicators: false,
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
