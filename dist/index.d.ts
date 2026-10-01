export type EmojiName = 'grinning' | 'beaming' | 'slight-smile' | 'smile' | 'laughing' | 'joy' | 'rofl' | 'sweat-smile' | 'wink' | 'relieved' | 'halo' | 'smiling-hearts' | 'heart-eyes' | 'star-struck' | 'kiss' | 'kiss-closed' | 'yum' | 'tongue' | 'zany' | 'money-mouth' | 'cool' | 'nerd' | 'cowboy' | 'party' | 'monocle' | 'smirk' | 'raised-brow' | 'neutral' | 'expressionless' | 'unamused' | 'eye-roll' | 'grimace' | 'zipper' | 'thinking' | 'pensive' | 'sleepy' | 'drooling' | 'tired' | 'mask' | 'nauseated' | 'hot' | 'freezing' | 'woozy' | 'dizzy' | 'knocked-out' | 'shocked' | 'astonished' | 'scream' | 'fearful' | 'worried' | 'pleading' | 'sad' | 'disappointed' | 'tear-smile' | 'crying' | 'sobbing' | 'persevering' | 'angry' | 'furious' | 'triumph' | 'devil' | 'skull' | 'ghost' | 'alien' | 'robot' | 'poop' | 'clown' | 'heart' | 'orange-heart' | 'yellow-heart' | 'green-heart' | 'blue-heart' | 'purple-heart' | 'pink-heart' | 'brown-heart' | 'black-heart' | 'white-heart' | 'broken-heart' | 'sparkling-heart' | 'two-hearts' | 'heart-arrow' | 'heart-ribbon' | 'mending-heart' | 'raised-hand' | 'wave' | 'thumbs-up' | 'thumbs-down' | 'victory' | 'point-up' | 'point-right' | 'metal' | 'ok-hand' | 'fist' | 'clap' | 'pray' | 'muscle' | 'eyes' | 'lips' | 'brain' | 'cat' | 'dog' | 'bear' | 'panda' | 'fox' | 'frog' | 'pig' | 'mouse' | 'rabbit' | 'monkey' | 'tiger' | 'lion' | 'koala' | 'cow' | 'chick' | 'unicorn' | 'owl' | 'penguin' | 'fish' | 'octopus' | 'butterfly' | 'bee' | 'turtle' | 'apple' | 'green-apple' | 'orange' | 'lemon' | 'banana' | 'cherries' | 'strawberry' | 'watermelon' | 'peach' | 'grapes' | 'avocado' | 'carrot' | 'pizza' | 'burger' | 'fries' | 'donut' | 'cake' | 'ice-cream' | 'cookie' | 'coffee' | 'boba' | 'taco' | 'popcorn' | 'egg' | 'cupcake' | 'beer' | 'croissant' | 'cheese' | 'sushi' | 'sun' | 'moon' | 'cloud' | 'rain' | 'storm' | 'snowflake' | 'rainbow' | 'umbrella' | 'droplet' | 'water-wave' | 'tree' | 'evergreen' | 'palm' | 'blossom' | 'sunflower' | 'tulip' | 'clover' | 'cactus' | 'mushroom' | 'seedling' | 'leaf' | 'globe' | 'snowman' | 'fire' | 'bolt' | 'comet' | 'trophy' | 'medal' | 'balloon' | 'party-popper' | 'basketball' | 'soccer' | 'gamepad' | 'dice' | 'puzzle' | 'music' | 'headphones' | 'microphone' | 'camera' | 'phone' | 'laptop' | 'book' | 'pencil' | 'paperclip' | 'pushpin' | 'map-pin' | 'lock' | 'unlock' | 'key' | 'bell' | 'megaphone' | 'envelope' | 'package' | 'calendar' | 'alarm' | 'hourglass' | 'magnifier' | 'gear' | 'bomb' | 'battery' | 'magnet' | 'money-bag' | 'coin' | 'banknote' | 'credit-card' | 'gem' | 'airplane' | 'car' | 'house' | 'candle' | 'target' | 'chart-up' | 'chart-down' | 'clipboard' | 'memo' | 'folder' | 'flag' | 'shield' | 'palette' | 'crown' | 'rocket' | 'bulb' | 'gift' | 'check' | 'cross' | 'star' | 'sparkles' | 'hundred' | 'warning' | 'no-entry' | 'prohibited' | 'question' | 'exclamation' | 'info' | 'plus' | 'minus' | 'arrow-up' | 'arrow-right' | 'arrow-down' | 'arrow-left' | 'refresh' | 'speech' | 'thought' | 'anger' | 'boom' | 'dash' | 'dizzy-star' | 'zzz' | 'infinity' | 'recycle' | 'peace' | 'yin-yang' | 'red-circle' | 'orange-circle' | 'yellow-circle' | 'green-circle' | 'blue-circle' | 'purple-circle' | 'brown-circle' | 'black-circle' | 'white-circle' | 'red-square' | 'orange-square' | 'yellow-square' | 'green-square' | 'blue-square' | 'purple-square';
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
