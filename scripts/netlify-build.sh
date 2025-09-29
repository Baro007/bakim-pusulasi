#!/bin/bash

set -e

echo "🚀 Starting Netlify Build Process..."

# Environment info
echo "📋 Build Environment:"
echo "  Node.js: $(node --version)"
echo "  NPM: $(npm --version)"
echo "  Working Directory: $(pwd)"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run build
echo "🔨 Building application..."
NODE_ENV=production npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ -d "out" ]; then
    echo "  ✓ Output directory exists"
    echo "  📊 Build size: $(du -sh out)"
    echo "  📄 Files generated: $(find out -type f | wc -l)"
else
    echo "  ❌ Output directory not found!"
    exit 1
fi

# List critical files
echo "📋 Critical files:"
ls -la out/ | head -10

echo "🎉 Build completed successfully!"

