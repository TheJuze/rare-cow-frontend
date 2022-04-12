import { VFC } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface LoaderProps {
  className?: string;
  variant?: 'primary' | 'gray50';
  size?: 'lg' | 'md' | 'sm' | 'extra-sm';
}

/**
 * @param {string} [className] - the wrapper class name
 * @param {('primary' | 'gray50')} [variant] - set the color scheme `initial = primary`
 * * primary - background color is similar to the block color
 * * gray50 - background color is gray50
 * @param {('lg' | 'md' | 'sm' | 'extra-sm')} [size] - the size of the loader `initial = md`
 * * extra-sm - 16.5x16.5
 * * sm - 25x25
 * * md - 50x50
 * * large - 100x100
 */
export const Loader: VFC<LoaderProps> = ({
  className,
  variant = 'primary',
  size = 'md',
}) => {
  return (
    <div className={cn('loader-wrapper', className, `loader-${size}`)}>
      <div className={cn('loader-body', 'loader-circle', `loader-${variant}`)} />
    </div>
  );
};
