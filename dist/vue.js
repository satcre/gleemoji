import * as Vue from 'vue';
import { renderEmoji, injectStyles } from './render.js';
import { getEmoji, replaceShortcodes } from './index.js';

let fallback = 0;
const props = {
  size: { type: [Number, String], default: 24 },
  variant: { type: String, default: 'glossy' },
  animate: { type: [String, Boolean], default: 'hover' },
  label: { type: String, default: undefined },
};

function make(name, resolve) {
  return Vue.defineComponent({
    name,
    props: { ...props, name: String, emoji: Object },
    setup(p) {
      const id = Vue.useId ? Vue.useId() : 'v' + (++fallback);
      Vue.onMounted(() => injectStyles());
      return () => {
        const data = resolve(p);
        if (!data) return null;
        return Vue.h('span', {
          class: 'gm-wrap',
          style: 'display:inline-flex;line-height:0;vertical-align:middle',
          innerHTML: renderEmoji(data, { size: p.size, variant: p.variant, animate: p.animate, label: p.label, id }),
        });
      };
    },
  });
}

/** <Emoji name="heart-eyes" /> — any emoji by name or native character. */
export const Emoji = make('GleeEmoji', (p) => p.emoji || getEmoji(p.name));

/** <EmojiIcon :emoji="heartEyes" /> — pass a data module for the smallest bundles. */
export const EmojiIcon = make('GleeEmojiIcon', (p) => p.emoji);

/** <EmojiText text="Ship it :rocket:" /> */
export const EmojiText = Vue.defineComponent({
  name: 'GleeEmojiText',
  props: { text: String, as: { type: String, default: 'span' }, size: [Number, String], variant: String, animate: [String, Boolean] },
  setup(p) {
    Vue.onMounted(() => injectStyles());
    return () => Vue.h(p.as, { innerHTML: replaceShortcodes(p.text || '', { size: p.size, variant: p.variant, animate: p.animate, injectStyles: false }) });
  },
});

/** app.use(Gleemoji) registers <Emoji>, <EmojiIcon> and <EmojiText> globally. */
export default {
  install(app) {
    app.component('Emoji', Emoji);
    app.component('EmojiIcon', EmojiIcon);
    app.component('EmojiText', EmojiText);
  },
};
