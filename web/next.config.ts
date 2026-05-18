import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: '/awesome-book-recommendations',
  assetPrefix: '/awesome-book-recommendations',
};

export default nextConfig;
