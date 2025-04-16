import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ESLint 경고가 빌드 실패로 이어지지 않도록 설정
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
