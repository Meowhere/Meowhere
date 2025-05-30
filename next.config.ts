import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
