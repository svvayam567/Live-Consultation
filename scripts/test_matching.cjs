const fs = require('fs');

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

const csvPath = 'e:/svvayam/svvayam/footage/Svvayam Project Catalog — Master Template - Projects.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split(/\r?\n/).filter(l => l.trim().length > 0);
const headers = parseCSVLine(lines[0]);
console.log('Headers:', headers);

const csvRecords = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  const name = row[0];
  if (!name) continue;
  csvRecords.push({
    customerName: name,
    location: row[1],
    designDetail: row[3],
    structureType: row[4],
    widthFt: row[5],
    depthFt: row[6],
    heightFt: row[7],
    displayPrice: row[8],
    projectId: row[9],
    widthCategory: row[10]
  });
}
console.log('Parsed CSV records count:', csvRecords.length);

const manifestPath = 'E:/svvayam/svvayam/WEb/svvayam-live-consultation/public/assets/clients_manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log('Manifest projects count:', manifest.length);

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.|mr|mrs|ms|dr)\s*/i, '')
    .replace(/\s+(chennai|anantapur|sanctuary|sanctum|thane|temple|pooja\s*room)$/i, '')
    .replace(/[^a-z0-9]/g, '');
}

const matched = [];
const unmatchedManifest = [];

manifest.forEach((proj, idx) => {
  const mNormFolder = normalize(proj.folder);
  const mNormName = normalize(proj.name);
  const mNormId = normalize(proj.id);
  
  const match = csvRecords.find(c => {
    const cNorm = normalize(c.customerName);
    return cNorm === mNormFolder || cNorm === mNormName || cNorm === mNormId ||
      mNormFolder.includes(cNorm) || cNorm.includes(mNormFolder);
  });
  
  if (match) {
    matched.push({ manifestId: proj.id, manifestFolder: proj.folder, manifestName: proj.name, csvName: match.customerName });
  } else {
    unmatchedManifest.push({ idx, id: proj.id, name: proj.name, folder: proj.folder, location: proj.location });
  }
});

console.log('Direct matched count:', matched.length);
console.log('Unmatched manifest count:', unmatchedManifest.length);

if (unmatchedManifest.length > 0) {
  console.log('\nUnmatched manifest items:');
  unmatchedManifest.forEach(u => console.log(` - [${u.id}] folder: "${u.folder}" | name: "${u.name}" | location: "${u.location}"`));

  const matchedCSVNames = new Set(matched.map(m => m.csvName));
  const remainingCSV = csvRecords.filter(c => !matchedCSVNames.has(c.customerName));
  console.log('\nRemaining unmatched CSV items:');
  remainingCSV.forEach(c => console.log(` - "${c.customerName}" | location: "${c.location}" | design: "${c.designDetail}" | type: "${c.structureType}"`));
}
