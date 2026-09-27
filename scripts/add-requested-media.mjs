import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root='public/media/monir-group';
const html=await (await fetch('https://monirgroupbd.com/')).text();
await fs.writeFile('audit/home-video-source.html',html);
const first=html.match(/<rs-slide\b[\s\S]*?<\/rs-slide>/i)?.[0];
const video=first?.match(/data-mp4="([^"]+)"/)?.[1];
const poster=first?.match(/data-lazyload="([^"]+)"/)?.[1];
if(!video||!poster)throw Error('First slider video/poster not found');
const absolute=u=>new URL(u,'https://monirgroupbd.com/').href;
const entries=[];
async function fetchAsset(url){url=absolute(url);if(new URL(url).hostname!=='monirgroupbd.com')throw Error('Unexpected media host');const r=await fetch(url);if(!r.ok)throw Error(`${r.status} ${url}`);return Buffer.from(await r.arrayBuffer())}
await fs.writeFile(root+'/home-hero.mp4',await fetchAsset(video));
await sharp(await fetchAsset(poster)).resize({width:1600,withoutEnlargement:true}).webp({quality:86}).toFile(root+'/home-hero-poster.webp');
entries.push({use:'First homepage slider video',source:absolute(video),local:root+'/home-hero.mp4',permission:'Requested by user for preview; existing-site video, not verified facility footage'},{use:'Video poster',source:absolute(poster),local:root+'/home-hero-poster.webp'});
const products=JSON.parse(await fs.readFile('src/content/products/catalog.json','utf8'));
for(const p of products){const buffer=await fetchAsset(p.sourceImage);const file=`${p.slug}-catalog.webp`;await sharp(buffer).rotate().resize({width:720,height:540,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(root+'/'+file);p.image='/media/monir-group/'+file;entries.push({use:p.name,source:p.sourceImage,local:root+'/'+file,permission:'User requested existing-site product image reuse'});}
await fs.writeFile('src/content/products/catalog.json',JSON.stringify(products,null,2)+'\n');
await fs.writeFile('audit/added-media.json',JSON.stringify(entries,null,2));
console.log({video:absolute(video),poster:absolute(poster),products:products.length,videoBytes:(await fs.stat(root+'/home-hero.mp4')).size});
