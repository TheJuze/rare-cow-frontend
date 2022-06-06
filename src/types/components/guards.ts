import { State } from 'types/store';

export type TGuards = 'auth' | 'is-me';

export type TGuardsAction = {
  [keys in TGuards]: {
    check: (value: State) => boolean;
    errorMsg?: string;
  };
};
