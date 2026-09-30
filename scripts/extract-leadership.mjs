import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const html=await (await fetch('https://monirgroupbd.com/about-2/')).text();
const b=await chromium.launch();const p=await b.newPage();await p.setContent(html,{waitUntil:'domcontentloaded'});const messages=await p.evaluate(()=>{const headings=[...document.querySelectorAll('h2')];return ['MD. Robiul Hasan Monir','Md Monsur Ahmed'].map(name=>{const h=headings.find(h=>h.textContent.trim()===name);const section=h?.closest('.elementor-widget')?.parentElement;return {name,text:section?.innerText};});});console.log(JSON.stringify(messages));await fs.writeFile('audit/leadership-source.json',JSON.stringify({url:'https://monirgroupbd.com/about-2/',retrieved:'2026-09-29',messages},null,2));await b.close();
