import { createContext, Dispatch } from 'react';
import { InitialState } from './PromoteProvider';
import { PromoteActionsType } from './PromoteActionCreators';

export interface IPromoteContext {
  state: InitialState,
  dispatch: Dispatch<PromoteActionsType>,
}

export const PromoteContext = createContext<IPromoteContext | null>(null);
