import { CSS } from './styles.js';

let counter = 0;
const hash = (s) => { let h = 7; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export const VARIANTS = ['glossy', 'flat', 'outline'];

/**
 * Render one emoji data object (from `gleemoji/emojis/<name>`) to an SVG string.
 * Works on the server and in the browser. Does not touch the DOM.
 */
export function renderEmoji(data, opts = {}) {
  if (!data || !data.s) return '';
  const { size = 24, variant = 'glossy', animate = 'hover', label, className = '', id } = opts;
  const body = data.s[variant] || data.s.glossy;
  const uid = String(id != null ? id : 'g' + (++counter).toString(36)).replace(/[^a-zA-Z0-9_-]/g, '');
  const mode = animate === true ? 'loop' : animate === false ? 'none' : (animate || 'hover');
  const delay = mode === 'loop' ? `--gm-d:-${(hash(data.n) % 2000) / 1000}s;` : '';
  const sz = typeof size === 'number' ? size + 'px' : esc(size);
  const a11y = label === '' ? 'aria-hidden="true" focusable="false"' : `role="img" aria-label="${esc(label != null ? label : data.l)}"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${sz}" height="${sz}" class="gm gm-${esc(mode)}${className ? ' ' + esc(className) : ''}" style="${delay}overflow:visible" ${a11y}>${body.replace(/\$I/g, 'gm' + uid + '_')}</svg>`;
}

/** Add the animation stylesheet to the page once. Safe to call on the server (does nothing). */
export function injectStyles(doc) {
  const d = doc || (typeof document !== 'undefined' ? document : null);
  if (!d || !d.head || d.getElementById('gleemoji-css')) return;
  const s = d.createElement('style');
  s.id = 'gleemoji-css';
  s.textContent = CSS;
  d.head.appendChild(s);
}
