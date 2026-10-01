'use client';
import * as React from 'react';
import { renderEmoji, injectStyles } from './render.js';
import { getEmoji, replaceShortcodes } from './index.js';

let fallback = 0;
function useStableId() {
  if (React.useId) return React.useId();
  const ref = React.useRef(null);
  if (ref.current == null) ref.current = 'r' + (++fallback);
  return ref.current;
}

/**
 * Render one emoji from its data module. Use this for the smallest bundles:
 *   import heartEyes from 'gleemoji/emojis/heart-eyes'
 *   <EmojiIcon emoji={heartEyes} size={32} />
 */
export function EmojiIcon({ emoji, size = 24, variant = 'glossy', animate = 'hover', label, className, style, ...rest }) {
  const id = useStableId();
  React.useEffect(() => { injectStyles(); }, []);
  if (!emoji) return null;
  return React.createElement('span', {
    ...rest,
    className: className ? 'gm-wrap ' + className : 'gm-wrap',
    style: { display: 'inline-flex', lineHeight: 0, verticalAlign: 'middle', ...style },
    dangerouslySetInnerHTML: { __html: renderEmoji(emoji, { size, variant, animate, label, id }) },
  });
}

/** Render any emoji by name ("heart-eyes") or native character ("😍"). Includes the full set. */
export function Emoji({ name, ...props }) {
  return React.createElement(EmojiIcon, { emoji: getEmoji(name), ...props });
}

/** Render text with :shortcodes: and native emojis swapped for Gleemoji. */
export function EmojiText({ text, as = 'span', size, variant, animate, ...rest }) {
  React.useEffect(() => { injectStyles(); }, []);
  return React.createElement(as, { ...rest, dangerouslySetInnerHTML: { __html: replaceShortcodes(text || '', { size, variant, animate, injectStyles: false }) } });
}

export default Emoji;
