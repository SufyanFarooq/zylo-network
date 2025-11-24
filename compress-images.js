const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  quality: 85, // 85% quality = great balance between size and quality
  inputDir: 'public/assets',
  backupDir: 'public/assets-backup',
  targetFormats: ['.jpg', '.jpeg', '.png'],
  maxFileSizeMB: 1, // Only compress files larger than 1 MB
};

// Create backup directory
if (!fs.existsSync(CONFIG.backupDir)) {
  fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  console.log('✅ Created backup directory:', CONFIG.backupDir);
}

// Function to get file size in MB
function getFileSizeMB(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size / (1024 * 1024);
}

// Function to compress a single image
async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const sizeBefore = getFileSizeMB(filePath);

  // Skip if file is already small
  if (sizeBefore < CONFIG.maxFileSizeMB) {
    console.log(`⏭️  Skipped: ${fileName} (${sizeBefore.toFixed(2)} MB - already small)`);
    return;
  }

  try {
    // Create backup
    const backupPath = path.join(CONFIG.backupDir, fileName);
    fs.copyFileSync(filePath, backupPath);

    // Compress image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (ext === '.png') {
      await image
        .png({ quality: CONFIG.quality, compressionLevel: 9 })
        .toFile(filePath + '.tmp');
    } else {
      await image
        .jpeg({ quality: CONFIG.quality, mozjpeg: true })
        .toFile(filePath + '.tmp');
    }

    // Replace original with compressed
    fs.unlinkSync(filePath);
    fs.renameSync(filePath + '.tmp', filePath);

    const sizeAfter = getFileSizeMB(filePath);
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);

    console.log(`✅ ${fileName}`);
    console.log(`   Before: ${sizeBefore.toFixed(2)} MB → After: ${sizeAfter.toFixed(2)} MB`);
    console.log(`   Saved: ${reduction}% (${metadata.width}x${metadata.height} pixels preserved)`);
    console.log('');

  } catch (error) {
    console.error(`❌ Error compressing ${fileName}:`, error.message);
  }
}

// Function to find all images recursively
function findImages(dir) {
  let images = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      images = images.concat(findImages(filePath));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.targetFormats.includes(ext)) {
        images.push(filePath);
      }
    }
  }

  return images;
}

// Main function
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║        🎨 IMAGE COMPRESSION TOOL                            ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📁 Scanning: ${CONFIG.inputDir}`);
  console.log(`💾 Backup location: ${CONFIG.backupDir}`);
  console.log(`🎯 Quality: ${CONFIG.quality}%`);
  console.log(`📊 Min size to compress: ${CONFIG.maxFileSizeMB} MB`);
  console.log('');

  const images = findImages(CONFIG.inputDir);
  const largeImages = images.filter(img => getFileSizeMB(img) >= CONFIG.maxFileSizeMB);

  console.log(`📸 Found ${images.length} total images`);
  console.log(`🔥 Found ${largeImages.length} large images (>${CONFIG.maxFileSizeMB}MB)`);
  console.log('');

  if (largeImages.length === 0) {
    console.log('✅ No large images found! All images are already optimized.');
    return;
  }

  console.log('🚀 Starting compression...');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');

  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (const imagePath of largeImages) {
    const sizeBefore = getFileSizeMB(imagePath);
    totalSizeBefore += sizeBefore;

    await compressImage(imagePath);

    if (fs.existsSync(imagePath)) {
      totalSizeAfter += getFileSizeMB(imagePath);
    }
  }

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('🎉 COMPRESSION COMPLETE!');
  console.log('');
  console.log(`📊 Total size before: ${totalSizeBefore.toFixed(2)} MB`);
  console.log(`📊 Total size after:  ${totalSizeAfter.toFixed(2)} MB`);
  console.log(`💾 Total saved:       ${(totalSizeBefore - totalSizeAfter).toFixed(2)} MB (${((totalSizeBefore - totalSizeAfter) / totalSizeBefore * 100).toFixed(1)}%)`);
  console.log('');
  console.log('✅ All original images backed up to:', CONFIG.backupDir);
  console.log('✅ All pixel dimensions preserved!');
  console.log('');
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

