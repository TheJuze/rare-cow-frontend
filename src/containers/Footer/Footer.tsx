import React, { VFC } from 'react';

import cn from 'clsx';

import s from './styles.module.scss';

export interface FooterProps {
  className?: string;
}

export const Footer: VFC<FooterProps> = ({ className }) => (
  <footer className={cn(s.footer, className)}>Footer</footer>
);
