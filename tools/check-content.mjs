// Prüft content/services/*.json gegen content/BRIEF.md
// Aufruf: node tools/check-content.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(ROOT, 'content/services');
const COUNTS = { usps: 4, intro: 3, scope: 8, for: 6, steps: 4, priceFactors: 4, faq: 6 };
const STRINGS = ['name', 'h1', 'metaTitle', 'metaDesc', 'lead', 'introTitle', 'scopeTitle', 'forTitle', 'priceTitle', 'priceIntro', 'priceNote', 'areaText'];
const BAD = [[/—/, 'em dash'], [/ – /, 'spaced en dash'], [/·/, 'middle dot'], [/!/, 'exclamation'], [/€\s?\d|\d\s?€|EUR\s?\d/, 'price figure']];
const imgs = new Set(readdirSync(join(ROOT, 'assets/img')));

let issues = 0;
const say = (m) => { issues++; console.log('  ' + m); };
const slugs = readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));

for (const slug of slugs) {
  console.log(slug);
  let s;
  try { s = JSON.parse(readFileSync(join(dir, `${slug}.json`), 'utf8')); } catch (e) { say(`JSON ungültig: ${e.message}`); continue; }
  if (s.slug !== slug) say(`slug "${s.slug}" passt nicht zum Dateinamen`);
  if (!imgs.has(s.img)) say(`Bild fehlt: ${s.img}`);
  for (const r of s.related || []) if (!slugs.includes(r)) say(`related unbekannt: ${r}`);
  for (const l of ['de', 'en', 'tr']) {
    const c = s[l];
    if (!c) { say(`${l}: fehlt`); continue; }
    for (const k of STRINGS) if (typeof c[k] !== 'string' || !c[k].trim()) say(`${l}.${k}: fehlt/leer`);
    for (const [k, n] of Object.entries(COUNTS)) if (!Array.isArray(c[k]) || c[k].length !== n) say(`${l}.${k}: ${Array.isArray(c[k]) ? c[k].length : 'kein Array'} statt ${n}`);
    if (c.metaTitle && c.metaTitle.length > 65) say(`${l}.metaTitle zu lang (${c.metaTitle.length})`);
    if (c.metaDesc && (c.metaDesc.length < 100 || c.metaDesc.length > 165)) say(`${l}.metaDesc Länge ${c.metaDesc.length}`);
    const text = JSON.stringify(c);
    for (const [re, name] of BAD) if (re.test(text)) say(`${l}: enthält ${name}`);
  }
}
console.log(issues ? `\n${issues} Hinweise` : '\nAlles in Ordnung');
