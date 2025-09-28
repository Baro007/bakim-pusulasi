/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  assetPrefix: '',
  basePath: '',
  
  // Netlify optimizasyonları - experimental features disabled for stability
  // experimental: {
  //   optimizeCss: true,
  // },
  
  // Webpack optimizasyonları
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Environment variables
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },

  // Compiler optimizasyonları
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Output file tracing (Netlify warning'i için)
  outputFileTracingRoot: process.cwd(),
};

module.exports = nextConfig;
