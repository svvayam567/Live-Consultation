const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9337;
const PREVIEW_BASE = 'https://live-consultation--preview-p5p3wgtk.web.app';

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
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
    await new Promise((r) => this.ws.on('open', r));
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

  close() {
    if (this.ws) this.ws.close();
  }
}

async function auditNetwork() {
  const tmpUserData = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome_audit_'));
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tmpUserData}`,
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    'about:blank'
  ]);

  try {
    let version = null;
    for (let i = 0; i < 30; i++) {
      try {
        version = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
        break;
      } catch {
        await delay(300);
      }
    }
    const targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    const networkRequests = [];
    cdp.ws.on('message', (data) => {
      const msg = JSON.parse(data);
      if (msg.method === 'Network.requestWillBeSent') {
        networkRequests.push(msg.params.request.url);
      }
    });

    await cdp.send('Network.enable');
    await cdp.send('Page.enable');

    const routesToTest = [
      '/',
      '/showcase?admin_test=1',
      '/project-explorer?admin_test=1',
      '/admin/clients?admin_test=1',
      '/admin/consultation?admin_test=1',
      '/admin/register?admin_test=1',
      '/admin/team?admin_test=1'
    ];

    for (const r of routesToTest) {
      console.log('Auditing network traffic on route:', r);
      await cdp.send('Page.navigate', { url: PREVIEW_BASE + r });
      await delay(2500);
    }

    const supabaseCalls = networkRequests.filter((u) => u.toLowerCase().includes('supabase'));
    const firebaseCalls = networkRequests.filter((u) => u.toLowerCase().includes('firebase') || u.toLowerCase().includes('firestore') || u.toLowerCase().includes('googleapis'));

    console.log('\n========================================');
    console.log('--- NETWORK AUDIT VERIFICATION RESULTS ---');
    console.log('========================================');
    console.log(`Total HTTP/HTTPS requests recorded: ${networkRequests.length}`);
    console.log(`Firebase / Google Cloud requests recorded: ${firebaseCalls.length}`);
    console.log(`Supabase requests recorded: ${supabaseCalls.length}`);

    if (supabaseCalls.length > 0) {
      console.log('WARNING - Supabase URLs captured:', supabaseCalls);
    } else {
      console.log('✓ 100% ZERO NETWORK CALLS TO SUPABASE.');
    }

    cdp.close();
  } finally {
    chromeProc.kill();
    try {
      fs.rmSync(tmpUserData, { recursive: true, force: true });
    } catch {}
  }
}

auditNetwork().catch(console.error);
