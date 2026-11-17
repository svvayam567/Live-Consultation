const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve(__dirname, '../public/assets/clients_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const clientsDir = path.resolve(__dirname, '../public/assets/clients');
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

let updatedCount = 0;
let totalImages = 0;

function naturalSort(a, b) {
  const aBase = path.basename(a, path.extname(a)).toLowerCase();
  const bBase = path.basename(b, path.extname(b)).toLowerCase();

  const aIsOverview = aBase.includes('overview') || aBase.includes('cover') || aBase === '1' || aBase === '01';
  const bIsOverview = bBase.includes('overview') || bBase.includes('cover') || bBase === '1' || bBase === '01';

  if (aIsOverview && !bIsOverview) return -1;
  if (!aIsOverview && bIsOverview) return 1;

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function getFolderImages(dir, relPrefix = '') {
  let list = [];
  if (!fs.existsSync(dir)) return list;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    const rel = relPrefix ? `${relPrefix}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      list = list.concat(getFolderImages(full, rel));
    } else if (imageExts.has(path.extname(ent.name).toLowerCase())) {
      list.push(rel.replace(/\\/g, '/'));
    }
  }
  return list;
}

const updatedManifest = manifest.map((p, idx) => {
  let folderName = p.folder;
  if (folderName === 'Mr. Ranachandra') folderName = 'Mr. Ramachandra';

  const folderDiskPath = path.join(clientsDir, folderName);
  const relativeFiles = getFolderImages(folderDiskPath);

  // Sort files naturally
  relativeFiles.sort(naturalSort);

  if (relativeFiles.length > 0) {
    updatedCount++;
    totalImages += relativeFiles.length;

    const imgPaths = relativeFiles.map(f => `assets/clients/${folderName}/${f}`);
    const hero = imgPaths[0];

    const stages = [
      {
        stage_key: 'overview',
        title: 'Project Overview',
        dir_name: 'overview',
        images: [hero],
        count: 1
      },
      {
        stage_key: 'gallery',
        title: 'Project Gallery',
        dir_name: 'gallery',
        images: imgPaths,
        count: imgPaths.length
      }
    ];

    return {
      ...p,
      folder: folderName,
      heroImg: hero,
      overviewImg: hero,
      hasOverview: true,
      images: imgPaths,
      stages
    };
  } else {
    return {
      ...p,
      folder: folderName,
      heroImg: '',
      overviewImg: null,
      hasOverview: false,
      images: [],
      stages: []
    };
  }
});

fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2));
console.log(`Successfully updated ${manifestPath}`);
console.log(`Projects with verified images: ${updatedCount} / ${manifest.length}`);
console.log(`Total valid images indexed: ${totalImages}`);
