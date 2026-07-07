/**
 * 로컬 개발 서버 — 정적 파일 제공 + /api/chat 프록시
 * 사용법: UPSTAGE_API_KEY=your_key node server.js
 * 또는 .env.local 파일에 UPSTAGE_API_KEY=your_key 저장 후 node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;
const UPSTAGE_API_URL = 'https://api.upstage.ai/v1/chat/completions';
const UPSTAGE_MODEL = 'solar-pro3';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon'
};

/* .env.local 파일 로드 */
function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;

  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(function (line) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

loadEnvLocal();

function readBody(req) {
  return new Promise(function (resolve, reject) {
    const chunks = [];
    req.on('data', function (chunk) {
      chunks.push(chunk);
    });
    req.on('end', function () {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
    req.on('error', reject);
  });
}

function serveStatic(filePath, res) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function handleChatProxy(req, res) {
  const apiKey = process.env.UPSTAGE_API_KEY;

  if (!apiKey) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      error: { message: 'UPSTAGE_API_KEY가 설정되지 않았습니다. .env.local 파일을 확인해 주세요.' }
    }));
    return;
  }

  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: { message: 'Invalid JSON body.' } }));
    return;
  }

  if (!Array.isArray(body.messages)) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: { message: 'Request body must include a messages array.' } }));
    return;
  }

  try {
    const upstageResponse = await fetch(UPSTAGE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: UPSTAGE_MODEL,
        messages: body.messages
      })
    });

    const text = await upstageResponse.text();
    res.writeHead(upstageResponse.status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(text);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: { message: 'Failed to reach Upstage API.' } }));
  }
}

const server = http.createServer(async function (req, res) {
  const url = new URL(req.url, 'http://localhost:' + PORT);

  if (req.method === 'POST' && url.pathname === '/api/chat') {
    await handleChatProxy(req, res);
    return;
  }

  let filePath = path.join(ROOT, url.pathname === '/' ? 'index.html' : url.pathname);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  serveStatic(filePath, res);
});

server.listen(PORT, function () {
  console.log('로컬 서버 실행: http://localhost:' + PORT);
  if (!process.env.UPSTAGE_API_KEY) {
    console.log('경고: UPSTAGE_API_KEY가 없습니다. .env.local 파일을 만들어 주세요.');
  }
});
