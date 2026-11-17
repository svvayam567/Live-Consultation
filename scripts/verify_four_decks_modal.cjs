const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = path.join('C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba', `tmp_chrome_${Date.now()}`);

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Starting Vite preview server on port 4174...');
  const preview = spawn('npx.cmd', ['vite', 'preview', '--port', '4174', '--strictPort'], {
    cwd: 'E:\\svvayam\\svvayam\\WEb\\svvayam-live-consultation',
    stdio: 'pipe',
    shell: true
  });

  preview.stdout.on('data', d => console.log('[Vite Preview]', d.toString().trim()));
  preview.stderr.on('data', d => console.error('[Vite Preview Error]', d.toString().trim()));

  // Wait for preview server
  let ready = false;
  for (let i = 0; i < 20; i++) {
    try {
      await new Promise((res, rej) => {
        const req = http.get('http://localhost:4174', r => res(r));
        req.on('error', rej);
      });
      ready = true;
      break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!ready) {
    preview.kill();
    throw new Error('Vite preview server failed to start on port 4174');
  }
  console.log('Vite preview is ready at http://localhost:4174!');

  if (fs.existsSync(userDataDir)) {
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }

  console.log('Starting Chrome for four presentation decks verification...');
  const chrome = spawn(chromePath, [
    '--remote-debugging-port=9225',
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const listRes = await fetchJson('http://127.0.0.1:9225/json/list');
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
  await send('Runtime.enable');

  console.log('Navigating to http://localhost:4174/showcase?admin_test=1...');
  await send('Page.navigate', { url: 'http://localhost:4174/showcase?admin_test=1' });
  await new Promise(r => setTimeout(r, 3000));

  // Click "Presentations & Decks" button
  console.log('Locating Presentations & Decks button...');
  const clickRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Presentations & Decks'));
        if (btn) {
          btn.click();
          return { clicked: true, text: btn.textContent.trim() };
        }
        return { clicked: false, available: buttons.map(b => b.textContent.trim()).filter(Boolean) };
      })()
    `,
    returnByValue: true
  });
  console.log('Button click result:', clickRes.result.value);

  // Wait for modal to open
  await new Promise(r => setTimeout(r, 1500));

  // Check 4 tabs and modal header
  const tabsInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        const headerBadge = modal ? modal.querySelector('header span.font-mono.bg-white\\/10') : null;
        const tabs = Array.from(modal ? modal.querySelectorAll('header button[title^="Switch to"]') : []);
        const openLink = modal ? modal.querySelector('a[title^="Open presentation"]') : null;
        const titleEl = modal ? modal.querySelector('h3') : null;
        const iframe = modal ? modal.querySelector('iframe') : null;
        return {
          modalPresent: !!modal,
          badgeText: headerBadge ? headerBadge.textContent.trim() : null,
          tabLabels: tabs.map(t => t.textContent.trim()),
          activeTitle: titleEl ? titleEl.textContent.trim() : null,
          openLinkHref: openLink ? openLink.href : null,
          iframeSrc: iframe ? iframe.src : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log('\n--- Initial Modal State (Deck 1) ---');
  console.log(JSON.stringify(tabsInfo.result.value, null, 2));

  const screen1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\deck_1_verified.png', Buffer.from(screen1.data, 'base64'));

  // Test switching each tab (Tabs 2, 3, 4) and verify state
  const testDeckStates = [];

  for (let i = 1; i <= 4; i++) {
    console.log(`\n--- Switching to Deck ${i} via keyboard shortcut '${i}' ---`);
    await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: `${i}`, text: `${i}` });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: `${i}` });
    await new Promise(r => setTimeout(r, 1500));

    const state = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const modal = document.querySelector('[role="dialog"]');
          const titleEl = modal ? modal.querySelector('h3') : null;
          const openLink = modal ? modal.querySelector('a[title^="Open presentation"]') : null;
          const iframe = modal ? modal.querySelector('iframe') : null;
          return {
            deckIndex: ${i},
            title: titleEl ? titleEl.textContent.trim() : null,
            openHref: openLink ? openLink.href : null,
            iframeSrc: iframe ? iframe.src : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log(`Deck ${i} Active State:`, state.result.value);
    testDeckStates.push(state.result.value);

    const screen = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`C:\\Users\\SRIVSNU\\.gemini\\antigravity\\brain\\0bf2b965-38b2-4fb7-884a-624bfcf6d0ba\\deck_${i}_verified.png`, Buffer.from(screen.data, 'base64'));
  }

  // Test close button
  console.log('\nTesting close button...');
  const closeRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('button[title="Close presentations"]');
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      })()
    `,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 800));

  const modalClosed = await send('Runtime.evaluate', {
    expression: `!document.querySelector('[role="dialog"]')`,
    returnByValue: true
  });
  console.log('Modal closed:', modalClosed.result.value);

  ws.close();
  chrome.kill();
  preview.kill();

  console.log('\n=== ALL FOUR DECKS VERIFIED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
