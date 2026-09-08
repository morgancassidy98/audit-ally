import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Pin the workspace root so Turbopack doesn't walk up and pick up the stray
  // ~/package-lock.json + ~/package.json outside this repo.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
