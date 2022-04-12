import React, { VFC } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface SearchInputProps {
  className?: string;
}

export const SearchInput: VFC<SearchInputProps> = ({ className }) => <div className={cn('searchInput', className)}>Hello World!</div>;
