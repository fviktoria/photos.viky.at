import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: {
    // next/image optimization requires a server; for static export we serve originals.
    // WebP/AVIF conversion is handled by the CDN (e.g. Vercel) at request time.
    unoptimized: true,
  },
};

export default config;
