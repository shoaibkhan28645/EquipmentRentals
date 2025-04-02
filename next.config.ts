/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Important for static exports
  },
  assetPrefix: "/", // Ensure assets use the correct path
  basePath: "", // Add this if your site is in the root directory
  trailingSlash: true, // Add trailing slashes to URLs for better compatibility
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
