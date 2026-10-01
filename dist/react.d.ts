import type { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';
import type { EmojiData, EmojiName, Variant, AnimateMode } from './index.js';

interface BaseProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'dangerouslySetInnerHTML'> {
  size?: number | string;
  variant?: Variant;
  animate?: AnimateMode;
  label?: string;
}
export interface EmojiProps extends BaseProps { name: EmojiName | (string & {}); }
export interface EmojiIconProps extends BaseProps { emoji: EmojiData<string>; }
export interface EmojiTextProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'dangerouslySetInnerHTML'> {
  text: string; as?: ElementType; size?: number | string; variant?: Variant; animate?: AnimateMode;
}

export function Emoji(props: EmojiProps): ReactElement | null;
export function EmojiIcon(props: EmojiIconProps): ReactElement | null;
export function EmojiText(props: EmojiTextProps): ReactElement;
export default Emoji;
