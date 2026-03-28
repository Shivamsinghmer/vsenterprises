import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: path.resolve('.'),
  },
  experimental: {
    turbopack: {
      root: path.resolve('.'),
      resolveAlias: {
        'tailwindcss': path.resolve('./node_modules/tailwindcss'),
        '@tailwindcss/postcss': path.resolve('./node_modules/@tailwindcss/postcss'),
      },
    },
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./node_modules'));
    return config;
  },
};

export default nextConfig;
