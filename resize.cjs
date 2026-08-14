const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (filePath.includes('metro_hero_vid')) return;
      filelist = walkSync(filePath, filelist);
    } else {
      if (filePath.match(/\.(webp|png|jpe?g)$/i) && !file.startsWith('output_frame')) {
        const stats = fs.statSync(filePath);
        if (stats.size > 500000) { // > 500kb
          filelist.push(filePath);
        }
      }
    }
  });
  return filelist;
};

const processFiles = async () => {
  const files = walkSync(path.join(__dirname, 'public'));
  console.log(`Found ${files.length} large images to resize.`);
  for (const file of files) {
    try {
      const ext = path.extname(file).toLowerCase();
      const tempPath = file + '.tmp' + ext;
      
      const image = sharp(file);
      const metadata = await image.metadata();
      
      if (metadata.width > 1920) {
        let pipeline = image.resize({ width: 1920, withoutEnlargement: true });
        
        if (ext === '.webp') pipeline = pipeline.webp({ quality: 80 });
        else if (ext === '.png') pipeline = pipeline.png({ quality: 80 });
        else if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: 80 });
        
        await pipeline.toFile(tempPath);
        fs.renameSync(tempPath, file);
        console.log(`Resized: ${file}`);
      } else {
        // Just optimize if it's already <= 1920px
        let pipeline = image;
        if (ext === '.webp') pipeline = pipeline.webp({ quality: 75 });
        else if (ext === '.png') pipeline = pipeline.png({ quality: 75 });
        else if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: 75 });
        
        await pipeline.toFile(tempPath);
        fs.renameSync(tempPath, file);
        console.log(`Optimized: ${file}`);
      }
    } catch (e) {
      console.error(`Error processing ${file}: ${e.message}`);
    }
  }
};

processFiles();
