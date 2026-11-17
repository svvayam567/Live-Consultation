const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const file of files) {
  const code = fs.readFileSync('dist/assets/' + file, 'utf8');
  if (code.includes('AIzaSyCSYH6_y5RggSPppyGZqR5QLGXIGEm7VSo')) {
    console.log('✓ Found API Key in dist/assets/' + file);
  }
  if (code.includes('live-consultation.firebaseapp.com')) {
    console.log('✓ Found authDomain in dist/assets/' + file);
  }
  if (code.includes('live-consultation')) {
    console.log('✓ Found projectId in dist/assets/' + file);
  }
}
