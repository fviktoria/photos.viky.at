import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.ctfassets.net' }],
  },
};

export default config;
