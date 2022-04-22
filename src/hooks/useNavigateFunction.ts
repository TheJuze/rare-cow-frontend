import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigateFunction = (route: string) => {
  const navigator = useNavigate();

  const navigateFunc = useCallback(() => {
    navigator(route);
  }, [navigator, route]);

  return navigateFunc;
};

export default useNavigateFunction;
