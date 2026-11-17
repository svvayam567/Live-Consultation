const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const csvPath = path.join(__dirname, 'projects_master.csv');
const manifestPath = path.join(projectRoot, 'public/assets/clients_manifest.json');
const manifestJsPath = path.join(projectRoot, 'public/assets/clients_manifest.js');
const distDir = path.join(projectRoot, 'dist/assets');

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

function formatDimensions(w, d, h) {
  const parts = [];
  if (w !== undefined && w !== null && String(w).trim() !== '') {
    parts.push(`W ${String(w).trim()}`);
  }
  if (d !== undefined && d !== null && String(d).trim() !== '') {
    parts.push(`D ${String(d).trim()}`);
  }
  if (h !== undefined && h !== null && String(h).trim() !== '') {
    parts.push(`H ${String(h).trim()}`);
  }
  if (parts.length === 0) return '';
  return `${parts.join(' × ')} ft`;
}

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.|mr|mrs|ms|dr)\s*/i, '')
    .replace(/\s+(chennai|anantapur|sanctuary|sanctum|thane|temple|pooja\s*room|mandir)$/i, '')
    .replace(/[^a-z0-9]/g, '');
}

const explicitAliases = {
  'yashaswini': 'Ms. Yasashwini',
  'msyashaswini': 'Ms. Yasashwini',
  'manasakuncham': 'Ms. Manasa Kunchum',
  'rajkumarsubramanian': 'Mr. Rakjkumar Subramanian',
  'atulmehotra': 'Mr. Athul Mehrotra',
  'mehrotra': 'Mr. Athul Mehrotra'
};

// 1. Read CSV
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split(/\r?\n/).filter(l => l.trim().length > 0);

const csvRecords = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  const name = row[0];
  if (!name) continue; // Skip blank template rows
  csvRecords.push({
    customerName: name,
    location: row[1] || '',
    designDetail: row[3] || '',
    structureType: row[4] || '',
    widthFt: row[5] || '',
    depthFt: row[6] || '',
    heightFt: row[7] || '',
    displayPrice: row[8] || '',
    projectId: row[9] || '',
    widthCategory: row[10] || ''
  });
}

console.log(`Parsed ${csvRecords.length} customer records from spreadsheet.`);

// 2. Read existing manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log(`Read existing manifest with ${manifest.length} projects.`);

const assignedCSV = new Set();
let updatedCount = 0;

const updatedManifest = manifest.map((proj, idx) => {
  const normFolder = normalize(proj.folder);
  const normName = normalize(proj.name);
  const normId = normalize(proj.id);

  let match = null;

  // 1. Explicit alias
  const alias = explicitAliases[normFolder] || explicitAliases[normName] || explicitAliases[normId];
  if (alias) {
    match = csvRecords.find(c => c.customerName === alias && !assignedCSV.has(c.customerName));
  }

  // 2. Exact normalized equality
  if (!match) {
    match = csvRecords.find(c => {
      if (assignedCSV.has(c.customerName)) return false;
      const cNorm = normalize(c.customerName);
      return cNorm === normFolder || cNorm === normName || cNorm === normId;
    });
  }

  // 3. Location-assisted
  if (!match && proj.location) {
    const pLoc = proj.location.toLowerCase();
    match = csvRecords.find(c => {
      if (assignedCSV.has(c.customerName)) return false;
      const cNorm = normalize(c.customerName);
      const cLoc = (c.location || '').toLowerCase();
      return (cLoc === pLoc || pLoc.includes(cLoc) || cLoc.includes(pLoc)) &&
             (normFolder.includes(cNorm) || cNorm.includes(normFolder) || normName.includes(cNorm) || cNorm.includes(normName));
    });
  }

  if (match) {
    assignedCSV.add(match.customerName);
    updatedCount++;

    const formattedDim = formatDimensions(match.widthFt, match.depthFt, match.heightFt);

    return {
      ...proj,
      // Strictly preserve: id, name, folder, heroImg, overviewImg, images, stages, status, etc.
      // Update dimensions:
      widthFt: match.widthFt ? parseFloat(match.widthFt) : undefined,
      depthFt: match.depthFt ? parseFloat(match.depthFt) : undefined,
      heightFt: match.heightFt ? parseFloat(match.heightFt) : undefined,
      size: formattedDim,
      dimensions: formattedDim,
      // Update design detail & structure type:
      designDetail: match.designDetail,
      structureType: match.structureType,
      sheetProjectId: match.projectId,
      widthCategory: match.widthCategory
    };
  }

  console.warn(`[UNMATCHED] Manifest index ${idx}: ${proj.id} (${proj.folder})`);
  return proj;
});

console.log(`Updated ${updatedCount} / ${manifest.length} projects.`);

// Category breakdown
const counts = {
  Minimal: updatedManifest.filter(p => p.designDetail === 'Minimal').length,
  Moderate: updatedManifest.filter(p => p.designDetail === 'Moderate').length,
  Heavy: updatedManifest.filter(p => p.designDetail === 'Heavy').length,
  Unmatched: updatedManifest.filter(p => !p.designDetail).length
};
console.log('Design detail category counts:', counts);

// Structure type breakdown
const structureTypes = {};
updatedManifest.forEach(p => {
  if (p.structureType) {
    structureTypes[p.structureType] = (structureTypes[p.structureType] || 0) + 1;
  }
});
console.log('Structure type counts:', structureTypes);

// Sample check
console.log('\nSample Project 0:', JSON.stringify({
  id: updatedManifest[0].id,
  name: updatedManifest[0].name,
  folder: updatedManifest[0].folder,
  designDetail: updatedManifest[0].designDetail,
  structureType: updatedManifest[0].structureType,
  dimensions: updatedManifest[0].dimensions,
  size: updatedManifest[0].size,
  sheetProjectId: updatedManifest[0].sheetProjectId
}, null, 2));

console.log('\nSample Project 1:', JSON.stringify({
  id: updatedManifest[1].id,
  name: updatedManifest[1].name,
  folder: updatedManifest[1].folder,
  designDetail: updatedManifest[1].designDetail,
  structureType: updatedManifest[1].structureType,
  dimensions: updatedManifest[1].dimensions,
  size: updatedManifest[1].size,
  sheetProjectId: updatedManifest[1].sheetProjectId
}, null, 2));

// Save manifests
const jsonStr = JSON.stringify(updatedManifest, null, 2);
fs.writeFileSync(manifestPath, jsonStr, 'utf8');
console.log(`Written: ${manifestPath}`);

const jsStr = `window.SVVAYAM_CLIENTS_DATA = ${jsonStr};\n`;
fs.writeFileSync(manifestJsPath, jsStr, 'utf8');
console.log(`Written: ${manifestJsPath}`);

if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'clients_manifest.json'), jsonStr, 'utf8');
  fs.writeFileSync(path.join(distDir, 'clients_manifest.js'), jsStr, 'utf8');
  console.log(`Written: ${distDir}/clients_manifest.json and .js`);
}
