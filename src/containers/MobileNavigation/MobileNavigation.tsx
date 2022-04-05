import { VFC } from 'react';

import cn from 'clsx';

import s from './styles.module.scss';

export interface MobileNavigationProps {
  className?: string;
}

export const MobileNavigation: VFC<MobileNavigationProps> = ({ className }) => {
  return <div className={cn(s.MobileNavigation, className)} />;
};
