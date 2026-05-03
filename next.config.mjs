/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimasi gambar dari URL eksternal (Cloudinary, dll)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // Cache 1 tahun
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Izinkan semua HTTPS image source
      },
    ],
  },

  // Tambah header cache untuk aset statis
  async headers() {
    return [
      {
        // Cache semua aset di /assets/ selama 1 tahun
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
