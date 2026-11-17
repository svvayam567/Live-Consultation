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
const records = lines.slice(1).map(parseCSVLine).filter(r => r[0]);

console.log('Total customer records:', records.length);

const missing = [];
const unusual = [];

records.forEach((r, idx) => {
  const name = r[0];
  const w = r[5]?.trim();
  const d = r[6]?.trim();
  const h = r[7]?.trim();
  const wNum = parseFloat(w);
  const dNum = parseFloat(d);
  const hNum = parseFloat(h);
  
  if (!w || !d || !h) {
    missing.push({ name, w, d, h });
  }
  if (wNum > 30 || dNum > 30 || hNum > 30 || wNum < 1 || (dNum && dNum < 0.2) || hNum < 1) {
    unusual.push({ name, w, d, h });
  }
});

console.log('Missing dimensions count:', missing.length);
if (missing.length > 0) {
  console.log('Missing dimensions:', missing);
}

console.log('Unusual measurements count:', unusual.length);
if (unusual.length > 0) {
  console.log('Unusual measurements:', unusual);
}
