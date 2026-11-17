const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function main() {
  const index = await fetchUrl('https://live-consultation.web.app/index.html');
  console.log('Status:', index.statusCode);
  const regex = /<script\s+type="module"\s+crossorigin\s+src="([^"]+)">/g;
  let match;
  const scriptSrcs = [];
  while ((match = regex.exec(index.data)) !== null) {
    scriptSrcs.push(match[1]);
  }
  console.log('Script tags:', scriptSrcs);

  for (const src of scriptSrcs) {
    const fullUrl = src.startsWith('http') ? src : `https://live-consultation.web.app${src.startsWith('/') ? '' : '/'}${src}`;
    console.log('Fetching', fullUrl);
    const scriptRes = await fetchUrl(fullUrl);
    console.log('Size:', scriptRes.data.length);
    console.log('Has Drive ID (1koaMZJizLUmIjonj-Cx3ySB8dHoUci27):', scriptRes.data.includes('1koaMZJizLUmIjonj-Cx3ySB8dHoUci27'));
    console.log('Has Slide 1 of:', scriptRes.data.includes('Slide 1 of'));
    console.log('Has /assets/docs/pages/doc1:', scriptRes.data.includes('assets/docs/pages/doc1'));
  }
}

main().catch(console.error);
