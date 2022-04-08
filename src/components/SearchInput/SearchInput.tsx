import { VFC } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface SearchInputProps {
  className?: string;
}

export const SearchInput: VFC<SearchInputProps> = ({ className }) => {
  return (
    <div className={cn('searchInput', className)}>
      Hello World!
    </div>
  );
};
