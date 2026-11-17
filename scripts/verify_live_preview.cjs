const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9334;

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
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description || '').join(' ');
        console.log('[PAGE CONSOLE]', text);
      }
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

async function verifyLive() {
  const tmpUserData = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome_live_'));
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

    console.log('\n--- Checking Deployed Homepage Button (/showcase?admin_test=1) ---');
    await cdp.send('Page.navigate', { url: 'https://live-consultation--preview-p5p3wgtk.web.app/showcase?admin_test=1' });
    await delay(3000);

    const btnText = await cdp.evaluate(`(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Client Explorer'));
      return btn ? btn.textContent.trim().replace(/\\s+/g, ' ') : 'NOT_FOUND';
    })()`);
    console.log('Homepage button text:', btnText);

    console.log('\n--- Checking Deployed Client Explorer (/client-explorer?admin_test=1) ---');
    await cdp.send('Page.navigate', { url: 'https://live-consultation--preview-p5p3wgtk.web.app/client-explorer?admin_test=1' });
    await delay(3000);

    const tabCounts = await cdp.evaluate(`
      Array.from(document.querySelectorAll('nav[aria-label="Tabs"] button, .font-sans button')).filter(b => b.textContent.includes('All') || b.textContent.includes('Compact') || b.textContent.includes('Medium') || b.textContent.includes('Grand')).map(b => b.textContent.trim())
    `);
    console.log('Tab badges:', tabCounts);

    const allSorting = await cdp.evaluate(`
      (() => {
        const cards = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());
        return {
          totalCards: cards.length,
          top6: cards.slice(0, 6)
        };
      })()
    `);
    console.log('All tab card count:', allSorting.totalCards);
    console.log('All tab top 6 projects:', allSorting.top6);

    // Switch to Compact tab
    await cdp.evaluate(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Compact'));
      if (btn) btn.click();
    `);
    await delay(600);

    const compactFirst4 = await cdp.evaluate(`
      Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim()).slice(0, 4)
    `);
    console.log('Compact top 4 projects:', compactFirst4);

    // Open first card (Mr. Bafna Sanctum)
    console.log('\n--- Checking Fullscreen Modal on Deployed Preview ---');
    await cdp.evaluate(`
      const card = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Bafna'));
      if (card) {
        const clickable = card.closest('div.group') || card.closest('.cursor-pointer') || card;
        clickable.click();
      }
    `);
    await delay(1200);

    const modalTitle = await cdp.evaluate(`document.querySelector('h2')?.textContent.trim()`);
    console.log('Project modal opened for:', modalTitle);

    const fsClicked = await cdp.evaluate(`
      (() => {
        const fsBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Fullscreen'));
        if (fsBtn) {
          fsBtn.click();
          return true;
        }
        return false;
      })()
    `);
    console.log('Clicked Fullscreen button:', fsClicked);
    await delay(1200);

    const fsState = await cdp.evaluate(`(() => {
      const portal = document.querySelector('[aria-label^="Fullscreen viewer"]');
      if (!portal) return null;
      const img = portal.querySelector('img');
      const cs = window.getComputedStyle(portal);
      return {
        hasPortal: true,
        isBodyChild: portal.parentElement === document.body,
        bgColor: cs.backgroundColor,
        zIndex: cs.zIndex,
        imgVisible: !!img,
        imgSrc: img ? img.src : null,
        counter: portal.querySelector('span[class*="font-mono"]')?.textContent.trim() || null
      };
    })()`);
    console.log('Fullscreen portal verification on live preview:', JSON.stringify(fsState, null, 2));

    cdp.close();
  } finally {
    chromeProc.kill();
    try {
      fs.rmSync(tmpUserData, { recursive: true, force: true });
    } catch {}
  }
}

verifyLive().catch(console.error);
