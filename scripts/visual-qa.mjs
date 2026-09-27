import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://127.0.0.1:4321/');
await page.locator('.leaders').scrollIntoViewIfNeeded();
await page.waitForFunction(() => [...document.images].every((i) => i.complete));
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: 'audit/home-desktop.png', fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'audit/home-mobile.png', fullPage: true });
await page.goto('http://127.0.0.1:4321/products/');
await page.screenshot({ path: 'audit/products-mobile.png', fullPage: true });
await page.goto('http://127.0.0.1:4321/contact/?product=Maize');
await page.screenshot({ path: 'audit/contact-mobile.png', fullPage: true });
// Baseline screenshots of the public source. Never log in or mutate WordPress.
for (const [name, viewport] of [
  ['desktop', { width: 1440, height: 1000 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  await page.setViewportSize(viewport);
  try {
    await page.goto('https://monirgroupbd.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });
    await page.screenshot({
      path: `audit/legacy-home-${name}.png`,
      fullPage: false,
      timeout: 15000,
    });
  } catch (e) {
    await fs.appendFile(
      'audit/screenshot-limits.txt',
      `${name}: ${e.message}\n`,
    );
  }
}
await browser.close();
