/**
 * Automated CDP verification script for Svvayam Visual Explore Redesign
 */
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;
const TARGET_URL = 'http://localhost:5173/showcase?admin_test=1';
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
  console.log('Starting Chrome for visual verification...');
  const tmpUserData = path.join(__dirname, '..', 'tmp_chrome_visual_explore');
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
    // Wait for CDP to be ready
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

    console.log('Setting localStorage auth state for Super Admin...');
    await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
    await delay(1200);

    await cdp.evaluate(`
      localStorage.setItem('svvayam_auth_profile_v1', JSON.stringify({
        id: 'QCuAQI1tEHVGdeckDJjiJg25B8s2',
        email: 'marketing@svvayam.com',
        role: 'super_admin',
        name: 'Super Admin',
        is_active: true
      }));
    `);

    console.log('Navigating to /showcase?admin_test=1...');
    await cdp.send('Page.navigate', { url: TARGET_URL });
    await delay(2500);

    const currentUrl = await cdp.evaluate('window.location.href');
    console.log('Current URL in Chrome:', currentUrl);
    const bodyText = await cdp.evaluate('document.body.innerText');
    console.log('Body Text snippet:', bodyText.substring(0, 300));

    // Verify Visual Explore button presence
    const btnText = await cdp.evaluate(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Visual Explore'));
      btn ? btn.textContent.trim() : null;
    `);
    console.log('Found button:', btnText);

    // Click "Visual Explore (6 Videos)" using real CDP mouse events
    console.log('Clicking "Visual Explore (6 Videos)" button via CDP mouse events...');
    const box = await cdp.evaluate(`
      (() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Visual Explore'));
        if (btn) {
          const r = btn.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
        return null;
      })()
    `);
    console.log('Button coordinates:', box);

    if (box) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: Math.round(box.x), y: Math.round(box.y), button: 'left', clickCount: 1 });
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: Math.round(box.x), y: Math.round(box.y), button: 'left', clickCount: 1 });
    } else {
      await cdp.evaluate(`
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Visual Explore'));
        if (btn) btn.click();
      `);
    }
    await delay(1500);

    const dialogPresent = await cdp.evaluate('Boolean(document.querySelector(\'[role="dialog"]\'))');
    console.log('Is dialog present after click:', dialogPresent);

    // Capture Collage Gallery
    console.log('Capturing Collage Gallery (All Categories)...');
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_collage_desktop.png'));

    // Check categories and counts
    const catCounts = await cdp.evaluate(`
      Array.from(document.querySelectorAll('nav[aria-label="Video Categories"] button')).map(b => b.textContent.trim());
    `);
    console.log('Categories rendered:', catCounts);

    // Test category filter: Artisans
    console.log('Filtering by Artisans category...');
    await cdp.evaluate(`
      const catBtn = Array.from(document.querySelectorAll('nav[aria-label="Video Categories"] button')).find(b => b.textContent.includes('Artisans'));
      if (catBtn) catBtn.click();
    `);
    await delay(600);
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_artisans_filter.png'));

    // Switch back to All Categories
    await cdp.evaluate(`
      const allBtn = Array.from(document.querySelectorAll('nav[aria-label="Video Categories"] button')).find(b => b.textContent.includes('All Categories'));
      if (allBtn) allBtn.click();
    `);
    await delay(600);

    // Open first video: Factory Video
    console.log('Clicking first video tile (Factory Video)...');
    await cdp.evaluate(`
      const firstTile = document.querySelector('[role="button"][aria-label*="Factory Video"]');
      if (firstTile) firstTile.click();
    `);
    await delay(1000);

    // Check player top bar
    const playerInfo = await cdp.evaluate(`
      const header = document.querySelector('header');
      ({
        heading: document.querySelector('header h2')?.textContent,
        counter: Array.from(document.querySelectorAll('header span')).find(s => s.textContent.includes('/'))?.textContent,
        category: Array.from(document.querySelectorAll('header span')).find(s => s.textContent.includes('Factory'))?.textContent
      })
    `);
    console.log('Player Info:', playerInfo);
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_player_landscape.png'));

    // Test "About" drawer toggle
    console.log('Toggling About drawer in player...');
    await cdp.evaluate(`
      const aboutBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('About'));
      if (aboutBtn) aboutBtn.click();
    `);
    await delay(500);
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_player_about.png'));

    // Advance to next video (slide 2)
    console.log('Clicking Right Arrow (Next video)...');
    await cdp.evaluate(`
      const nextBtn = document.querySelector('button[aria-label="Play next video"]');
      if (nextBtn) nextBtn.click();
    `);
    await delay(1000);

    const slide2Counter = await cdp.evaluate(`
      Array.from(document.querySelectorAll('header span')).find(s => s.textContent.includes('/'))?.textContent
    `);
    console.log('Slide 2 Counter:', slide2Counter);

    // Advance to slide 3 (Artisans 1 - Portrait)
    console.log('Clicking Right Arrow to portrait short (slide 3)...');
    await cdp.evaluate(`
      const nextBtn = document.querySelector('button[aria-label="Play next video"]');
      if (nextBtn) nextBtn.click();
    `);
    await delay(1000);

    const slide3Title = await cdp.evaluate(`document.querySelector('header h2')?.textContent`);
    console.log('Slide 3 Title:', slide3Title);
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_player_portrait.png'));

    // Test Keyboard navigation (ArrowLeft)
    console.log('Testing ArrowLeft keyboard navigation back to slide 2...');
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 });
    await delay(800);

    const backToSlide2 = await cdp.evaluate(`
      Array.from(document.querySelectorAll('header span')).find(s => s.textContent.includes('/'))?.textContent
    `);
    console.log('Back to slide counter:', backToSlide2);

    // Test Escape key to return to collage
    console.log('Testing Escape key to return to collage...');
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
    await delay(600);

    const collageCheck = await cdp.evaluate(`
      Boolean(document.querySelector('h1')?.textContent.includes('Visual Explore'))
    `);
    console.log('Returned to collage:', collageCheck);

    // Test Mobile Viewport
    console.log('Testing mobile viewport (390 x 844)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await delay(600);
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_collage_mobile.png'));

    // Open video on mobile using CDP mouse events
    console.log('Opening video on mobile...');
    const mBox = await cdp.evaluate(`
      (() => {
        const tile = document.querySelector('[role="button"][aria-label*="Factory Video"]');
        if (tile) {
          const r = tile.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        }
        return null;
      })()
    `);
    if (mBox) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: Math.round(mBox.x), y: Math.round(mBox.y), button: 'left', clickCount: 1 });
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: Math.round(mBox.x), y: Math.round(mBox.y), button: 'left', clickCount: 1 });
    }
    await delay(1200);
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_player_mobile.png'));

    // Open portrait short directly in player
    console.log('Testing portrait short in player...');
    await cdp.evaluate(`
      const backBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Back to Gallery'));
      if (backBtn) backBtn.click();
    `);
    await delay(600);

    // Switch to desktop viewport
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await delay(500);

    // Click Artisans filter and open Artisan 1
    await cdp.evaluate(`
      const artBtn = Array.from(document.querySelectorAll('nav[aria-label="Video Categories"] button')).find(b => b.textContent.includes('Artisans'));
      if (artBtn) artBtn.click();
    `);
    await delay(600);

    await cdp.evaluate(`
      const firstArtisan = document.querySelector('[role="button"][aria-label*="Artisan Master Carving"]');
      if (firstArtisan) firstArtisan.click();
    `);
    await delay(1200);

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'visual_explore_player_portrait_short.png'));
    console.log('Saved portrait short screenshot!');
    cdp.close();
  } finally {
    chromeProc.kill('SIGKILL');
    try {
      fs.rmSync(path.join(__dirname, '..', 'tmp_chrome_visual_explore'), { recursive: true, force: true });
    } catch {}
  }
}

run().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
