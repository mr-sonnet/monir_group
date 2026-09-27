import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = path.resolve('public/media/monir-group');
const archive = path.resolve('audit/media-originals');
// Preserve the read-only recovery outside the deployable public tree. This prevents
// excluded stock, third-party logos and obsolete theme assets from being published.
await fs.mkdir(archive, { recursive: true });
const keep = new Set([
  'cropped-Monir-Group-logo.png',
  'cropped-Monir-Group-logo-32x32.png',
  'robiul-hasan-monir.webp',
  'monsur-ahmed.webp',
]);
for (const filename of await fs.readdir(root)) {
  if (!keep.has(filename)) {
    const from = path.resolve(root, filename);
    const to = path.resolve(archive, filename);
    if (!from.startsWith(root + path.sep) || !to.startsWith(archive + path.sep))
      throw Error('Path outside media roots');
    await fs.rename(from, to);
  }
}
const assets = JSON.parse(await fs.readFile('audit/assets.json', 'utf8'));
for (const a of assets) {
  if (a.local) {
    const filename = path.basename(a.local);
    if (!keep.has(filename)) a.local = 'audit/media-originals/' + filename;
    try {
      const meta = await sharp(a.local).metadata();
      a.width = meta.width;
      a.height = meta.height;
    } catch {}
  }
  if (
    /logo/i.test(a.url) &&
    !/(Monir-Group|monir-enterprise|monir-logo|Monir-Enterprise|MonirEnterprize)/i.test(
      a.url,
    )
  ) {
    a.classification = 'C';
    a.decision =
      'exclude: third-party or theme logo; not evidence of endorsement';
  }
  if (keep.has(path.basename(a.local || ''))) {
    a.classification = 'A';
    a.decision = 'used in owner-only review; reuse permission pending';
  }
}
const rows = assets;
const keys = [...new Set(rows.flatMap(Object.keys))];
await fs.writeFile(
  'audit/asset-manifest.csv',
  keys.join(',') +
    '\n' +
    rows
      .map((r) =>
        keys
          .map((k) => '"' + String(r[k] ?? '').replaceAll('"', '""') + '"')
          .join(','),
      )
      .join('\n'),
);
await fs.writeFile('audit/assets.json', JSON.stringify(assets, null, 2));
await fs.writeFile(
  'audit/used-assets.json',
  JSON.stringify(
    [
      {
        local: '/media/monir-group/cropped-Monir-Group-logo.png',
        source:
          'https://monirgroupbd.com/wp-content/uploads/2025/11/cropped-Monir-Group-logo.png',
        classification: 'A',
        use: 'Brand mark; original existing-site square logo',
      },
      {
        local: '/media/monir-group/cropped-Monir-Group-logo-32x32.png',
        source:
          'https://monirgroupbd.com/wp-content/uploads/2025/11/cropped-Monir-Group-logo-32x32.png',
        classification: 'A',
        use: 'Favicon',
      },
      {
        local: '/media/monir-group/robiul-hasan-monir.webp',
        source:
          'https://monirgroupbd.com/wp-content/uploads/2026/09/MD.-Robiul-Hasan-Monir​.jpeg',
        classification: 'A',
        use: 'Current-site portrait; resized to 600 px and encoded WebP',
      },
      {
        local: '/media/monir-group/monsur-ahmed.webp',
        source:
          'https://monirgroupbd.com/wp-content/uploads/2026/09/Md-Monsur-Ahmed.jpeg',
        classification: 'A',
        use: 'Current-site portrait; resized to 600 px and encoded WebP',
      },
    ],
    null,
    2,
  ),
);
console.log('Only selected first-party brand/person assets remain deployable.');
