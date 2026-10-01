import type { DefineComponent, Plugin } from 'vue';
import type { EmojiData, EmojiName, Variant, AnimateMode } from './index.js';

interface Base { size?: number | string; variant?: Variant; animate?: AnimateMode; label?: string; }
export const Emoji: DefineComponent<Base & { name?: EmojiName | (string & {}); emoji?: EmojiData<string> }>;
export const EmojiIcon: DefineComponent<Base & { emoji: EmojiData<string> }>;
export const EmojiText: DefineComponent<{ text: string; as?: string; size?: number | string; variant?: Variant; animate?: AnimateMode }>;
declare const plugin: Plugin;
export default plugin;
