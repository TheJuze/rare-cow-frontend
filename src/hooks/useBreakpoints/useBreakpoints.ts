import { useContext } from 'react';

import { BreakpointsContext } from './breakpointsContext';
import { WindowFormat } from './useBreakpoints.types';

export type BreakpointsConfig<T> = Record<WindowFormat, T>;

export const useBreakpoints = <T>(config: BreakpointsConfig<T>): T => {
  const format = useContext(BreakpointsContext);

  return config?.[format];
};
