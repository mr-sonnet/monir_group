import fs from 'node:fs/promises';
let p='src/pages/index.astro';let s=await fs.readFile(p,'utf8');
s=s.replace('<section class="hero">',`<section class="hero video-hero">
    <video id="hero-video" class="hero-video" muted loop playsinline preload="none" poster="/media/monir-group/home-hero-poster.webp" aria-hidden="true" tabindex="-1" data-src="/media/monir-group/home-hero.mp4"></video>
    <div class="hero-shade" aria-hidden="true"></div>`);
const start=s.indexOf('<aside class="supply-board"');const end=s.indexOf('</aside>',start)+8;s=s.slice(0,start)+s.slice(end);
s=s.replace('<span>Trading & feed-related businesses</span>',`<span>Trading & feed-related businesses</span><button id="hero-video-toggle" type="button" class="video-toggle" hidden>Play background video</button>`);
s+=`\n<script>
const video=document.querySelector<HTMLVideoElement>('#hero-video')!;
const toggle=document.querySelector<HTMLButtonElement>('#hero-video-toggle')!;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
function sync(){toggle.textContent=video.paused?'Play background video':'Pause background video'}
async function play(){if(!video.getAttribute('src'))video.src=video.dataset.src!;try{await video.play()}catch{video.pause()}sync()}
toggle.hidden=false;toggle.addEventListener('click',()=>{if(video.paused)void play();else video.pause()});
video.addEventListener('play',sync);video.addEventListener('pause',sync);video.addEventListener('error',()=>{video.removeAttribute('src');video.load();toggle.hidden=true});
reduced.addEventListener('change',()=>{if(reduced.matches)video.pause()});
if(!reduced.matches&&!connection?.saveData)void play();
</script>\n`;
await fs.writeFile(p,s);
p='src/components/ProductCard.astro';s=await fs.readFile(p,'utf8');s=s.replace('  <p class="eyebrow">',`  {p.image && <div class="product-image"><img src={p.image} alt={p.name} width="720" height="540" loading="lazy" decoding="async" /></div>}
  <p class="eyebrow">`);await fs.writeFile(p,s);
p='src/pages/products/[slug].astro';s=await fs.readFile(p,'utf8');s=s.replace('<section class="page-intro">','<section class="page-intro product-intro">');s=s.replace('<div class="wrap">','<div class="wrap product-detail-heading"><div>',1);s=s.replace('    </div>\n  </section>',`    </div>{p.image && <div class="product-detail-image"><img src={p.image} alt={p.name} width="720" height="540" fetchpriority="high" /></div>}</div>
  </section>`);await fs.writeFile(p,s);
await fs.appendFile('src/styles/global.css',`
/* Existing-site video and product imagery, requested for private review. */
.video-hero{position:relative;isolation:isolate;background:#0c251e}
.hero-video,.hero-shade{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.hero-shade{z-index:-1;background:linear-gradient(90deg,rgba(5,24,17,.9) 0%,rgba(5,24,17,.75) 52%,rgba(5,24,17,.3) 100%)}
.video-hero .hero-grid{display:block;min-height:640px;padding-top:95px;padding-bottom:80px}
.video-hero h1{max-width:800px}.video-hero .hero-bottom{align-items:center;border-color:#ffffff50}
.video-toggle{background:#0c251e;color:#fff;border:1px solid #ffffff80;padding:10px 16px;border-radius:3px;font-size:13px;min-height:44px}
.video-toggle:hover{background:#24543f}
.product-image{margin:-25px -25px 24px;background:#f1f3ec;border-bottom:1px solid var(--line);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;padding:20px}
.product-image img{width:100%;height:100%;object-fit:contain;mix-blend-mode:multiply}
.product-card .eyebrow{margin-bottom:16px}.product-card h3{font-size:23px}
.product-detail-heading{display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:60px}
.product-detail-image{background:#fff;border:1px solid var(--line);padding:30px;aspect-ratio:4/3;display:flex;align-items:center}
.product-detail-image img{width:100%;height:100%;object-fit:contain}
@media(max-width:800px){.video-hero .hero-grid{min-height:570px;padding-block:65px}.hero-shade{background:rgba(5,24,17,.77)}.product-detail-heading{grid-template-columns:1fr;gap:30px}.product-detail-image{max-width:600px;width:100%}}
@media(max-width:520px){.video-hero .hero-grid{min-height:590px;padding-block:48px}.video-hero .hero-bottom{gap:15px}.video-toggle{order:3}.product-image{aspect-ratio:4/3}}
`);
console.log('Video hero and product imagery integrated.');
