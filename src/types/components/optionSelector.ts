import { ReactElement } from 'react';

export type TOption = {
  value: string;
  content: string | ReactElement;
  disabled?: boolean;
};
