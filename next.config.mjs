/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required for jspdf in server-side API routes
  experimental: {
    serverComponentsExternalPackages: ["jspdf", "jspdf-autotable"],
  },
};

export default nextConfig;
