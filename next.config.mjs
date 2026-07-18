import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // reactCompiler disabled: it mis-memoizes Clerk 7.0.6's auth hooks in the
  // production build, causing "Cannot destructure property 'auth' of undefined".
  reactCompiler: false,
  turbopack: {
    root: path.resolve('.'),
    resolveAlias: {
      'tailwindcss': path.resolve('./node_modules/tailwindcss'),
      '@tailwindcss/postcss': path.resolve('./node_modules/@tailwindcss/postcss'),
    },
  },

  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./node_modules'));
    return config;
  },
};

export default nextConfig;
