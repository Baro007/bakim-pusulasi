#!/bin/bash

set -e

echo "🚀 Starting Netlify Build Process..."

# Environment info
echo "📋 Build Environment:"
echo "  Node.js: $(node --version)"
echo "  NPM: $(npm --version)"
echo "  Working Directory: $(pwd)"

# Environment variables check and fallback
echo "🔐 Checking environment variables..."
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "  ⚠️  NEXT_PUBLIC_SUPABASE_URL not set - using placeholder"
  export NEXT_PUBLIC_SUPABASE_URL="https://placeholder.supabase.co"
else
  echo "  ✓ NEXT_PUBLIC_SUPABASE_URL is set"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
  echo "  ⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY not set - using placeholder"
  export NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder"
else
  echo "  ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY is set"
fi

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


