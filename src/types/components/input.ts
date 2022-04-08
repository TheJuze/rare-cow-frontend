import { ReactElement } from 'react';

export enum EInputStatus {
  COMMON,
  SUCCESS,
  ERROR,
}

export type TInputCaption = {
  status: EInputStatus;
  caption: string | ReactElement;
};
