import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal configuration to avoid all build issues
  // output: 'standalone' - Only use for production builds, causes issues in dev mode

  // NO experimental features at all to avoid critters issues
  // experimental: {},

  // Reduce unnecessary preloads
  poweredByHeader: false,

  // Compression and optimization
  compress: true,

  // Rewrites to map display names to actual folder paths
  async rewrites() {
    return [
      { source: '/incept-now', destination: '/register' },
      { source: '/incept-now/:path*', destination: '/register/:path*' },
      { source: '/power-up', destination: '/staking' },
      { source: '/vortex-zone', destination: '/levels' },
      { source: '/vortex-zone/:path*', destination: '/levels/:path*' },
      { source: '/milestone', destination: '/achievement' },
      { source: '/vortex-leaderboard', destination: '/leaderboard' },
      { source: '/claimx', destination: '/claim' },
      { source: '/swappy', destination: '/swap' },
      { source: '/ping-us', destination: '/contact' },
    ];
  },
  
  // Reduce automatic preloads that cause warnings
  // Next.js will be more conservative about preloading resources
  experimental: {
    optimizePackageImports: ['@reown/appkit', 'react-icons'],
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // ESLint configuration for build
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Webpack configuration for blockchain libraries
  webpack: (config: any, { isServer, dev }) => {
    // Handle ethers library and other Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };

    // Fix for porto module resolution issue in @reown/appkit-adapter-wagmi
    // porto is an optional connector, so we ignore it if not found
    const webpack = require('webpack');
    
    // Use IgnorePlugin to ignore porto module completely
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^porto$/,
      })
    );

    // Also add alias as fallback
    config.resolve.alias = {
      ...config.resolve.alias,
      porto: false,
    };

    // Disable source maps in development to reduce 404 errors
    if (dev) {
      config.devtool = false;
    }

    // Fix chunk loading issues
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      };
    }

    return config;
  },
};

export default nextConfig;
