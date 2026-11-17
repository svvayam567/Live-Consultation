const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9229;

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) { this.wsUrl = wsUrl; this.id = 1; this.callbacks = new Map(); }
  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise(r => this.ws.on('open', r));
    this.ws.on('message', data => {
      const msg = JSON.parse(data);
      if (msg.id && this.callbacks.has(msg.id)) {
        this.callbacks.get(msg.id).resolve(msg.result);
        this.callbacks.delete(msg.id);
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
    const res = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  }
  close() { if (this.ws) this.ws.close(); }
}

async function inspectLive() {
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--user-data-dir=${path.join(__dirname, 'tmp_chrome_live_inspect')}`,
    'about:blank'
  ]);
  await delay(2000);
  const targets = await getJson(`http://localhost:${DEBUG_PORT}/json/list`);
  const cdp = new CDPClient(targets[0].webSocketDebuggerUrl);
  await cdp.connect();

  const requests = [];
  const responses = [];
  cdp.ws.on('message', d => {
    const msg = JSON.parse(d);
    if (msg.method === 'Network.requestWillBeSent') {
      requests.push(msg.params.request.url);
    }
    if (msg.method === 'Network.responseReceived') {
      responses.push({ url: msg.params.response.url, status: msg.params.response.status });
    }
  });

  await cdp.send('Network.enable');
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  console.log('Navigating to live https://live-consultation.web.app/project-explorer?admin_test=1...');
  await cdp.send('Page.navigate', { url: 'https://live-consultation.web.app/project-explorer?admin_test=1' });
  await delay(5000);

  const evalResult = await cdp.evaluate(`
    (() => {
      const cards = Array.from(document.querySelectorAll('img')).map(i => i.src);
      return {
        cardImages: cards.slice(0, 5),
        totalImages: cards.length
      };
    })()
  `);

  console.log('Live cards evaluated:', evalResult);
  console.log('\nRelevant Network Responses on Live:');
  const relevantResponses = responses.filter(r => r.url.includes('portfolio') || r.url.includes('drive') || r.url.includes('sheet') || r.url.includes('manifest'));
  console.log(relevantResponses);

  cdp.close();
  chromeProc.kill();
}

inspectLive().catch(console.error);
