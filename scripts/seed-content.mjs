import fs from 'node:fs/promises';
const groups = [
  [
    'feed-ingredients',
    'Feed ingredients',
    'Grains, meals & by-products',
    'Maize|Full-Fat Soybean|Soybean Meal (High Protein)|Soybean Meal (Low Protein)|DORB|Wheat Dust|Rapeseed|Fish Meal|Dry Fish Powder|Mora Chal|Maize Powder|Half-Broken Maize|Diamond Broken Rice|Wheat Husk|Mixed Dry Fish|Poultry Meal|Poultry Meal Oil|Rice Polish|Mustard Oil Cake (Shorishar Khoil)|Limestone Powder|Corn Powder|Limestone 2–3 mm|Chickpea Bran (Cholar Vushi)|Diamond Cut Rice|Chitagur',
  ],
  [
    'grains-commodities',
    'Grains & commodities',
    'Rice, flour & everyday materials',
    'Wheat|Red Rice|Brown Rice|Basmati Rice|Atop Rice|Sugar|Molasses|Maida Flour|Atta Flour',
  ],
  [
    'additives-minerals',
    'Additives & minerals',
    'Nutritional inputs for feed production',
    'L-Threonine|L-Lysine|L-Meta Amino|L-Valine|Methionine|Sulfet|DDGS|Corn Gluten Meal|Dicalcium Phosphate (DCP)|Monocalcium Phosphate (MCP)|Sodium Bicarbonate',
  ],
  [
    'pulses',
    'Pulses & by-products',
    'Pulses, husks & bran',
    'Chickpea|Mashkalai Lentil|Khesari Dal|Lentils|Mung Dal|Anchor Dal|Chickpea Husk|Khesari Dal Bran|Anchor Dal Bran|Masoor Dal Bran (Moshuri Daler Vushi)',
  ],
];
const html = await fs.readFile('audit/html/_products_.html', 'utf8');
const sourceProducts = [];
let lastImage = '';
for (const m of html.matchAll(/<img\b[^>]*>|<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
  if (m[0].startsWith('<img')) {
    lastImage =
      (m[0].match(/data-src="([^"]+)"/) ||
        m[0].match(/src="([^"]+)"/) ||
        [])[1] || '';
  } else {
    const name = m[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&amp;/g, '&')
      .trim();
    if (
      name === 'Maize' ||
      (sourceProducts.length && sourceProducts.length < 55)
    )
      sourceProducts.push({ name, image: lastImage });
  }
}
const order = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22,
  23, 24, 25, 18, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
];
const priority = new Set([
  'Maize',
  'Full-Fat Soybean',
  'Soybean Meal (High Protein)',
  'Fish Meal',
  'Rice Polish',
  'Wheat',
  'DDGS',
  'Corn Gluten Meal',
  'Dicalcium Phosphate (DCP)',
  'Monocalcium Phosphate (MCP)',
]);
let idx = 0;
const products = groups.flatMap(([category, , , names]) =>
  names.split('|').map((name) => {
    const source = sourceProducts[order[idx++]];
    return {
      name,
      slug: name
        .toLowerCase()
        .replace(/\([^)]*\)/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-$/, ''),
      category,
      aliases: [
        source?.name || name,
        ...(name.includes('Phosphate')
          ? [name.includes('(DCP)') ? 'DCP' : 'MCP']
          : []),
      ],
      image: null,
      sourceImage: source?.image,
      summary: `${name} is listed in Monir Group’s product range. Share the grade, quantity and delivery location you need to discuss this material.`,
      details: [],
      status: 'owner-review',
      specifications: {},
      origin: null,
      packaging: null,
      indexable: false,
      hasDetail: priority.has(name),
      source: 'https://monirgroupbd.com/products/',
    };
  }),
);
products.find((p) => p.name === 'Soybean Meal (High Protein)').slug =
  'soybean-meal';
const companies = [
  'M/S Monir Enterprise',
  'Monir Poultry Feed Industries Limited',
  'Monir Export Import Trading Ltd.',
  'Mahi International',
  'Sadman Green Agro',
  'M.M Poultry Feed & Fish Feed',
  'Muskan Trading Corporation',
  'Mow Trading',
  'Raiyan Global Trade Link',
  'Nusrat Enterprise',
].map((name, i) => ({
  name,
  id: i + 1,
  status: 'owner-review',
  href: i === 1 ? '/monir-poultry-feed-industries-limited/' : null,
  focus: i === 1 ? 'Poultry, cattle and fish feed' : null,
}));
for (const d of [
  'src/content/products',
  'src/content/businesses',
  'src/data',
  'src/components',
  'src/layouts',
  'src/styles',
  'src/pages/products',
  'src/lib',
  'tests',
])
  await fs.mkdir(d, { recursive: true });
await fs.writeFile(
  'src/content/products/catalog.json',
  JSON.stringify(products, null, 2),
);
await fs.writeFile(
  'src/content/businesses/companies.json',
  JSON.stringify(companies, null, 2),
);
await fs.writeFile(
  'src/data/categories.json',
  JSON.stringify(
    groups.map(([id, name, description]) => ({ id, name, description })),
    null,
    2,
  ),
);
await fs.writeFile(
  'audit/product-reconciliation.json',
  JSON.stringify(sourceProducts, null, 2),
);
console.log(
  'Seeded ' +
    products.length +
    ' products and ' +
    companies.length +
    ' companies.',
);
