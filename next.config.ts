import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    disableStaticImages: true,
  },
  async rewrites() {
    return [
      { source: '/index.html', destination: '/' },
      { source: '/index.htm', destination: '/' },
    ];
  },
};

export default nextConfig;