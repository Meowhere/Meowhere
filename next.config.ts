import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // HTTP 또는 HTTPS 프로토콜 지정
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com', // 허용할 호스트네임
      },
      // 필요한 경우 다른 외부 도메인도 여기에 추가합니다.
      // 예: { protocol: 'https', hostname: 'another-image-host.com' },
    ],
  },
  webpack(config, options) {
    // svg import를 컴포넌트로 가능하게
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
