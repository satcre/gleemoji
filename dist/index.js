import { EMOJIS } from './all.js';
import { renderEmoji, injectStyles, VARIANTS } from './render.js';
export { CSS as css } from './styles.js';
export { renderEmoji, injectStyles, VARIANTS };

export const categories = [
  { id: 'smileys', label: 'Smileys' }, { id: 'hearts', label: 'Hearts' }, { id: 'people', label: 'Hands & body' },
  { id: 'animals', label: 'Animals' }, { id: 'food', label: 'Food & drink' }, { id: 'nature', label: 'Nature & weather' },
  { id: 'objects', label: 'Objects' }, { id: 'symbols', label: 'Symbols' },
];

const BY_NAME = new Map();
const BY_NATIVE = new Map();
for (const e of EMOJIS) {
  BY_NAME.set(e.n, e);
  for (const u of e.u || []) BY_NATIVE.set(u, e);
}

/** Metadata for every emoji: name, label, category, keywords and native characters. */
export const emojis = EMOJIS.map((e) => ({ name: e.n, label: e.l, category: e.c, keywords: e.k.split(' '), native: e.u || [] }));

/** Raw emoji data by name (pass it to renderEmoji or the framework components). */
export function getEmoji(name) {
  return BY_NAME.get(name) || BY_NATIVE.get(String(name || '').replace(/️/g, ''));
}

/** Render an emoji by name (e.g. "heart-eyes") or native character (e.g. "😍") to an SVG string. */
export function toSVG(name, opts = {}) {
  const e = getEmoji(name);
  if (!e) return '';
  if (opts.injectStyles !== false) injectStyles();
  return renderEmoji(e, opts);
}

/** Find emojis whose name, label or keywords contain every word of the query. */
export function search(query, { category, limit } = {}) {
  const words = String(query || '').toLowerCase().trim().split(/\s+/).filter(Boolean);
  let out = EMOJIS.filter((e) => (!category || e.c === category) && words.every((w) => e.k.includes(w)));
  if (limit) out = out.slice(0, limit);
  return out.map((e) => e.n);
}

let nativeRe;
const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Replace :shortcodes: and native emoji characters in plain text with Gleemoji SVGs.
 * Returns an HTML string. The surrounding text is HTML-escaped unless `escape: false`.
 */
export function replaceShortcodes(text, opts = {}) {
  const { escape = true, native = true, size = '1.25em', ...rest } = opts;
  if (opts.injectStyles !== false) injectStyles();
  if (!nativeRe) {
    const keys = [...BY_NATIVE.keys()].sort((a, b) => b.length - a.length).map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    nativeRe = new RegExp(`:([a-z0-9-]+):|(${keys.join('|')})`, 'gu');
  }
  const src = native ? String(text).replace(/️/g, '') : String(text);
  const re = native ? nativeRe : /:([a-z0-9-]+):/g;
  let out = '', last = 0, m;
  re.lastIndex = 0;
  while ((m = re.exec(src))) {
    const e = m[1] ? BY_NAME.get(m[1]) : BY_NATIVE.get(m[2]);
    if (!e) continue;
    const before = src.slice(last, m.index);
    out += escape ? escHtml(before) : before;
    out += renderEmoji(e, { size, className: 'gm-inline', ...rest });
    last = m.index + m[0].length;
  }
  const tail = src.slice(last);
  return out + (escape ? escHtml(tail) : tail);
}
