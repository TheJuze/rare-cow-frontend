import { useEffect, useState } from 'react';

import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';

import { WindowState } from './useWindowState.types';

export const useWindowState = (): WindowState => {
  const [windowState, setWindowState] = useState<WindowState>(() => ({
    width: undefined,
    height: undefined,
    token: uuidv4(),
  }));
  const [windowStateCached] = useDebounce(windowState, 300);

  useEffect(() => {
    const handleResize = () => setWindowState({
      width: window.innerWidth,
      height: window.innerHeight,
      token: uuidv4(),
    });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowStateCached;
};
