# ZillowVortex Build Guide

## Build Scripts Available

### 1. Quick Build (Recommended)
```bash
npm run build
```

### 2. Production Build (Optimized)
```bash
npm run build:prod
```

### 3. Static Export (For Static Hosting)
```bash
npm run export
```

### 4. Build Analysis
```bash
npm run build:analyze
```

## Build Scripts (Windows)

### build-complete.bat
- Complete build process with error handling
- Cleans previous builds
- Runs linting and TypeScript checks
- Optimized for production

### deploy-build.bat
- Production-ready build
- Includes all optimizations
- Ready for deployment

### build-simple.bat
- Simple build process
- Good for testing

## Build Configuration

The project has been optimized with:

1. **Next.js Configuration** (`next.config.ts`):
   - Standalone output for deployment
   - Webpack optimizations for blockchain libraries
   - Code splitting for better performance
   - Image optimization

2. **Package.json Scripts**:
   - `build`: Standard build
   - `build:prod`: Production build with optimizations
   - `export`: Static export for hosting
   - `build:analyze`: Bundle analysis

## Troubleshooting

### If Build Hangs:
1. Try: `npm run build:prod`
2. Check memory usage
3. Clear `.next` folder: `rmdir /s /q .next`
4. Reinstall dependencies: `npm ci`

### If Build Fails:
1. Check linting: `npm run lint`
2. Check TypeScript: `npx tsc --noEmit`
3. Clear cache: `npm run build -- --no-cache`

## Deployment Options

### 1. Vercel (Recommended)
- Connect GitHub repository
- Automatic deployments
- Built-in optimizations

### 2. Static Hosting
```bash
npm run export
# Deploy the 'out' folder
```

### 3. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Build Output

After successful build:
- Static files: `.next/static/`
- Server files: `.next/server/`
- Build manifest: `.next/build-manifest.json`

## Performance Optimizations

1. **Code Splitting**: Automatic with Next.js
2. **Image Optimization**: WebP/AVIF formats
3. **Bundle Analysis**: Use `npm run build:analyze`
4. **Memory Management**: Increased to 8GB for large builds

## Environment Variables

Required for production:
```
NEXT_PUBLIC_PROJECT_ID=your_project_id
NODE_ENV=production
```

## Support

If you encounter issues:
1. Check Node.js version (recommended: 18.x or 20.x)
2. Clear all caches
3. Reinstall dependencies
4. Check for TypeScript errors

