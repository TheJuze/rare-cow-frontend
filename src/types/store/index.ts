import type { Dispatch as DispatchReact } from 'react';
import { CollectionsState } from './collections';
import { ModalsInitialState } from './modals';
import { NftsState } from './nft';
import { UserState } from './user';

export * from './user';
export * from './ui';
export * from './modals';
export * from './nft';
export * from './collections';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T, P = any, M = void> = { type: T; payload?: P; meta?: M };
export type Dispatch = DispatchReact<{ type: string }>;

export type State = {
  user: UserState;
  modals: ModalsInitialState;
  nfts: NftsState;
  collections: CollectionsState;
};
