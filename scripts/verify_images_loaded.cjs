const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9227;
const PREVIEW_PORT = 4175;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.on('open', resolve);
      this.ws.on('error', reject);
    });

    this.ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
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
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    return res.result ? res.result.value : null;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function main() {
  console.log('Starting Vite preview on port ' + PREVIEW_PORT + '...');
  const projectRoot = path.resolve(__dirname, '..');
  const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  const previewProc = spawn('node', [viteBin, 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    cwd: projectRoot,
    stdio: 'pipe'
  });

  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${PREVIEW_PORT}/`, (res) => resolve(res.statusCode));
        req.on('error', reject);
      });
      break;
    } catch {
      await delay(500);
    }
  }

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${path.join(projectRoot, 'tmp_chrome_img_check')}`,
    'about:blank'
  ]);

  await delay(2000);
  const targets = await getJson(`http://localhost:${DEBUG_PORT}/json/list`);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
  await cdp.connect();

  await cdp.send('Page.navigate', { url: `http://localhost:${PREVIEW_PORT}/project-explorer?admin_test=1` });
  await delay(4000); // Allow images to load

  const imgReport = await cdp.evaluate(`
    (() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      let loaded = 0;
      let broken = 0;
      const details = [];

      imgs.forEach(img => {
        if (img.naturalWidth > 0) {
          loaded++;
        } else {
          broken++;
          details.push({ src: img.src, alt: img.alt });
        }
      });

      return { total: imgs.length, loaded, broken, details: details.slice(0, 5) };
    })()
  `);

  console.log('\n--- Image Loading Report in Browser ---');
  console.log('Total img elements:', imgReport.total);
  console.log('Successfully loaded images (naturalWidth > 0):', imgReport.loaded);
  console.log('Broken images:', imgReport.broken);
  if (imgReport.broken > 0) {
    console.log('Sample broken images:', imgReport.details);
  }

  cdp.close();
  chromeProc.kill();
  previewProc.kill();
}

main().catch(console.error);
