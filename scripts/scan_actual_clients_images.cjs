const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve(__dirname, '../public/assets/clients_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const clientsDir = path.resolve(__dirname, '../public/assets/clients');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

let totalImagesFound = 0;
let projectsWithImages = 0;
let projectsWithoutImages = 0;

manifest.forEach((p, idx) => {
  let folderName = p.folder;
  if (folderName === 'Mr. Ranachandra') folderName = 'Mr. Ramachandra';
  const fPath = path.join(clientsDir, folderName);
  
  if (!fs.existsSync(fPath)) {
    console.log(`[Missing folder] ${folderName}`);
    projectsWithoutImages++;
    return;
  }

  function getFiles(dir, prefix = '') {
    let list = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      const rel = prefix ? `${prefix}/${ent.name}` : ent.name;
      if (ent.isDirectory()) {
        list = list.concat(getFiles(full, rel));
      } else if (imageExts.has(path.extname(ent.name).toLowerCase())) {
        list.push(rel.replace(/\\/g, '/'));
      }
    }
    return list;
  }

  const imgs = getFiles(fPath);
  if (imgs.length > 0) {
    projectsWithImages++;
    totalImagesFound += imgs.length;
    // console.log(`[${idx}] ${p.name} (${folderName}): ${imgs.length} images`);
  } else {
    projectsWithoutImages++;
    console.log(`[Empty folder] ${folderName} (${p.name})`);
  }
});

console.log('--------------------------------------------------');
console.log(`Projects with actual disk images: ${projectsWithImages} / 90`);
console.log(`Projects without disk images: ${projectsWithoutImages} / 90`);
console.log(`Total images found on disk: ${totalImagesFound}`);
