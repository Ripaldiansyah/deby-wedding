/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    // Device sizes tuned for mobile-first (mostly phone screens)
    deviceSizes: [390, 430, 768, 1080, 1440],
    imageSizes: [128, 256, 384],
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        // Aggressive cache for static assets
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Short cache for HTML pages (so updates deploy fast)
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // Compress output
  compress: true,
  allowedDevOrigins: ['192.168.18.9'],
};

export default nextConfig;
