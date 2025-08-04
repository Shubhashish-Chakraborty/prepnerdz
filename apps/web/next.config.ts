// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//   }
//   /* config options here */
// };

// export default nextConfig;

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
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add settings to help with hydration issues
  reactStrictMode: true,
  // Disable source maps in development to reduce browser extension interference
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        config.devtool = 'eval-source-map';
      }
      return config;
    },
  }),
  // Add experimental features for better SSR handling
  experimental: {
    // Enable server actions if you're using them
    serverActions: true,
  },
};

export default nextConfig;
