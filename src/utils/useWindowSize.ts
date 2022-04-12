import { useCallback, useEffect, useState } from 'react';

export type TUseWindowSize = (sizes: number[]) => boolean[];
const useWindowSize: TUseWindowSize = (sizes) => {
  const [windowSize, setWindowSizes] = useState<boolean[]>([]);

  const onWindowResize = useCallback(() => {
    const width = window.innerWidth;
    const newWindowSizes = sizes.map((s) => s < width);
    if (windowSize.some((s, k) => s !== newWindowSizes[k])) {
      setWindowSizes(newWindowSizes);
    }
  }, [sizes, windowSize]);

  useEffect(() => {
    document.addEventListener('resize', onWindowResize);
    return () => document.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return windowSize;
};

export default useWindowSize;
