import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/certificates/[id]": ["./public/fonts/*.ttf"],
  },
};

export default nextConfig;
