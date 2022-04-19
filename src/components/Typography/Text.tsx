/* eslint-disable max-len */
import {
  FC, PropsWithChildren, createElement, CSSProperties,
} from 'react';
import cn from 'clsx';
import {
  TextAlign as Align,
  TextColor as Color,
  TextSize as Size,
  TextWeight as Weight,
} from 'types';

import styles from './styles.module.scss';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p' | 'span';

// eslint-disable-next-line @typescript-eslint/naming-convention
type variantType = 'display-1' | 'heading-1' | 'heading-2' | 'heading-2' | 'subtitle-1' | 'body-1' | 'body-2' | 'medium-body';

const tagMap = {
  'display-1': 'h1',
  'heading-1': 'h2',
  'heading-2': 'h3',
  'subtitle-1': 'h4',
  'body-1': 'p',
  'body-2': 'p',
  'medium-body': 'p',
};

type Props = {
  tag?: Tag;
  variant?: variantType;
  className?: string;
  style?: CSSProperties;
  size?: Size;
  color?: Color;
  align?: Align;
  weight?: Weight;
};

/**
 * @param {('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p' | 'span')} [tag] - type of the element (all font tags), if not passed, `variant` will be used
 * @param {('display-1' | 'heading-1' | 'heading-2' | 'heading-2' | 'subtitle-1' | 'body-1' | 'body-2' | 'medium-body')} [variant] - styles of the tag `initial = body-1`
 * * `display-1` - weight = 700, font-size = 60px, line-height = 86px
 * * `heading-1` - weight = 600, font-size = 48px, line-height = 58px
 * * `heading-2` - weight = 500, font-size = 36px, line-height = 52px
 * * `subtitle-1` - weight = 500, font-size = 30px, line-height = 45px
 * * `body-1` - weight = 400, font-size = 18px, line-height = 30px
 * * `body-2` - weight = 400, font-size = 16px, line-height = 24px
 * * `medium-body` - weight = 500, font-size = 12px, line-height = 16px
 * @param {( xs | s | m | l)} [size] - extra sizes of the font
 * * xs - font-size = 14px, line-height = 20px
 * * s - font-size = 14px, line-height = 24px
 * * m - font-size = 24px, line-height = 68px
 * * l - empty
 * @param {(default, secondary, error, gray6, dark, accent, light3, iris100, metal800)} [color] - color of the font `initial = default`
 * * default - $metal500
 * * secondary - $metal500
 * * error - $red
 * * gray6 - $gray-6
 * * dark - $dark
 * * accent - $accent
 * * light3 - $light-3
 * * iris100 - $iris-100
 * * metal800 - $metal-800
 * @param {(left | center | right)} [align] - alignment of the font `initial = left`
 * * left
 * * center
 * * right
 * @param {(normal | medium | semiBold | bold)} [weight] - weight of the font `initial = normal`
 * * normal = 400
 * * medium = 500
 * * semiBold = 600
 * * bold = 700
 */
const Text: FC<PropsWithChildren<Props>> = ({
  tag,
  variant = 'body-1',
  children,
  className,
  style = {},
  size,
  color = 'default',
  align = 'left',
  weight = 'normal',
}) => createElement(
  tag || tagMap[variant],
  {
    style,
    className: cn(
      styles.text,
      styles[size],
      styles[color],
      styles[align],
      styles[`${weight}Weight`],
      styles[variant],
      className,
    ),
  },
  [children],
);

export default Text;
