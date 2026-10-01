// Dependency-free checks for the core API. Run: npm test
import assert from 'node:assert/strict';
import { toSVG, getEmoji, search, replaceShortcodes, emojis, categories, renderEmoji, css, VARIANTS } from '../dist/index.js';
import rocket from '../dist/emojis/rocket.js';

let passed = 0;
const t = (name, fn) => { fn(); passed++; console.log('  ✓ ' + name); };

t('every emoji renders in every style', () => {
  assert.ok(emojis.length >= 250);
  for (const e of emojis) for (const v of VARIANTS) {
    const s = toSVG(e.name, { variant: v });
    assert.ok(s.startsWith('<svg') && s.endsWith('</svg>'), e.name);
    assert.ok(!/undefined|NaN|\$I/.test(s), `${e.name}/${v} has a leftover token`);
    assert.equal((s.match(/<svg/g) || []).length, 1);
  }
});
t('names, categories and native lookups', () => {
  assert.equal(getEmoji('heart-eyes').l, 'Heart eyes');
  assert.equal(getEmoji('😍').n, 'heart-eyes');
  assert.equal(getEmoji('❤️').n, 'heart');
  assert.equal(getEmoji('nope'), undefined);
  assert.equal(toSVG('nope'), '');
  assert.equal(categories.length, 8);
  assert.equal(new Set(emojis.map((e) => e.name)).size, emojis.length, 'names are unique');
});
t('gradient ids are unique per render', () => {
  const a = toSVG('fire'), b = toSVG('fire');
  const id = (s) => s.match(/id="([^"]+)"/)[1];
  assert.notEqual(id(a), id(b));
  assert.ok(toSVG('fire', { id: 'abc' }).includes('id="gmabc_0"'));
});
t('options: size, variant, animate, label', () => {
  const s = toSVG('rocket', { size: 40, animate: 'loop', variant: 'outline', label: 'Launch' });
  assert.ok(s.includes('width="40px"') && s.includes('gm-loop') && s.includes('aria-label="Launch"'));
  assert.ok(s.includes('currentColor'));
  assert.ok(toSVG('rocket', { label: '' }).includes('aria-hidden="true"'));
  assert.ok(toSVG('rocket', { animate: false }).includes('gm-none'));
  assert.ok(toSVG('rocket', { size: '2em' }).includes('width="2em"'));
});
t('search', () => {
  assert.ok(search('love').includes('heart-eyes'));
  assert.deepEqual(search('pizza'), ['pizza']);
  assert.ok(search('heart', { category: 'hearts' }).every((n) => getEmoji(n).c === 'hearts'));
  assert.equal(search('smile', { limit: 2 }).length, 2);
});
t('replaceShortcodes escapes text and swaps emojis', () => {
  const out = replaceShortcodes('<b>hi</b> :rocket: 🎉 :unknown:');
  assert.ok(out.startsWith('&lt;b&gt;hi&lt;/b&gt; <svg'));
  assert.equal((out.match(/<svg/g) || []).length, 2);
  assert.ok(out.includes(':unknown:'));
  assert.ok(replaceShortcodes('❤️ and ❤').match(/<svg/g).length === 2);
});
t('tree-shakable data modules', () => {
  assert.equal(rocket.n, 'rocket');
  assert.ok(renderEmoji(rocket).includes('aria-label="Rocket"'));
});
t('stylesheet is prefixed', () => {
  assert.ok(css.includes('@keyframes gm-bounce') && !/@keyframes (?!gm-)/.test(css));
  assert.ok(!/\.anim\b/.test(css));
});
console.log(`\n${passed} checks passed`);
