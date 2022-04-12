import React, { useMemo } from 'react';

import { useMediaQuery, useTheme } from '@material-ui/core';

import { getFormatMedia } from 'utils';

import { TOptionable } from 'types';
import { WindowFormat } from './useBreakpoints.types';

export const BreakpointsContext =
  React.createContext<TOptionable<WindowFormat>>(undefined);

export const BreakpointsProvider: React.FC = ({ children }) => {
  const theme = useTheme();
  const formatMedia = getFormatMedia(theme);

  const isTablet = useMediaQuery(formatMedia.BREAKPOINT_TABLET);
  const isDesktop = useMediaQuery(formatMedia.BREAKPOINT_DESKTOP);
  const isWideDesktop = useMediaQuery(formatMedia.BREAKPOINT_WIDE_DESKTOP);

  const format = useMemo(() => {
    if (isWideDesktop) {
      return WindowFormat.wideDesktop;
    }
    if (isDesktop) {
      return WindowFormat.desktop;
    }
    if (isTablet) {
      return WindowFormat.tablet;
    }
    return WindowFormat.mobile;
  }, [isWideDesktop, isDesktop, isTablet]);

  return (
    <BreakpointsContext.Provider value={format}>
      {children}
    </BreakpointsContext.Provider>
  );
};
