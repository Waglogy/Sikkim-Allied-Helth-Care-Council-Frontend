import type { NextConfig } from "next";

// Allow next/image to load images served by the API/storage backend. Derived
// from the same base URL the app uses so it works across local / prod.
const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
const apiUrl = new URL(apiBase);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
      },
      // Cloudflare R2 public buckets, when configured.
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
    ],
  },
};

export default nextConfig;
