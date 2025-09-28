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
  
  // Performance optimizasyonları - swcMinify deprecated in Next 15
  
  // Webpack optimizasyonları
  webpack: (config, { isServer, dev }) => {
    // Performance optimizations for production builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
            },
          },
        },
      };
    }
    
    // Memory optimization
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        path: false,
        os: false,
        stream: false,
        assert: false,
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
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },

  // Output file tracing (Netlify warning'i için)
  outputFileTracingRoot: process.cwd(),
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Build optimizations
  generateBuildId: async () => {
    return 'bakim-pusulasi-build-' + Date.now();
  },
};

module.exports = nextConfig;
