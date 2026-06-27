import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/blog/luna-en-piscis-carta-natal/",
        destination: "/blog/luna-en-piscis/",
        permanent: true,
      },
      {
        source: "/blog/luna-en-sagitario-carta-natal/",
        destination: "/blog/luna-en-sagitario/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
