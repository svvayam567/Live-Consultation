const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9226;
const PREVIEW_PORT = 4174;
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

    console.log('Starting Chrome for Project Explorer verification...');
    const tmpUserData = path.join(__dirname, '..', 'tmp_chrome_proj_verify');
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

    console.log('Navigating to http://localhost:' + PREVIEW_PORT + '/project-explorer?admin_test=1...');
    await cdp.send('Page.navigate', { url: `http://localhost:${PREVIEW_PORT}/project-explorer?admin_test=1` });
    await delay(3000);

    // 1. Verify Tab Labels and Badges
    const tabsData = await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const tabBtns = buttons.filter(b => {
          const txt = b.textContent || '';
          return txt.includes('All') || txt.includes('Minimal') || txt.includes('Moderate') || txt.includes('Heavy');
        });
        return tabBtns.map(b => b.textContent.trim());
      })()
    `);
    console.log('Category Tabs rendered:', tabsData);

    const allTab = tabsData.find(t => t.includes('All'));
    const minimalTab = tabsData.find(t => t.includes('Minimal'));
    const moderateTab = tabsData.find(t => t.includes('Moderate'));
    const heavyTab = tabsData.find(t => t.includes('Heavy'));

    if (!allTab || !allTab.includes('90')) throw new Error('All tab badge expected 90, got: ' + allTab);
    if (!minimalTab || !minimalTab.includes('17')) throw new Error('Minimal tab badge expected 17, got: ' + minimalTab);
    if (!moderateTab || !moderateTab.includes('45')) throw new Error('Moderate tab badge expected 45, got: ' + moderateTab);
    if (!heavyTab || !heavyTab.includes('28')) throw new Error('Heavy tab badge expected 28, got: ' + heavyTab);

    // 2. Verify Structure Type Dropdown
    const structureOptions = await cdp.evaluate(`
      (() => {
        const select = document.querySelector('#structure-type-filter');
        if (!select) return null;
        return Array.from(select.options).map(o => o.value);
      })()
    `);
    console.log('Structure Type Options:', structureOptions);
    if (!structureOptions || structureOptions.length < 8) {
      throw new Error('Structure type options missing! Got: ' + JSON.stringify(structureOptions));
    }

    // 3. Verify Card Dimensions format
    const sampleCards = await cdp.evaluate(`
      (() => {
        const cards = Array.from(document.querySelectorAll('.group'));
        return cards.slice(0, 5).map(c => {
          const title = c.querySelector('h3') ? c.querySelector('h3').textContent.trim() : '';
          const text = c.textContent;
          const matchDim = text.match(/W\\s*\\d+(\\.\\d+)?\\s*×\\s*D\\s*\\d+(\\.\\d+)?\\s*×\\s*H\\s*\\d+(\\.\\d+)?\\s*ft/);
          return {
            title,
            hasFormattedDim: !!matchDim,
            dimText: matchDim ? matchDim[0] : null
          };
        });
      })()
    `);
    console.log('Sample Cards Dimensions check:', sampleCards);
    if (!sampleCards[0].hasFormattedDim) {
      throw new Error('First card does not have dimension format W [w] × D [d] × H [h] ft!');
    }

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'project_explorer_design_tabs.png'));

    // 4. Test Filtering by Minimal
    console.log('Testing Minimal tab click...');
    await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const minBtn = buttons.find(b => (b.textContent || '').includes('Minimal'));
        if (minBtn) minBtn.click();
      })()
    `);
    await delay(600);
    const cardTitles = await cdp.evaluate(`
      Array.from(document.querySelectorAll('h3')).map(h => h.textContent.trim())
    `);
    console.log('Visible card titles count:', cardTitles.length, cardTitles);
    const minimalCount = cardTitles.length;
    console.log('Visible cards for Minimal:', minimalCount);
    if (minimalCount !== 17) throw new Error(`Expected 17 cards for Minimal, got ${minimalCount}`);

    // 5. Test Filtering by Structure Type together with Moderate
    console.log('Testing Moderate tab + Structure Type "Complete Pooja Room"...');
    await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const modBtn = buttons.find(b => (b.textContent || '').includes('Moderate'));
        if (modBtn) modBtn.click();

        const select = document.querySelector('#structure-type-filter');
        if (select) {
          select.value = 'Complete Pooja Room';
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })()
    `);
    await delay(600);
    const multiFilterCount = await cdp.evaluate(`document.querySelectorAll('.group').length`);
    console.log('Visible cards for Moderate + Complete Pooja Room:', multiFilterCount);

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'project_explorer_structure_filter.png'));

    // 6. Test Reset Filters
    console.log('Testing Reset Filters...');
    await cdp.evaluate(`
      (() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const resetBtn = buttons.find(b => (b.textContent || '').includes('Reset filters'));
        if (resetBtn) resetBtn.click();
      })()
    `);
    await delay(600);
    const resetCount = await cdp.evaluate(`document.querySelectorAll('h3').length`);
    console.log('Cards count after Reset:', resetCount);
    if (resetCount !== 90) throw new Error(`Expected 90 cards after reset, got ${resetCount}`);

    // 7. Test Detail Modal and metadata display
    console.log('Testing Project Detail Modal click on first card...');
    await cdp.evaluate(`
      (() => {
        const firstCard = document.querySelector('.group');
        if (firstCard) firstCard.click();
      })()
    `);
    await delay(1000);

    const modalMeta = await cdp.evaluate(`
      (() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return null;
        const text = modal.textContent;
        const hasDim = text.includes('W ') && text.includes('ft');
        const hasStructure = text.includes('Frontage') || text.includes('Unit') || text.includes('Pooja') || text.includes('Temple') || text.includes('Mandap') || text.includes('Enclosure');
        const hasTier = text.includes('Minimal') || text.includes('Moderate') || text.includes('Heavy');
        return {
          hasDim,
          hasStructure,
          hasTier
        };
      })()
    `);
    console.log('Modal Metadata check:', modalMeta);
    if (!modalMeta || !modalMeta.hasDim || !modalMeta.hasStructure || !modalMeta.hasTier) {
      throw new Error('Project detail modal metadata missing: ' + JSON.stringify(modalMeta));
    }

    await cdp.screenshot(path.join(ARTIFACTS_DIR, 'project_explorer_detail_modal.png'));

    console.log('\n=== ALL PROJECT EXPLORER VERIFICATION CHECKS PASSED ===\n');
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
