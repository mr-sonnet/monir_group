import fs from 'node:fs/promises';
const urls = JSON.parse(await fs.readFile('audit/urls.json', 'utf8'));
for (const r of urls) {
  const p = new URL(r.url).pathname;
  if (p === '/about-2/') {
    r.action = 'redirect';
    r.target = '/about/';
    r.reason =
      'Equivalent rewritten company profile; initial source request timed out.';
  } else if (r.action === 'review') {
    if (p.includes('high-quality-maize-')) {
      r.action = 'redirect';
      r.target = '/products/maize/';
      r.reason =
        'Equivalent material inquiry; dated stock/delivery claims not retained.';
    } else if (p.includes('high-quality-fishh-meal')) {
      r.action = 'redirect';
      r.target = '/products/fish-meal/';
      r.reason =
        'Equivalent material inquiry; dated delivery claim not retained.';
    } else if (p.includes('high-qualityhigh-protein-soya')) {
      r.action = 'redirect';
      r.target = '/products/soybean-meal/';
      r.reason =
        'Equivalent soybean material inquiry; no unverified supplier relationship retained.';
    } else {
      r.action = 'remove';
      r.target = '404';
      r.reason =
        'Legacy/demo/archive content without an evidenced equivalent; no homepage redirect.';
    }
  }
  if (r.action === 'remove') r.target = '404';
}
const keys = [
  'url',
  'status',
  'final',
  'title',
  'headings',
  'action',
  'target',
  'reason',
];
await fs.writeFile(
  'audit/legacy-urls.csv',
  keys.join(',') +
    '\n' +
    urls
      .map((r) =>
        keys
          .map((k) => '"' + String(r[k] ?? '').replaceAll('"', '""') + '"')
          .join(','),
      )
      .join('\n'),
);
await fs.writeFile('audit/urls.json', JSON.stringify(urls, null, 2));
await fs.writeFile(
  'public/_redirects',
  urls
    .filter((r) => r.action === 'redirect')
    .map((r) => `${new URL(r.url).pathname} ${r.target} 301`)
    .join('\n') + '\n',
);
console.log('Finalized ' + urls.length + ' URL decisions.');
