const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\tmp_chrome_live_check';

async function main() {
  const chrome = spawn(chromePath, [
    '--remote-debugging-port=9223',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const listRes = await fetchJson('http://127.0.0.1:9223/json/list');
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
  await send('Page.navigate', { url: 'https://live-consultation.web.app' });
  await new Promise(r => setTimeout(r, 5000));

  // Find and click "Presentations & Decks" button
  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Presentations & Decks'));
        if (btn) {
          btn.click();
          return { clicked: true, text: btn.textContent };
        }
        return { clicked: false, available: buttons.map(b => b.textContent.trim()).filter(Boolean) };
      })()
    `,
    returnByValue: true
  });
  console.log('Click result:', evalRes.result.value);

  await new Promise(r => setTimeout(r, 6000));

  // Check what is in the modal
  const modalInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const iframes = Array.from(document.querySelectorAll('iframe'));
        const imgs = Array.from(document.querySelectorAll('img'));
        return {
          iframeCount: iframes.length,
          iframeSrc: iframes.map(f => f.src),
          brokenImgs: imgs.filter(i => i.naturalWidth === 0).map(i => i.src || i.alt),
          modalHeading: document.querySelector('h3') ? document.querySelector('h3').textContent : null,
          bodyTextSnippet: document.body.innerText.slice(0, 300)
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Modal check on live site:', modalInfo.result.value);

  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  const outPath = 'C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\live_site_modal_check.png';
  fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
  console.log('Saved screenshot to:', outPath);

  ws.close();
  chrome.kill();
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
