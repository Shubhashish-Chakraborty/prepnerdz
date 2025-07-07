import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',       // leave empty unless you need a specific port
        pathname: '/**' // allow all image paths
      },
    ],
  },
};

export default nextConfig;
