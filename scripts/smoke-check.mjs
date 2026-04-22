import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '..', '.smoke');
mkdirSync(outDir, { recursive: true });

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';

const routes = [
  { path: '/', name: 'home' },
  { path: '/itinerary', name: 'itinerary' },
  { path: '/itinerary/day/day-1', name: 'day-1' },
  { path: '/itinerary/day/day-5', name: 'day-5' },
  { path: '/poi/wat-xieng-thong', name: 'poi-wat-xieng-thong' },
  { path: '/travel', name: 'travel' },
  { path: '/travel/flights', name: 'flights' },
  { path: '/travel/hotels', name: 'hotels' },
  { path: '/info', name: 'info' },
  { path: '/info/visa', name: 'info-visa' },
  { path: '/info/currency', name: 'info-currency' },
  { path: '/info/etiquette', name: 'info-etiquette' },
  { path: '/info/checklist', name: 'info-checklist' },
  { path: '/budget', name: 'budget' },
];

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 820 },
];

const browser = await chromium.launch();
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  const logs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'warning' || msg.type() === 'error') {
      logs.push({ type: msg.type(), text: msg.text() });
    }
  });
  page.on('pageerror', (err) => {
    logs.push({ type: 'pageerror', text: err.message });
  });

  for (const r of routes) {
    const url = BASE + r.path;
    const t0 = Date.now();
    const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(
      (e) => ({ status: () => 'ERR:' + e.message }),
    );
    const status = typeof resp.status === 'function' ? resp.status() : 'unknown';
    await page.waitForTimeout(250);
    const h1 = await page.locator('h1').first().textContent().catch(() => null);

    // Layout measurements (mobile only)
    let layout = null;
    if (vp.name === 'mobile') {
      layout = await page.evaluate(() => {
        const nav = document.querySelector('nav[aria-label="主要導航"]');
        const fab = document.querySelector('button[aria-label="緊急聯絡"]');
        const main = document.querySelector('main');
        const navRect = nav?.getBoundingClientRect();
        const fabRect = fab?.getBoundingClientRect();
        const mainRect = main?.getBoundingClientRect();
        const vh = window.innerHeight;
        return {
          viewportHeight: vh,
          navPresent: !!nav,
          navBottom: navRect ? vh - navRect.bottom : null,
          navHeight: navRect?.height ?? null,
          navTop: navRect ? navRect.top : null,
          fabPresent: !!fab,
          fabClear: navRect && fabRect ? navRect.top - fabRect.bottom : null,
          mainPaddingBottom: main
            ? parseFloat(getComputedStyle(main).paddingBottom)
            : null,
          mainBottom: mainRect ? mainRect.bottom : null,
        };
      });
    }

    const shot = resolve(outDir, `${vp.name}-${r.name}.png`);
    if (r.path === '/' || r.path === '/info/checklist') {
      await page.screenshot({ path: shot, fullPage: false });
    }

    results.push({
      viewport: vp.name,
      path: r.path,
      status,
      h1: h1?.trim().slice(0, 50) ?? null,
      elapsed: Date.now() - t0,
      consoleIssues: logs.splice(0).length,
      layout,
    });
  }
  await context.close();
}

await browser.close();

// Report
let failures = 0;
for (const r of results) {
  const ok = r.status === 200;
  if (!ok) failures++;
  const layoutStr = r.layout
    ? ` nav=${r.layout.navHeight?.toFixed(0)}h@${r.layout.navBottom?.toFixed(0)}fromBottom fab-clear=${r.layout.fabClear?.toFixed(0)} mainPB=${r.layout.mainPaddingBottom?.toFixed(0)}`
    : '';
  console.log(
    `${ok ? '✓' : '✗'} [${r.viewport}] ${r.path.padEnd(32)} ${String(r.status).padStart(4)} ${String(r.elapsed).padStart(4)}ms h1="${r.h1 ?? '—'}" issues=${r.consoleIssues}${layoutStr}`,
  );
}

if (failures > 0) {
  console.error(`\n${failures} failures.`);
  process.exit(1);
}
console.log('\nScreenshots:', outDir);
