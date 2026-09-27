import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { chromium } from '@playwright/test';
async function walk(dir) {
  const all = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) all.push(...(await walk(p)));
    else all.push(p);
  }
  return all;
}
const files = await walk('dist');
const html = files.filter((p) => p.endsWith('.html'));
const broken = [];
let checked = 0;
for (const file of html) {
  const content = await fs.readFile(file, 'utf8');
  for (const m of content.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = m[1];
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    const pathname = decodeURIComponent(url.split('?')[0]);
    let target = path.join('dist', pathname);
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    try {
      await fs.access(target);
    } catch {
      broken.push({ file, url });
    }
    checked++;
  }
}
if (broken.length) throw Error(JSON.stringify(broken));
const media = files.filter((p) => p.includes(path.sep + 'media' + path.sep));
const scripts = files.filter((p) => p.endsWith('.js'));
const styles = files.filter((p) => p.endsWith('.css'));
const byteStats = async (list) => {
  let raw = 0,
    gzip = 0;
  for (const f of list) {
    const b = await fs.readFile(f);
    raw += b.length;
    gzip += gzipSync(b).length;
  }
  return { files: list.length, rawBytes: raw, gzipBytes: gzip };
};
const result = {
  htmlPages: html.length,
  internalReferencesChecked: checked,
  brokenReferences: broken,
  media: await byteStats(media),
  javascript: await byteStats(scripts),
  css: await byteStats(styles),
  lab: [],
};
const browser = await chromium.launch();
for (const [label, viewport] of [
  ['desktop', { width: 1440, height: 1000 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => {
    window.__metrics = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        window.__metrics.lcp = entry.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries())
        if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  result.lab.push({
    label,
    viewport,
    conditions:
      'Unthrottled local production preview, Chromium. Single run; not field Core Web Vitals.',
    ...(await page.evaluate(() => ({
      ...window.__metrics,
      domContentLoaded:
        performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd,
      load: performance.getEntriesByType('navigation')[0].loadEventEnd,
    }))),
  });
  await page.locator('.leaders').scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.images].every((i) => i.complete),
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `audit/final-home-${label}.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `audit/final-hero-${label}.png`,
    fullPage: false,
  });
  await page.goto('http://127.0.0.1:4321/contact/?product=Maize');
  await page.screenshot({
    path: `audit/final-contact-${label}.png`,
    fullPage: true,
  });
  await page.close();
}
await browser.close();
await fs.writeFile(
  'audit/build-verification.json',
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
