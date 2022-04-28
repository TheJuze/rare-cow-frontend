import { ReactElement } from 'react';

export type TBarOption = {
  value: string;
  name?: string;
  icon?: ReactElement;
  redirect?: boolean;
};
