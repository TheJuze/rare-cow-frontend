import { ReactElement } from 'react';

// eslint-disable-next-line no-shadow
export enum EInputStatus {
  COMMON,
  SUCCESS,
  ERROR,
}

export type TInputCaption = {
  status: EInputStatus;
  caption: string | ReactElement;
};
