// Build: turns the drawing sources in art/ into dist/ (one ES module per emoji + runtime + CSS + types).
// Run with: npm run build
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { NATIVE } from './native.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const art = (f) => fs.readFileSync(path.join(root, 'art', f), 'utf8');
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'emojis'), { recursive: true });

// 1. Load the drawing code
const files = ['core.js', 'catalog1.js', 'catalog2.js', 'catalog3.js', 'catalog4.js', 'catalog5.js', 'catalog6.js', 'catalog7.js'];
const ctx = vm.createContext({ Math });
vm.runInContext(files.map(art).join('\n') + '\n;globalThis.__out={ALL,ORDER,CATS,kit};', ctx);
const { ALL, ORDER, CATS, kit } = ctx.__out;

// 2. Class names are prefixed so they never collide with app CSS
const renameClass = (t) => t === 'anim' ? 'gm-a' : t === 'b' ? 'gm-b' : /^(b|p)-/.test(t) || /^t\d$/.test(t) || t === 'slow' ? 'gm-' + t : t;
const prefixClasses = (s) => s.replace(/class="([^"]*)"/g, (_, v) => `class="${v.split(/\s+/).filter(Boolean).map(renameClass).join(' ')}"`);

function variant(name, style) {
  const S = kit(style);
  const e = ALL[name];
  const body = e.draw(S);
  const inner = e.a ? `<g class="anim b b-${e.a}">${body}</g>` : body;
  const defs = S.defs();
  let out = (defs ? `<defs>${defs}</defs>` : '') + S.sh + inner;
  const ids = new Map();
  out = out.replace(/gm(\d+)/g, (_, n) => { if (!ids.has(n)) ids.set(n, ids.size); return '$I' + ids.get(n); });
  return prefixClasses(out).replace(/\s+/g, ' ').replace(/> </g, '><');
}

// 3. One module per emoji
const names = [];
for (const [cat] of CATS) for (const name of ORDER[cat]) names.push(name);
const missingNative = [];
let bytes = 0;
for (const name of names) {
  const e = ALL[name];
  const u = (NATIVE[name] || '').split(' ').filter(Boolean).map((c) => c.replace(/️/g, ''));
  if (!u.length) missingNative.push(name);
  const data = { n: name, l: e.n, c: e.cat, k: e.tags.replace(/\s+/g, ' ').trim(), u, s: { glossy: variant(name, 'glossy'), flat: variant(name, 'flat'), outline: variant(name, 'outline') } };
  const js = `/** ${e.n} */\nexport default ${JSON.stringify(data)};\n`;
  bytes += js.length;
  fs.writeFileSync(path.join(dist, 'emojis', name + '.js'), js);
  fs.writeFileSync(path.join(dist, 'emojis', name + '.d.ts'), `import type { EmojiData } from '../index.js';\ndeclare const emoji: EmojiData<'${name}'>;\nexport default emoji;\n`);
}
const ident = (n) => '_' + n.replace(/-/g, '_');
fs.writeFileSync(path.join(dist, 'all.js'), names.map((n) => `import ${ident(n)} from './emojis/${n}.js';`).join('\n') + `\nexport const EMOJIS = [${names.map(ident).join(',')}];\n`);

// 4. CSS: prefix classes, keyframes and the delay variable
let css = art('motion.css')
  .replace(/\.anim(?![-\w])/g, '.gm-a')
  .replace(/\.b(?![-\w])/g, '.gm-b')
  .replace(/\.(b|p)-/g, '.gm-$1-')
  .replace(/\.(t\d|slow)(?![-\w])/g, '.gm-$1')
  .replace(/@keyframes\s+([\w-]+)/g, '@keyframes gm-$1')
  .replace(/animation:\s*(?!none)([a-zA-Z][\w-]*)/g, 'animation:gm-$1')
  .replace(/--d\b/g, '--gm-d');
css = `/* Gleemoji animation styles */
.gm{display:inline-block;vertical-align:-0.2em;overflow:visible}
${css}
/* play modes: gm-loop (always), gm-hover (on hover/focus), gm-none (static) */
.gm .gm-a,.gm .gm-a>*{animation-play-state:paused}
.gm-loop .gm-a,.gm-loop .gm-a>*,
.gm-hover:hover .gm-a,.gm-hover:hover .gm-a>*,
.gm-trigger:hover .gm-hover .gm-a,.gm-trigger:hover .gm-hover .gm-a>*,
.gm-trigger:focus-visible .gm-hover .gm-a,.gm-trigger:focus-visible .gm-hover .gm-a>*{animation-play-state:running}
.gm-none .gm-a,.gm-none .gm-a>*{animation:none}
.gm-none .gm-p-glow{opacity:0}
@media (prefers-reduced-motion:reduce){.gm .gm-a,.gm .gm-a>*{animation:none!important}.gm .gm-p-glow{opacity:0}}
`.replace(/\n{2,}/g, '\n');
fs.writeFileSync(path.join(dist, 'styles.css'), css);
fs.writeFileSync(path.join(dist, 'styles.js'), `export const CSS = ${JSON.stringify(css)};\n`);

// 5. Runtime + types
for (const f of fs.readdirSync(path.join(root, 'src'))) fs.copyFileSync(path.join(root, 'src', f), path.join(dist, f));
const union = names.map((n) => `'${n}'`).join(' | ');
const t = fs.readFileSync(path.join(root, 'src-types', 'index.d.ts'), 'utf8').replace('__NAMES__', union);
fs.writeFileSync(path.join(dist, 'index.d.ts'), t);
for (const f of ['react.d.ts', 'vue.d.ts', 'element.d.ts', 'render.d.ts']) fs.copyFileSync(path.join(root, 'src-types', f), path.join(dist, f));

console.log(`Built ${names.length} emojis · ${(bytes / 1024).toFixed(0)} KB of emoji modules · CSS ${(css.length / 1024).toFixed(1)} KB`);
if (missingNative.length) console.log('No native mapping:', missingNative.join(', '));
