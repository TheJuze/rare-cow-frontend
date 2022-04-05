enum ColorValues {
  default,
  secondary,
  error,
}

enum SizeValues {
  xs,
  s,
  m,
  l,
}

enum WeightValues {
  normal,
  medium,
  semiBold,
  bold,
}

enum Aligns {
  center,
  left,
  right,
}

enum HeadingTypes {
  h1,
  h2,
  h3,
}

export type TextColor = keyof typeof ColorValues;
export type TextSize = keyof typeof SizeValues;
export type TextWeight = keyof typeof WeightValues;
export type TextAlign = keyof typeof Aligns;
export type HeadingType = keyof typeof HeadingTypes;
