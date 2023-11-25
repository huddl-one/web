/** @type {import('next').NextConfig} */

const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

const nextConfig = {
  transpilePackages: ["@huddl/db", "@huddl/utils"],
  // @ts-ignore
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  }
};

module.exports = nextConfig;
