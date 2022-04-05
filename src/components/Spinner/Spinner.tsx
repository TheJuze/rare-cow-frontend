import React, { VFC } from 'react';

import cn from 'clsx';

import styles from './styles.module.scss';

export interface SpinnerProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Spinner: VFC<SpinnerProps> = ({ className, width, height }) => {
  return (
    <div className={cn(styles.loader, className)}>
      <svg className={styles.icon} width={width || 41} height={height || 41} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M20.5 37C29.6127 37 37 29.6127 37 20.5C37 11.3873 29.6127 4 20.5 4C11.3873 4 4 11.3873 4 20.5C4 29.6127 11.3873 37 20.5 37Z" stroke="green" strokeWidth="2.22689" />
        <path d="M8.88281 32.2172C11.8647 35.1738 15.969 37 20.4999 37V37C29.6126 37 36.9999 29.6127 36.9999 20.5C36.9999 11.3873 29.6126 4 20.4999 4" stroke="green" strokeWidth="2.22689" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
