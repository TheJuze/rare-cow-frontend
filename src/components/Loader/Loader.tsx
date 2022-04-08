import { VFC } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface LoaderProps {
  className?: string;
  variant?: 'primary' | 'gray50';
  size?: 'lg' | 'md' | 'sm' | 'extra-sm';
}

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
