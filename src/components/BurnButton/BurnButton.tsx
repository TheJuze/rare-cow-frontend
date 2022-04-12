import React, { useCallback, VFC } from 'react';

import cn from 'clsx';

import './styles.scss';
import { Button } from 'components/Button';
import { Burn } from 'assets/icons/icons';

export interface BurnButtonProps {
  onBurn: () => void;
  className?: string;
}

/**
 * @param {() => void} onBurn - function which be called when the button has been clicked
 * @param {string} [className] - the wrapper class name
 */
export const BurnButton: VFC<BurnButtonProps> = ({ className, onBurn }) => {
  const onBurnButtonClickHandler = useCallback(() => {
    onBurn();
  }, [onBurn]);

  return (
    <Button variant="filled" color="secondary" onClick={onBurnButtonClickHandler} startAdornment={<Burn />} className={cn(className, 'burnButton')}>
      Burn
    </Button>
  );
};
