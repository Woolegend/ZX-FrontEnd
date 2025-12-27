import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      new URL('https://image.aladin.co.kr/product/**'),
      new URL('https://lh3.googleusercontent.com/a/**'),
    ],
  },
};

export default nextConfig;
