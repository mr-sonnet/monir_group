import fs from 'node:fs/promises';
import path from 'node:path';
const base = 'https://monirgroupbd.com';
await fs.mkdir('audit/html', { recursive: true });
const log = [];
async function get(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(45000) });
  const text = await r.text();
  log.push({ url, status: r.status, final: r.url });
  return { r, text };
}
const media = [];
for (let page = 1; page <= 20; page++) {
  const { r, text } = await get(
    `${base}/wp-json/wp/v2/media?per_page=100&page=${page}`,
  );
  if (!r.ok) break;
  await fs.writeFile(`audit/media-api-${page}.json`, text);
  const items = JSON.parse(text);
  media.push(...items);
  if (page >= Number(r.headers.get('x-wp-totalpages') || 1)) break;
}
const urls = new Set(
  [
    '/',
    '/about-2/',
    '/sister-concerns/',
    '/products/',
    '/contact/',
    '/monir-poultry-feed-industries-limited/',
    '/home-2/',
    '/home-3/',
    '/contact-2/',
    '/contact-us/',
    '/about-us/',
    '/our-services/',
    '/shop-2/',
  ].map((p) => base + p),
);
for (const type of ['pages', 'posts', 'product']) {
  for (let page = 1; page <= 10; page++) {
    try {
      const { r, text } = await get(
        `${base}/wp-json/wp/v2/${type}?per_page=100&page=${page}`,
      );
      if (!r.ok) break;
      await fs.writeFile(`audit/${type}-${page}.json`, text);
      for (const item of JSON.parse(text)) if (item.link) urls.add(item.link);
      if (page >= Number(r.headers.get('x-wp-totalpages') || 1)) break;
    } catch (e) {
      log.push({ url: type, error: e.message });
      break;
    }
  }
}
for (const sm of ['/wp-sitemap.xml', '/sitemap_index.xml']) {
  try {
    const { r, text } = await get(base + sm);
    await fs.writeFile('audit/' + sm.slice(1), text);
    if (r.ok) {
      for (const m of text.matchAll(/<loc>(.*?)<\/loc>/g)) {
        if (m[1].endsWith('.xml')) {
          const child = await get(m[1]);
          for (const n of child.text.matchAll(/<loc>(.*?)<\/loc>/g))
            urls.add(n[1]);
        } else urls.add(m[1]);
      }
    }
  } catch {}
}
const assets = new Map();
for (const m of media)
  assets.set(m.source_url, {
    id: m.id,
    url: m.source_url,
    type: m.mime_type,
    alt: m.alt_text,
    caption: m.caption?.rendered,
    width: m.media_details?.width,
    height: m.media_details?.height,
    placements: [],
  });
