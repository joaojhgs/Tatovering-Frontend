const jiti = require('jiti')(__filename);

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/env.ts');

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts',
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  transpilePackages: ['antd'],
  swcMinify: true,
  experimental: {
    // Required:
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
