/** @type {import('next').NextConfig} */
const nextConfig = {
 

  // 2. Your Turbopack rules from earlier
  turbopack: {
    resolveAlias: {
      '@/*': './src/*',
    },
  },
  
  // 3. Your Fallback Webpack options
  webpack: (config) => {
    config.resolve.alias['@'] = new URL('./src', import.meta.url).pathname;
    return config;
  },
};

export default nextConfig;