const records = [];
const stylesheetUrls = new Set();
for (const url of urls) {
  try {
    const { r, text } = await get(url);
    const pathname = new URL(url).pathname;
    await fs.writeFile(
      'audit/html/' +
        (pathname.replace(/[^a-z0-9]/gi, '_') || 'home') +
        '.html',
      text,
    );
    const title = (text.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
    const headings = [
      ...text.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi),
    ].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
    let action = 'review',
      target = '';
    if (pathname === '/') {
      action = 'keep';
      target = '/';
    } else if (
      [
        '/products/',
        '/contact/',
        '/sister-concerns/',
        '/monir-poultry-feed-industries-limited/',
        '/privacy-policy/',
      ].includes(pathname)
    ) {
      action = 'keep';
      target = pathname;
    } else if (['/about-2/', '/about-us/'].includes(pathname)) {
      action = 'redirect';
      target = '/about/';
    } else if (['/contact-2/', '/contact-us/'].includes(pathname)) {
      action = 'redirect';
      target = '/contact/';
    } else if (
      /home-[23]|services|shop|team|portfolio|gallery|cart|checkout|my-account|category|author|tag/.test(
        pathname,
      )
    ) {
      action = 'remove';
      target = '410';
    }
    records.push({
      url,
      status: r.status,
      final: r.url,
      title,
      headings: headings.join(' | '),
      action,
      target,
    });
    for (const m of text.matchAll(
      /https?:[^\s"'<>\\)]+?\.(?:webp|png|jpe?g|gif|svg|mp4|webm|pdf)(?:\?[^\s"'<>)]*)?/gi,
    )) {
      let asset = m[0].replaceAll('&amp;', '&');
      if (!assets.has(asset)) assets.set(asset, { url: asset, placements: [] });
      assets.get(asset).placements.push(pathname);
    }
    for (const m of text.matchAll(
      /(?:href)=["']([^"']+\.css(?:\?[^"']*)?)["']/gi,
    )) {
      try {
        const u = new URL(m[1], url);
        if (u.hostname === 'monirgroupbd.com') stylesheetUrls.add(u.href);
      } catch {}
    }
  } catch (e) {
    records.push({ url, status: 'error', title: e.message, action: 'review' });
  }
}
for (const url of stylesheetUrls) {
  try {
    const { text } = await get(url);
    for (const m of text.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/gi)) {
      try {
        const u = new URL(m[1], url);
        if (
          /\.(png|jpe?g|webp|svg|gif|mp4|woff2?)$/i.test(u.pathname) &&
          !assets.has(u.href)
        )
          assets.set(u.href, { url: u.href, placements: ['CSS: ' + url] });
      } catch {}
    }
  } catch {}
}
const jobs = [...assets.values()];
let done = 0;
async function worker() {
  while (jobs.length) {
    const a = jobs.shift();
    const u = new URL(a.url);
    a.placements = [...new Set(a.placements)].join(' | ');
    a.classification = 'C';
    a.decision = 'hold: identity and reuse rights unconfirmed';
    if (u.hostname !== 'monirgroupbd.com') {
      a.decision = 'exclude: external host';
      continue;
    }
    if (
      /logo|monir-enterprise|mahi|muskan|nusrat|sadman|mow|raiyan|monsur|robiul/i.test(
        u.pathname,
      )
    ) {
      a.classification = 'A';
      a.decision = 'brand/person candidate; owner approval required';
    } else if (a.placements.includes('/products/')) {
      a.classification = 'B';
      a.decision = 'catalog illustration; third-party rights unconfirmed';
    } else if (a.type?.startsWith('image')) {
      a.classification = 'B';
      a.decision = 'generic or unverified; hold from design';
    }
    const name = decodeURIComponent(path.basename(u.pathname));
    a.local = 'public/media/monir-group/' + name;
    try {
      const r = await fetch(a.url, { signal: AbortSignal.timeout(45000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buffer = Buffer.from(await r.arrayBuffer());
      await fs.writeFile(a.local, buffer);
      a.bytes = buffer.length;
      a.download = 'ok';
    } catch (e) {
      a.download = e.message;
      a.local = '';
    }
    done++;
    if (done % 50 === 0) console.log('Downloaded', done);
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
function csv(rows) {
  const keys = [...new Set(rows.flatMap(Object.keys))];
  return (
    keys.join(',') +
    '\n' +
    rows
      .map((r) =>
        keys
          .map((k) => '"' + String(r[k] ?? '').replaceAll('"', '""') + '"')
          .join(','),
      )
      .join('\n')
  );
}
await fs.writeFile('audit/legacy-urls.csv', csv(records));
await fs.writeFile('audit/asset-manifest.csv', csv([...assets.values()]));
await fs.writeFile(
  'audit/assets.json',
  JSON.stringify([...assets.values()], null, 2),
);
await fs.writeFile('audit/request-log.json', JSON.stringify(log, null, 2));
await fs.writeFile('audit/urls.json', JSON.stringify(records, null, 2));
console.log(
  JSON.stringify({
    mediaAPI: media.length,
    urls: records.length,
    assets: assets.size,
    downloaded: done,
  }),
);
