const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9228;
const PREVIEW_PORT = 4177;

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) { this.wsUrl = wsUrl; this.id = 1; this.callbacks = new Map(); }
  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise(r => this.ws.on('open', r));
    this.ws.on('message', data => {
      const msg = JSON.parse(data);
      if (msg.id && this.callbacks.has(msg.id)) {
        this.callbacks.get(msg.id).resolve(msg.result);
        this.callbacks.delete(msg.id);
      }
    });
  }
  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  }
  close() { if (this.ws) this.ws.close(); }
}

async function test() {
  const previewProc = spawn('node', ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], { stdio: 'pipe' });
  await delay(2000);
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${path.join(__dirname, 'tmp_chrome_scroll_test')}`,
    'about:blank'
  ]);
  await delay(2000);
  const targets = await getJson(`http://localhost:${DEBUG_PORT}/json/list`);
  const cdp = new CDPClient(targets[0].webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  await cdp.send('Page.navigate', { url: `http://localhost:${PREVIEW_PORT}/project-explorer?admin_test=1` });
  await delay(3000);

  // Scroll down to force all lazy images to load
  await cdp.evaluate(`
    (async () => {
      for (let i = 0; i < 25; i++) {
        window.scrollBy(0, 1000);
        await new Promise(r => setTimeout(r, 150));
      }
    })()
  `);
  await delay(3000);

  const report = await cdp.evaluate(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img')).filter(i => i.src.includes('/assets/clients/'));
      const loaded = imgs.filter(i => i.naturalWidth > 0).length;
      const failed = imgs.filter(i => i.style.display === 'none').length;
      return { total: imgs.length, loaded, failed };
    })()
  `);
  console.log('Scroll Result:', report);

  cdp.close();
  chromeProc.kill();
  previewProc.kill();
}
test().catch(console.error);
