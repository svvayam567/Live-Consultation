const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\tmp_chrome_viewer_audit';

const decksToTest = [
  { id: 'Deck 1', url: 'https://drive.google.com/file/d/1koaMZJizLUmIjonj-Cx3ySB8dHoUci27/preview', openUrl: 'https://drive.google.com/file/d/1koaMZJizLUmIjonj-Cx3ySB8dHoUci27/view?usp=sharing' },
  { id: 'Deck 2', url: 'https://drive.google.com/file/d/106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw/preview', openUrl: 'https://drive.google.com/file/d/106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw/view?usp=drive_link' },
  { id: 'Deck 3', url: 'https://drive.google.com/file/d/1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo/preview', openUrl: 'https://drive.google.com/file/d/1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo/view?usp=drive_link' },
  { id: 'Deck 4', url: 'https://drive.google.com/file/d/16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2/preview', openUrl: 'https://drive.google.com/file/d/16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2/view?usp=drive_link' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  // Wipe userDataDir to guarantee zero logged-in cookies
  if (fs.existsSync(userDataDir)) {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }

  const chrome = spawn(chromePath, [
    '--remote-debugging-port=9224',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const listRes = await fetchJson('http://127.0.0.1:9224/json/list');
  const wsUrl = listRes[0].webSocketDebuggerUrl;

  const WebSocket = require('ws');
  const ws = new WebSocket(wsUrl);

  let idCounter = 1;
  const pending = new Map();

  ws.on('message', (data) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(r => ws.on('open', r));
  await send('Page.enable');

  const results = [];

  for (const deck of decksToTest) {
    console.log(`\nTesting ${deck.id} at ${deck.url}...`);
    await send('Page.navigate', { url: deck.url });
    // Wait 5 seconds for Drive Viewer JS and render to complete
    await new Promise(r => setTimeout(r, 6000));

    const check = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const bodyText = document.body.innerText || '';
          const title = document.title || '';
          const needsPermission = bodyText.includes('You need permission') || 
                                  bodyText.includes('You need access') || 
                                  bodyText.includes('Request access') || 
                                  bodyText.includes('Access denied');
          const isNotFound = bodyText.includes('The file does not exist') || bodyText.includes('File not found');
          const hasDriveViewer = !!document.querySelector('.ndfHFb-c4YZDc-Wrql6b') || 
                                !!document.querySelector('canvas') || 
                                !!document.querySelector('svg') || 
                                !!document.querySelector('.drive-viewer-page') ||
                                !!document.querySelector('.ndfHFb-c4YZDc-sKfxWe');
          // Look for page count if shown
          const pageCountMatch = bodyText.match(/(\d+)\s+of\s+(\d+)/i) || bodyText.match(/\/ (\d+)/);
          return {
            title,
            needsPermission,
            isNotFound,
            hasDriveViewer,
            bodySnippet: bodyText.slice(0, 200).replace(/\\s+/g, ' '),
            pageCountMatch: pageCountMatch ? pageCountMatch[0] : null
          };
        })()
      `,
      returnByValue: true
    });

    console.log(`${deck.id} result:`, check.result.value);

    // Capture screenshot
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const screenPath = `C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\deck_audit_${deck.id.replace(' ', '_').toLowerCase()}.png`;
    fs.writeFileSync(screenPath, Buffer.from(screenshot.data, 'base64'));
    console.log(`Saved screenshot to: ${screenPath}`);

    results.push({ ...deck, ...check.result.value });
  }

  ws.close();
  chrome.kill();
  console.log('\n=== FINAL AUDIT RESULTS ===\n', JSON.stringify(results, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
