import { VFC } from 'react';

import cn from 'clsx';

import s from './styles.module.scss';

export interface FooterProps {
  className?: string;
}

export const Footer: VFC<FooterProps> = ({ className }) => {
  return <footer className={cn(s.footer, className)}>Footer</footer>;
};
