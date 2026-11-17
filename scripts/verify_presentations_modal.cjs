const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9225;
const PREVIEW_PORT = 4173;
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
    if (res.exceptionDetails) {
      console.error('CDP evaluate error:', res.exceptionDetails);
    }
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

async function startVitePreview() {
  console.log('Starting Vite preview server on port ' + PREVIEW_PORT + '...');
  const projectRoot = path.resolve(__dirname, '..');
  const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');
  const proc = spawn('node', [viteBin, 'preview', '--port', String(PREVIEW_PORT), '--strictPort'], {
    cwd: projectRoot,
    stdio: 'pipe'
  });

  proc.stdout.on('data', (d) => process.stdout.write(`[Vite Preview] ${d}`));
  proc.stderr.on('data', (d) => process.stderr.write(`[Vite Preview Err] ${d}`));

  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${PREVIEW_PORT}`, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error('Status ' + res.statusCode));
        });
        req.on('error', reject);
      });
      console.log('Vite preview is ready!');
      return proc;
    } catch {
      await delay(400);
    }
  }
  throw new Error('Timed out waiting for Vite preview server.');
}

async function run() {
  let previewProc = null;
  let chromeProc = null;
  let cdp = null;

  try {
    previewProc = await startVitePreview();

    console.log('Starting Chrome for presentation decks verification...');
    const tmpUserData = path.join(__dirname, '..', 'tmp_chrome_presentations_verify');
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

    console.log('Navigating to http://localhost:' + PREVIEW_PORT + '/showcase?admin_test=1...');
    await cdp.send('Page.navigate', { url: `http://localhost:${PREVIEW_PORT}/showcase?admin_test=1` });
    await delay(2500);

    // Look for button to open Presentations & Decks
    console.log('Checking Presentations button...');
    const btnExists = await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const docBtn = buttons.find(b => b.textContent && b.textContent.includes('Presentations & Decks'));
        if (docBtn) {
          docBtn.click();
          return true;
        }
        return false;
      })()
    `);
    console.log('Clicked Presentations & Decks button:', btnExists);
    if (!btnExists) {
      throw new Error('Presentations & Decks button not found on landing page!');
    }

    console.log('Waiting 4.5s for Google Drive iframe to finish initial load...');
    await delay(4500);

    // Check Deck 1
    console.log('Verifying Deck 1...');
    const deck1State = await cdp.evaluate(`
      (() => {
        const titleEl = document.querySelector('h3');
        const iframeEl = document.querySelector('iframe');
        const externalLinkEl = document.querySelector('a[title*="Google Drive"]');
        const imgElements = Array.from(document.querySelectorAll('img')).filter(img => img.alt && (img.alt.includes('Slide') || img.alt.includes('Thumb')));
        const spans = Array.from(document.querySelectorAll('header span'));
        const badge = spans.find(s => s.textContent && s.textContent.includes('Decks'));
        return {
          title: titleEl ? titleEl.textContent : null,
          iframeSrc: iframeEl ? iframeEl.src : null,
          externalLink: externalLinkEl ? externalLinkEl.href : null,
          brokenImgCount: imgElements.length,
          badge: badge ? badge.textContent.trim() : null
        };
      })()
    `);

    console.log('Deck 1 State:', deck1State);
    if (!deck1State.iframeSrc || !deck1State.iframeSrc.includes('1koaMZJizLUmIjonj-Cx3ySB8dHoUci27')) {
      throw new Error('Deck 1 iframe URL mismatch! Expected 1koaMZJizLUmIjonj-Cx3ySB8dHoUci27, got ' + deck1State.iframeSrc);
    }
    if (!deck1State.externalLink || !deck1State.externalLink.includes('view?usp=sharing')) {
      throw new Error('Deck 1 external link mismatch! Expected view?usp=sharing, got ' + deck1State.externalLink);
    }
    if (deck1State.brokenImgCount > 0) {
      throw new Error('Found legacy broken image elements! Count: ' + deck1State.brokenImgCount);
    }
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'presentation_deck_1_verified.png'));

    // Switch to Deck 2
    console.log('Switching to Deck 2...');
    await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const d2Btn = buttons.find(b => b.textContent && b.textContent.includes('Deck 2'));
        if (d2Btn) d2Btn.click();
      })()
    `);
    await delay(3000);

    const deck2State = await cdp.evaluate(`
      (() => {
        const titleEl = document.querySelector('h3');
        const iframeEl = document.querySelector('iframe');
        const externalLinkEl = document.querySelector('a[title*="Google Drive"]');
        return {
          title: titleEl ? titleEl.textContent : null,
          iframeSrc: iframeEl ? iframeEl.src : null,
          externalLink: externalLinkEl ? externalLinkEl.href : null
        };
      })()
    `);
    console.log('Deck 2 State:', deck2State);
    if (!deck2State.iframeSrc || !deck2State.iframeSrc.includes('106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw')) {
      throw new Error('Deck 2 iframe URL mismatch! Expected 106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw, got ' + deck2State.iframeSrc);
    }
    if (!deck2State.externalLink || !deck2State.externalLink.includes('106m5Ea_81vYyPCzqBTZtD2fNRtSSE-pw')) {
      throw new Error('Deck 2 external link mismatch! Got ' + deck2State.externalLink);
    }
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'presentation_deck_2_verified.png'));

    // Switch to Deck 3
    console.log('Switching to Deck 3...');
    await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const d3Btn = buttons.find(b => b.textContent && b.textContent.includes('Deck 3'));
        if (d3Btn) d3Btn.click();
      })()
    `);
    await delay(3000);

    const deck3State = await cdp.evaluate(`
      (() => {
        const titleEl = document.querySelector('h3');
        const iframeEl = document.querySelector('iframe');
        const externalLinkEl = document.querySelector('a[title*="Google Drive"]');
        return {
          title: titleEl ? titleEl.textContent : null,
          iframeSrc: iframeEl ? iframeEl.src : null,
          externalLink: externalLinkEl ? externalLinkEl.href : null
        };
      })()
    `);
    console.log('Deck 3 State:', deck3State);
    if (!deck3State.iframeSrc || !deck3State.iframeSrc.includes('1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo')) {
      throw new Error('Deck 3 iframe URL mismatch! Expected 1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo, got ' + deck3State.iframeSrc);
    }
    if (!deck3State.externalLink || !deck3State.externalLink.includes('1xuTP5e70Y-Fik5dpbEWUhnRfEstVC6Mo')) {
      throw new Error('Deck 3 external link mismatch! Got ' + deck3State.externalLink);
    }
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'presentation_deck_3_verified.png'));

    // Switch to Deck 4
    console.log('Switching to Deck 4...');
    await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const d4Btn = buttons.find(b => b.textContent && b.textContent.includes('Deck 4'));
        if (d4Btn) d4Btn.click();
      })()
    `);
    await delay(3000);

    const deck4State = await cdp.evaluate(`
      (() => {
        const titleEl = document.querySelector('h3');
        const iframeEl = document.querySelector('iframe');
        const externalLinkEl = document.querySelector('a[title*="Google Drive"]');
        return {
          title: titleEl ? titleEl.textContent : null,
          iframeSrc: iframeEl ? iframeEl.src : null,
          externalLink: externalLinkEl ? externalLinkEl.href : null
        };
      })()
    `);
    console.log('Deck 4 State:', deck4State);
    if (!deck4State.iframeSrc || !deck4State.iframeSrc.includes('16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2')) {
      throw new Error('Deck 4 iframe URL mismatch! Expected 16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2, got ' + deck4State.iframeSrc);
    }
    if (!deck4State.externalLink || !deck4State.externalLink.includes('16vfqQdAUvbDEy1ZPMbrgHWfzJPmvMJb2')) {
      throw new Error('Deck 4 external link mismatch! Got ' + deck4State.externalLink);
    }
    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'presentation_deck_4_verified.png'));

    // Test Keyboard navigation 1 -> Deck 1
    console.log('Testing keyboard shortcut 1...');
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: '1', text: '1' });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: '1' });
    await delay(1000);
    const key1Title = await cdp.evaluate(`document.querySelector('h3') ? document.querySelector('h3').textContent : null`);
    console.log('Active title after pressing 1:', key1Title);
    if (!key1Title || !key1Title.includes('Deck 1')) {
      throw new Error('Keyboard shortcut 1 failed! Expected Deck 1, got ' + key1Title);
    }

    // Test Keyboard navigation 4 -> Deck 4
    console.log('Testing keyboard shortcut 4...');
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: '4', text: '4' });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: '4' });
    await delay(1000);
    const key4Title = await cdp.evaluate(`document.querySelector('h3') ? document.querySelector('h3').textContent : null`);
    console.log('Active title after pressing 4:', key4Title);
    if (!key4Title || !key4Title.includes('Deck 4')) {
      throw new Error('Keyboard shortcut 4 failed! Expected Deck 4, got ' + key4Title);
    }

    // Test close button
    console.log('Testing close button...');
    await cdp.evaluate(`
      (() => {
        const closeBtn = document.querySelector('button[aria-label="Close presentations"]');
        if (closeBtn) closeBtn.click();
      })()
    `);
    await delay(600);

    const isClosed = await cdp.evaluate(`
      (() => {
        return document.querySelector('iframe') === null;
      })()
    `);
    console.log('Modal closed successfully:', isClosed);
    if (!isClosed) {
      throw new Error('Modal did not close on clicking close button!');
    }

    console.log('\n=== ALL PRESENTATION DECK TESTS PASSED PERFECTLY ===\n');
  } catch (err) {
    console.error('Test failed:', err);
    process.exitCode = 1;
  } finally {
    if (cdp) cdp.close();
    if (chromeProc) chromeProc.kill();
    if (previewProc) previewProc.kill();
  }
}

run();
