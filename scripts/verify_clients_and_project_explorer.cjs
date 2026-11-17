const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9335;
const PREVIEW_BASE = 'https://live-consultation--preview-p5p3wgtk.web.app';

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

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runVerification() {
  const tmpUserData = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome_verify_'));
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tmpUserData}`,
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
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
    if (!version) throw new Error('Chrome remote debugging did not respond.');

    const targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
    const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('DOM.enable');

    console.log('\n=== STEP 1: Verify Homepage Button Renaming ===');
    await cdp.send('Page.navigate', { url: `${PREVIEW_BASE}/showcase?admin_test=1` });
    await delay(3000);

    const homepageBtn = await cdp.evaluate(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('PROJECT EXPLORER'));
      return btn ? btn.textContent.trim().replace(/\\s+/g, ' ') : null;
    })()`);
    console.log('Homepage button text:', homepageBtn);

    console.log('\n=== STEP 2: Verify /project-explorer Direct Route ===');
    await cdp.send('Page.navigate', { url: `${PREVIEW_BASE}/project-explorer?admin_test=1` });
    await delay(3500);

    const peState = await cdp.evaluate(`(() => {
      const heading = document.querySelector('h1')?.textContent.trim();
      const subtitle = document.querySelector('p')?.textContent.trim();
      const cards = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());
      const tabs = Array.from(document.querySelectorAll('nav button, .font-sans button')).map(b => b.textContent.trim()).filter(t => t.includes('All') || t.includes('Compact'));
      return { heading, subtitle, totalProjects: cards.length, top4: cards.slice(0, 4), tabs };
    })()`);
    console.log('Project Explorer state:', JSON.stringify(peState, null, 2));

    console.log('\n=== STEP 3: Verify /client-explorer Redirect ===');
    await cdp.send('Page.navigate', { url: `${PREVIEW_BASE}/client-explorer?source=test_redirect` });
    await delay(2500);

    const redirectUrl = await cdp.evaluate(`window.location.href`);
    console.log('Redirect target URL:', redirectUrl);

    console.log('\n=== STEP 4: Verify Admin Clients Management Page (/admin/clients) ===');
    // Clear any local cache first in this test context to verify clean fresh-load state
    await cdp.evaluate(`(() => {
      localStorage.removeItem('svvayam_admin_consultations_v1');
      localStorage.removeItem('svvayam_registered_customers_v1');
      localStorage.removeItem('svvayam_deleted_consultation_ids');
    })()`);

    await cdp.send('Page.navigate', { url: `${PREVIEW_BASE}/admin/clients?admin_test=1` });
    await delay(3500);

    const clientsPageState = await cdp.evaluate(`(() => {
      const heading = document.querySelector('h1')?.textContent.trim();
      const tabs = Array.from(document.querySelectorAll('button')).filter(b => b.textContent && (b.textContent.includes('Consultations Table') || b.textContent.includes('Customer Accounts') || b.textContent.includes('Direct Inquiries'))).map(b => b.textContent.trim().replace(/\\s+/g, ' '));
      const emptyMsg = Array.from(document.querySelectorAll('p')).find(p => p.textContent && p.textContent.includes('No clients registered yet'))?.textContent.trim();
      return { heading, tabs, emptyMsg };
    })()`);
    console.log('Clients Management Page state:', JSON.stringify(clientsPageState, null, 2));

    // Check Tab 2 (Customer Accounts) empty state
    console.log('\n=== STEP 5: Verify Customer Accounts Empty State ===');
    await cdp.evaluate(`(() => {
      const custTab = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Customer Accounts'));
      if (custTab) custTab.click();
    })()`);
    await delay(1000);

    const custTabState = await cdp.evaluate(`(() => {
      const emptyMsg = Array.from(document.querySelectorAll('h4, p')).find(el => el.textContent && el.textContent.includes('No clients registered yet'))?.textContent.trim();
      const regBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Register Customer'))?.textContent.trim();
      return { emptyMsg, regBtn };
    })()`);
    console.log('Customer Accounts tab empty state:', JSON.stringify(custTabState, null, 2));

    cdp.close();
  } finally {
    chromeProc.kill();
    try {
      fs.rmSync(tmpUserData, { recursive: true, force: true });
    } catch {}
  }
}

runVerification().catch(console.error);
