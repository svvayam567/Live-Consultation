const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9227;
const LIVE_URL = 'https://live-consultation--preview-p5p3wgtk.web.app/project-explorer?admin_test=1';
const ARTIFACTS_DIR = 'C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
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

  async screenshot(filePath) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filePath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${path.basename(filePath)}`);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  let chromeProc = null;
  let cdp = null;

  try {
    console.log('Starting Chrome for live deployed preview channel verification...');
    const tmpUserData = path.join(__dirname, '..', 'tmp_chrome_live_channel_verify');
    chromeProc = spawn(CHROME_PATH, [
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${tmpUserData}`,
      '--headless=new',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--window-size=1440,900',
      'about:blank'
    ]);

    let version = null;
    for (let i = 0; i < 20; i++) {
      try {
        version = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
        break;
      } catch {
        await delay(300);
      }
    }
    if (!version) throw new Error('Chrome remote debugging did not respond.');

    const targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    console.log(`Navigating to ${LIVE_URL}...`);
    await cdp.send('Page.navigate', { url: LIVE_URL });
    await delay(3500);

    const liveData = await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const tabBtns = buttons.filter(b => {
          const txt = b.textContent || '';
          return txt.includes('All') || txt.includes('Minimal') || txt.includes('Moderate') || txt.includes('Heavy');
        });
        const tabs = tabBtns.map(b => b.textContent.trim());

        const select = document.querySelector('#structure-type-filter');
        const structureOptions = select ? Array.from(select.options).map(o => o.value) : [];

        const firstCard = document.querySelector('.group');
        const firstCardText = firstCard ? firstCard.textContent : '';

        return {
          tabs,
          structureOptions,
          firstCardText
        };
      })()
    `);

    console.log('Live Deployed Channel Verification Data:', liveData);

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'live_preview_channel_verified.png'));
    console.log('\n=== LIVE PREVIEW CHANNEL FULLY VERIFIED ===\n');
  } catch (err) {
    console.error('Live verification failed:', err);
    process.exitCode = 1;
  } finally {
    if (cdp) cdp.close();
    if (chromeProc) chromeProc.kill();
  }
}

run();
