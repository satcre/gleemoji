export type EmojiName = __NAMES__;
export type Variant = 'glossy' | 'flat' | 'outline';
/** loop = always animate, hover = animate on hover/focus, none = static. `true`/`false` map to loop/none. */
export type AnimateMode = 'loop' | 'hover' | 'none' | boolean;
export type CategoryId = 'smileys' | 'hearts' | 'people' | 'animals' | 'food' | 'nature' | 'objects' | 'symbols';

/** Raw emoji data, as exported by `gleemoji/emojis/<name>`. */
export interface EmojiData<N extends string = EmojiName> {
  n: N; l: string; c: CategoryId; k: string; u: string[];
  s: Record<Variant, string>;
}

export interface RenderOptions {
  /** Pixel number or any CSS length. Default 24. */
  size?: number | string;
  variant?: Variant;
  animate?: AnimateMode;
  /** Accessible label. Defaults to the emoji's name. Pass '' to hide it from screen readers. */
  label?: string;
  className?: string;
  /** Unique id used to keep gradient ids distinct. Generated if omitted. */
  id?: string;
}

export interface EmojiMeta { name: EmojiName; label: string; category: CategoryId; keywords: string[]; native: string[]; }

export const VARIANTS: Variant[];
export const css: string;
export const categories: { id: CategoryId; label: string }[];
export const emojis: EmojiMeta[];

export function renderEmoji(data: EmojiData<string>, opts?: RenderOptions): string;
export function injectStyles(doc?: Document): void;
export function getEmoji(nameOrNative: EmojiName | (string & {})): EmojiData | undefined;
export function toSVG(nameOrNative: EmojiName | (string & {}), opts?: RenderOptions & { injectStyles?: boolean }): string;
export function search(query: string, opts?: { category?: CategoryId; limit?: number }): EmojiName[];
export function replaceShortcodes(text: string, opts?: RenderOptions & { escape?: boolean; native?: boolean; injectStyles?: boolean }): string;
