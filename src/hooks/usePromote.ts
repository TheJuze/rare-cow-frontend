import { IPromoteContext, PromoteContext } from 'context/Promote';
import { Context, useContext } from 'react';

export const usePromote = () => useContext(PromoteContext as Context<IPromoteContext>);
