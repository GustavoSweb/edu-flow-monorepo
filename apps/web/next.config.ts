import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pacotes do monorepo publicados como TypeScript puro.
  transpilePackages: ["@eduflow/contracts"],
  reactStrictMode: true,
};

export default nextConfig;
