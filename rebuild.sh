#!/bin/bash

echo "🧹 Cleaning project..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .next/cache

echo "📦 Verifying dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "✅ Build complete! You can now run: npm run dev"

