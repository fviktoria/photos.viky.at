import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.config.ts");

const config: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/contentful/contentful-image.loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.ctfassets.net" }],
  },
};

export default withNextIntl(config);
