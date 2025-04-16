import type { NextConfig } from 'next';
import { webpack } from 'next/dist/compiled/webpack/webpack';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'ixhmzqhtlhcrvikdvpsy.supabase.co',
      'p1.music.126.net',
      'p2.music.126.net',
    ],
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );
    return config;
  },
};

export default nextConfig;
