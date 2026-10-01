# Gleemoji

Original, animated SVG emojis for React, Vue, Svelte, Angular and plain HTML.

- **278 emojis** across smileys, hearts, hands, animals, food, nature, objects and symbols
- **Three styles**: `glossy`, `flat` and `outline` (outline follows your text color)
- **Built-in animation**: every emoji has its own motion, done in plain CSS. Choose `loop`, `hover` or `none`
- **Tree-shakable**: import one emoji and ship about 3 KB
- **Zero dependencies**, server-rendering friendly, typed for TypeScript
- **Accessible**: labelled for screen readers, and animation stops when reduced motion is on

## Install

```bash
npm install gleemoji
```

## React (and Next.js)

```jsx
import { Emoji } from 'gleemoji/react';

export function Reaction() {
  return <Emoji name="heart-eyes" size={32} />;
}
```

| Prop | Type | Default |
|---|---|---|
| `name` | emoji name (`"heart-eyes"`) or native character (`"😍"`) | required |
| `size` | number (px) or CSS length (`"1.5em"`) | `24` |
| `variant` | `"glossy"` \| `"flat"` \| `"outline"` | `"glossy"` |
| `animate` | `"loop"` \| `"hover"` \| `"none"` | `"hover"` |
| `label` | accessible label. `""` hides it from screen readers | emoji name |

Smallest bundle: import only the emojis you use.

```jsx
import { EmojiIcon } from 'gleemoji/react';
import rocket from 'gleemoji/emojis/rocket';

<EmojiIcon emoji={rocket} size={24} animate="loop" />
```

Text with shortcodes or native emojis:

```jsx
import { EmojiText } from 'gleemoji/react';

<EmojiText text="Shipped it :rocket: 🎉" />
```

The React components are client components (`'use client'`) and work in the Next.js App Router.

## Vue (and Nuxt)

```vue
<script setup>
import { Emoji } from 'gleemoji/vue';
</script>

<template>
  <Emoji name="party" :size="32" animate="loop" />
</template>
```

Or register globally:

```js
import Gleemoji from 'gleemoji/vue';
app.use(Gleemoji); // <Emoji>, <EmojiIcon>, <EmojiText>
```

## Plain HTML, Svelte, Angular, Astro: web component

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/gleemoji/dist/element.js"></script>

<glee-emoji name="rocket" size="32" animate="loop"></glee-emoji>
```

Or with a bundler: `import 'gleemoji/element';`

## Plain JavaScript

```js
import { toSVG, replaceShortcodes, search, emojis } from 'gleemoji';

el.innerHTML = toSVG('fire', { size: 48, variant: 'flat', animate: 'loop' });
msg.innerHTML = replaceShortcodes('Ship it :rocket:'); // escapes the text for you
search('love');      // ['smiling-hearts', 'heart-eyes', 'kiss', ...]
emojis.length;       // 278, each with name, label, category, keywords, native
```

`toSVG` works on the server too. It returns a string and only touches the page to add the animation styles once.

## Animation styles and server rendering

The components add a small stylesheet (about 11 KB) the first time they render. If you render on the server and want animations ready before your JavaScript loads, import the stylesheet yourself:

```js
import 'gleemoji/styles.css';
```

Hover animation plays when the pointer is over the emoji. To play it when a larger element is hovered (a button or a list row), add the class `gm-trigger` to that element.

## Emoji names

Browse every emoji, style and animation in the gallery, or list them in code:

```js
import { emojis, categories } from 'gleemoji';
```

## Development

```bash
npm run build   # regenerate dist/ from the drawings in art/
npm test
```

The drawings live in `art/` as code. Each emoji is a small function that draws its shapes, and the build turns them into the three styles.

## License

MIT. The emoji artwork is original to Gleemoji and is included under the same license.
