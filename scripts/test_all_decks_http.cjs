const https = require('https');

const decks = [
  {
    name: 'Deck 1 — Render & Executed Showcase Deck',
    embed: 'https://drive.google.com/file/d/1koaMZJizLUmIjonj-Cx3ySB8dHoUci27/preview',
    open: 'https://drive.google.com/file/d/1koaMZJizLUmIjonj-Cx3ySB8dHoUci27/view?usp=sharing',
    id: '1koaMZJizLUmIjonj-Cx3ySB8dHoUci27'
  },
  {
    name: 'Deck 2 — From Imagination to Installation',
    embed: 'https://drive.google.com/file/d/106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw/preview',
    open: 'https://drive.google.com/file/d/106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw/view?usp=drive_link',
    id: '106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw'
  },
  {
    name: 'Deck 3 — Stone Temple Collection',
    embed: 'https://drive.google.com/file/d/1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo/preview',
    open: 'https://drive.google.com/file/d/1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo/view?usp=drive_link',
    id: '1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo'
  },
  {
    name: 'Deck 4',
    embed: 'https://drive.google.com/file/d/16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2/preview',
    open: 'https://drive.google.com/file/d/16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2/view?usp=drive_link',
    id: '16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2'
  }
];

function fetch(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => {
        if (data.length < 200000) data += chunk; // capture first 200KB
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });
    req.on('error', (err) => resolve({ error: err.message }));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ error: 'timeout' });
    });
  });
}

async function run() {
  for (const d of decks) {
    console.log(`\n==================================================`);
    console.log(`Testing: ${d.name}`);
    console.log(`Embed: ${d.embed}`);
    console.log(`Open:  ${d.open}`);

    const resEmbed = await fetch(d.embed);
    console.log(`Embed Status: ${resEmbed.statusCode}`);
    if (resEmbed.data) {
      const titleMatch = resEmbed.data.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'No title';
      console.log(`Embed Title: ${title}`);
      const isSignIn = resEmbed.data.includes('ServiceLogin') && (resEmbed.data.includes('Sign in - Google Accounts') || resEmbed.statusCode === 302);
      const isDenied = resEmbed.data.includes('You need access') || resEmbed.data.includes('Request access') || resEmbed.data.includes('Access denied');
      console.log(`Embed Sign In required: ${isSignIn}`);
      console.log(`Embed Access Denied: ${isDenied}`);
      console.log(`Embed Body Size: ${resEmbed.data.length} bytes`);
    }

    const resOpen = await fetch(d.open);
    console.log(`Open Status: ${resOpen.statusCode}`);
    if (resOpen.headers && resOpen.headers.location) {
      console.log(`Open Redirect: ${resOpen.headers.location}`);
    }
    if (resOpen.data) {
      const titleMatch = resOpen.data.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : 'No title';
      console.log(`Open Title: ${title}`);
      const isDenied = resOpen.data.includes('You need access') || resOpen.data.includes('Request access') || resOpen.data.includes('Access denied');
      console.log(`Open Access Denied: ${isDenied}`);
    }
  }
}

run();
