/* eslint-disable max-len */
import React, { useMemo } from 'react';

import { TOptionable } from 'types';
import useWindowSize from 'utils/useWindowSize';
import { WindowFormat } from './useBreakpoints.types';

export const BreakpointsContext = React.createContext<TOptionable<WindowFormat>>(undefined);

export const BreakpointsProvider: React.FC = ({ children }) => {
  const [isTablet, isMiddleMobile, isDesktop, isWideDesktop] = useWindowSize([
    390, 474, 1024, 1440,
  ]);

  const format = useMemo(() => {
    if (isWideDesktop) {
      return WindowFormat.wideDesktop;
    }
    if (isDesktop) {
      return WindowFormat.desktop;
    }
    if (isMiddleMobile) {
      return WindowFormat.middleMobile;
    }
    if (isTablet) {
      return WindowFormat.tablet;
    }
    return WindowFormat.mobile;
  }, [isWideDesktop, isDesktop, isTablet, isMiddleMobile]);

  return <BreakpointsContext.Provider value={format}>{children}</BreakpointsContext.Provider>;
};
