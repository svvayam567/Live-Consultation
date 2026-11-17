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
const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);

const csvRecords = [];
for (let i = 1; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  const name = row[0];
  if (!name) continue;
  csvRecords.push({
    index: i,
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

const manifestPath = 'E:/svvayam/svvayam/WEb/svvayam-live-consultation/public/assets/clients_manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Explicit known alias map: normalized manifest key -> CSV customer name exact
const explicitAliases = {
  'yashaswini': 'Ms. Yasashwini',
  'msyashaswini': 'Ms. Yasashwini',
  'manasakuncham': 'Ms. Manasa Kunchum',
  'rajkumarsubramanian': 'Mr. Rakjkumar Subramanian',
  'atulmehotra': 'Mr. Athul Mehrotra',
  'mehrotra': 'Mr. Athul Mehrotra'
};

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.|mr|mrs|ms|dr)\s*/i, '')
    .replace(/\s+(chennai|anantapur|sanctuary|sanctum|thane|temple|pooja\s*room|mandir)$/i, '')
    .replace(/[^a-z0-9]/g, '');
}

console.log('--- EXACT 1-TO-1 MATCH AUDIT ---');

const assignedCSV = new Set();
const mapping = [];

manifest.forEach((proj, idx) => {
  const normFolder = normalize(proj.folder);
  const normName = normalize(proj.name);
  const normId = normalize(proj.id);
  
  let match = null;

  // 1. Check explicit alias
  const aliasName = explicitAliases[normFolder] || explicitAliases[normName] || explicitAliases[normId];
  if (aliasName) {
    match = csvRecords.find(c => c.customerName === aliasName && !assignedCSV.has(c.customerName));
  }

  // 2. Exact normalized equality
  if (!match) {
    match = csvRecords.find(c => {
      if (assignedCSV.has(c.customerName)) return false;
      const cNorm = normalize(c.customerName);
      return cNorm === normFolder || cNorm === normName || cNorm === normId;
    });
  }

  // 3. Location-assisted matching
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
    mapping.push({
      manifestIndex: idx,
      manifestId: proj.id,
      manifestFolder: proj.folder,
      manifestName: proj.name,
      manifestLocation: proj.location,
      csvCustomerName: match.customerName,
      csvLocation: match.location,
      designDetail: match.designDetail,
      structureType: match.structureType,
      widthFt: match.widthFt,
      depthFt: match.depthFt,
      heightFt: match.heightFt,
      projectId: match.projectId
    });
  } else {
    mapping.push({
      manifestIndex: idx,
      manifestId: proj.id,
      manifestFolder: proj.folder,
      manifestName: proj.name,
      manifestLocation: proj.location,
      UNMATCHED: true
    });
  }
});

const matchedCount = mapping.filter(m => !m.UNMATCHED).length;
const unmatchedManifest = mapping.filter(m => m.UNMATCHED);
const remainingCSV = csvRecords.filter(c => !assignedCSV.has(c.customerName));

console.log(`Matched: ${matchedCount} / ${manifest.length}`);
console.log(`Unmatched Manifest: ${unmatchedManifest.length}`);
console.log(`Unassigned CSV: ${remainingCSV.length}`);

if (unmatchedManifest.length > 0) {
  console.log('\nUnmatched Manifest:', unmatchedManifest);
  console.log('\nUnassigned CSV:', remainingCSV);
}
