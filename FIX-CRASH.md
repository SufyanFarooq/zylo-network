# 🚨 Project Crash Fix

## Problem
Project crash ho raha hai kyunki build incomplete hai aur required files missing hain:
- `app-paths-manifest.json`
- `vendor-chunks/react-icons.js`
- `routes-manifest.json`

## ✅ Solution - Complete Rebuild

### Step 1: Stop Dev Server
```bash
# Terminal mein Ctrl+C press karein (agar server chal raha ho)
# Ya:
pkill -f "next dev"
```

### Step 2: Clean Everything
```bash
rm -rf .next
rm -rf node_modules/.cache
```

### Step 3: Rebuild
```bash
npm run build
```

### Step 4: Start Dev Server
```bash
npm run dev
```

## 🔧 Quick Fix Script

Ya yeh script run karein:

```bash
chmod +x rebuild.sh
./rebuild.sh
```

## 📝 Alternative: Manual Steps

1. **Stop server**: Terminal mein `Ctrl+C`
2. **Clean build**: `rm -rf .next`
3. **Rebuild**: `npm run build`
4. **Start**: `npm run dev`

## ⚠️ Important Notes

- Dev server ko **pehle stop** karein
- `.next` folder ko **completely delete** karein
- Phir **fresh build** karein
- Build complete hone ke baad hi dev server start karein

## 🎯 Root Cause

Next.js dev mode mein incomplete build se chunks missing ho rahe the. Clean rebuild se sab files properly generate hongi.

