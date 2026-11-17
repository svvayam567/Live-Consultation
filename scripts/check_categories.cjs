const fs = require('fs');

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') { cur += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else { cur += c; }
  }
  result.push(cur.trim());
  return result;
}

const csvPath = 'e:/svvayam/svvayam/footage/Svvayam Project Catalog — Master Template - Projects.csv';
const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);
const records = lines.slice(1).map(parseCSVLine).filter(r => r[0]);

const designCounts = {};
const structureCounts = {};

records.forEach(r => {
  const design = r[3]?.trim() || '(empty)';
  const structure = r[4]?.trim() || '(empty)';
  designCounts[design] = (designCounts[design] || 0) + 1;
  structureCounts[structure] = (structureCounts[structure] || 0) + 1;
});

console.log('Design detail counts:', designCounts);
console.log('Structure type counts:', structureCounts);
