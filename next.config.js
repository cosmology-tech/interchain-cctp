const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')();
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const noopPlugin = (nextConfig) => nextConfig;

module.exports = () => {
  const plugins = [
    createVanillaExtractPlugin(),
    process.env.ANALYZE === 'true' ? withBundleAnalyzer : noopPlugin
  ];

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    // !! WARN !!
    // Turn this off when you need to deploy to Vercel directly
    output: 'export',
    reactStrictMode: true,
    typescript: {
      // !! WARN !! This is a workaround for the following issue:
      // Currently turn on due to error:
      // ./node_modules/@cosmjs/encoding/build/utf8.d.ts:1:1
      // Type error: File appears to be binary.
      ignoreBuildErrors: true
    },
    transpilePackages: [
      '@leapwallet/cosmos-social-login-capsule-provider-ui',
      '@leapwallet/cosmos-social-login-capsule-provider'
    ],
    images: {
      // !! WARN !!
      // Turn this off when you deploy to Vercel or self host via AWS amplify
      // This is turned on to work with output: 'export'
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com'
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com'
        }
      ]
    },
    // Workaround for Next issue with locally linked packages `Cannot read properties of null (reading 'useRef')`
    webpack: (config) => {
      // This fixes the invalid hook React error which
      // will occur when multiple versions of React is detected
      // This can happen since common project is also using Next (which is using React)
      const reactPaths = {
        react: path.join(__dirname, 'node_modules/react'),
        'react-dom': path.join(__dirname, 'node_modules/react-dom')
      };
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          ...reactPaths
        }
      };
      return config;
    }
  };

  return plugins.reduce((acc, next) => {
    return next(acc);
  }, nextConfig);
};
