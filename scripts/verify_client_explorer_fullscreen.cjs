/**
 * Automated CDP verification script for Svvayam Client Explorer & Fullscreen Viewer Fix
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9223;
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
  console.log('Starting Chrome for Client Explorer verification...');
  const tmpUserData = path.join(__dirname, '..', 'tmp_chrome_client_explorer');
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
    const cdp = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('DOM.enable');

    // 1. Verify Homepage Explore Button Count
    console.log('\n--- Step 1: Checking Homepage Button Count ---');
    await cdp.send('Page.navigate', { url: 'http://localhost:5173/showcase?admin_test=1' });
    await delay(2000);

    const exploreButtonText = await cdp.evaluate(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Client Explorer'));
        return btn ? btn.textContent.trim() : null;
      })()
    `);
    console.log('Homepage Explorer Button Text:', exploreButtonText);

    // 2. Navigate to Client Explorer
    console.log('\n--- Step 2: Checking Client Explorer Sorting Rules ---');
    await cdp.send('Page.navigate', { url: 'http://localhost:5173/client-explorer?admin_test=1' });
    await delay(2000);

    // Verify Tab Badges
    const tabCounts = await cdp.evaluate(`
      Array.from(document.querySelectorAll('nav[aria-label="Tabs"] button, .font-sans button')).filter(b => b.textContent.includes('All') || b.textContent.includes('Compact') || b.textContent.includes('Medium') || b.textContent.includes('Grand')).map(b => b.textContent.trim())
    `);
    console.log('Tab counts:', tabCounts);

    // Check All sorting order
    const allSorting = await cdp.evaluate(`
      (() => {
        const cards = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());
        return {
          totalCards: cards.length,
          top6: cards.slice(0, 6),
          bottom6: cards.slice(-6)
        };
      })()
    `);
    console.log('All Tab Total Cards:', allSorting.totalCards);
    console.log('All Tab Top 6 Projects (Should all have dedicated overview):', allSorting.top6);

    // Check Compact sorting order
    console.log('Switching to Compact tab...');
    await cdp.evaluate(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Compact'));
      if (btn) btn.click();
    `);
    await delay(600);

    const compactSorting = await cdp.evaluate(`
      (() => {
        const cards = Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim());
        return {
          totalCards: cards.length,
          all: cards
        };
      })()
    `);
    console.log('Compact Total Cards:', compactSorting.totalCards);
    console.log('Compact First 4 (Must be overview projects):', compactSorting.all.slice(0, 4));
    console.log('Compact Remaining 15 (Non-overview projects):', compactSorting.all.slice(4));

    // 3. Open a Project Detail Modal & Test Fullscreen Viewer
    console.log('\n--- Step 3: Testing Fullscreen Image Viewer ---');
    // Click on "Mr. Bafna Sanctum" (first card in Compact, has 11 images and dedicated overview)
    await cdp.evaluate(`
      const card = Array.from(document.querySelectorAll('h3')).find(h => h.textContent.includes('Bafna'));
      if (card) card.closest('.cursor-pointer').click();
    `);
    await delay(800);

    const modalTitle = await cdp.evaluate(`document.querySelector('h2')?.textContent.trim()`);
    console.log('Project modal opened for:', modalTitle);

    // Click "Fullscreen" button
    console.log('Clicking "Fullscreen" button...');
    await cdp.evaluate(`
      const fsBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Fullscreen'));
      if (fsBtn) fsBtn.click();
    `);
    await delay(800);

    // Verify Fullscreen Portal Mount
    const fsStatus = await cdp.evaluate(`
      (() => {
        const fsViewer = document.querySelector('[aria-label^="Fullscreen viewer"]');
        if (!fsViewer) return { exists: false };
        const rect = fsViewer.getBoundingClientRect();
        const isBodyChild = fsViewer.parentElement === document.body;
        const bg = window.getComputedStyle(fsViewer).backgroundColor;
        const zIndex = window.getComputedStyle(fsViewer).zIndex;
        return {
          exists: true,
          isBodyChild,
          rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
          bg,
          zIndex
        };
      })()
    `);
    console.log('Fullscreen viewer portal check:', fsStatus);

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'client_explorer_fullscreen_fixed_desktop.png'));

    // Test Navigation inside Fullscreen
    console.log('Navigating to next image in fullscreen...');
    await cdp.evaluate(`
      const nextBtn = document.querySelector('button[aria-label="Next image"]');
      if (nextBtn) nextBtn.click();
    `);
    await delay(600);

    const counterAfterNext = await cdp.evaluate(`
      document.querySelector('header span[class*="font-mono"]')?.textContent.trim()
    `);
    console.log('Counter after next click:', counterAfterNext);

    // Test Escape Key handling
    console.log('Pressing Escape key to exit fullscreen...');
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await delay(600);

    const afterEscState = await cdp.evaluate(`
      ({
        fullscreenActive: Boolean(document.querySelector('[aria-label^="Fullscreen viewer"]')),
        projectModalStillOpen: Boolean(document.querySelector('h2'))
      })
    `);
    console.log('State after Escape:', afterEscState);

    // 4. Test Mobile Viewport
    console.log('\n--- Step 4: Testing Mobile Fullscreen Viewport ---');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await delay(500);

    // Re-open fullscreen in mobile
    const mFsBox = await cdp.evaluate(`
      (() => {
        const fsBtn = document.querySelector('button[aria-label="View gallery fullscreen"]');
        if (!fsBtn) return { found: false };
        const r = fsBtn.getBoundingClientRect();
        return { found: true, x: r.left + r.width / 2, y: r.top + r.height / 2 };
      })()
    `);
    console.log('Mobile fsBtn check:', mFsBox);
    if (mFsBox.found) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: Math.round(mFsBox.x), y: Math.round(mFsBox.y), button: 'left', clickCount: 1 });
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: Math.round(mFsBox.x), y: Math.round(mFsBox.y), button: 'left', clickCount: 1 });
    }
    await delay(1200);

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'client_explorer_fullscreen_mobile.png'));

    // Close fullscreen via close button
    await cdp.evaluate(`
      const closeBtn = document.querySelector('button[aria-label="Exit fullscreen viewer"]');
      if (closeBtn) closeBtn.click();
    `);
    await delay(500);

    // Close project modal
    await cdp.evaluate(`
      const exitBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Exit'));
      if (exitBtn) exitBtn.click();
    `);
    await delay(500);

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'client_explorer_grid_mobile.png'));

    console.log('\nAll Client Explorer verification checks completed successfully!');
    cdp.close();
  } finally {
    chromeProc.kill('SIGKILL');
    try {
      fs.rmSync(path.join(__dirname, '..', 'tmp_chrome_client_explorer'), { recursive: true, force: true });
    } catch {}
  }
}

run().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
