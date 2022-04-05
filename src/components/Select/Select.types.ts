import { CSSProperties } from 'react';

type CustomStyle = {
  [key: string]: string
};

type StyleFunction = (provided: CustomStyle, state: CSSProperties) => CustomStyle;

export type CustomStyles = {
  [key: string]: StyleFunction,
};

export type OptionType = {
  label: string,
  value: string | string[],
  icon?: string,
  address?: string,
  decimals?: number,
};

export enum SizeSelect {
  s,
  m,
  l,
}

export enum ColorSelect {
  light,
  dark,
}

export type SelectSize = keyof typeof SizeSelect;
export type SelectColor = keyof typeof ColorSelect;
