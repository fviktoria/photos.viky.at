import type { NextConfig } from 'next';

const config: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.ctfassets.net' }],
  },
};

export default config;
