import type { NextConfig } from "next";

const config: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/contentful/contentful-image.loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
  },
};

export default config;
