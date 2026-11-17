const https = require('https');
const fs = require('fs');

// Google Drive direct download URL for public files
const fileId = '16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2';
const downloadUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return resolve({ statusCode: res.statusCode });
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve({ statusCode: 200, path: dest }));
      });
    }).on('error', reject);
  });
}

async function check() {
  const dest = 'C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\deck4.pdf';
  console.log('Downloading Deck 4...');
  const res = await download(downloadUrl, dest);
  console.log('Download result:', res);
  if (fs.existsSync(dest)) {
    const stat = fs.statSync(dest);
    console.log('File size:', stat.size);
    // Simple PDF page count count of '/Type /Page' or '/Type/Page'
    const buf = fs.readFileSync(dest);
    const content = buf.toString('latin1');
    const matches = content.match(/\/Type\s*\/Page\b/g);
    console.log('Page matches:', matches ? matches.length : 0);
  }
}

check().catch(console.error);
