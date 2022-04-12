import { VFC } from 'react';

import cn from 'clsx';

import { HighlightedText } from 'components/HighlightedText';
import { Text } from 'components/Typography';
import styles from './styles.module.scss';

export interface SearchItemProps {
  name: string;
  filter: string;
  media?: string;
  disabled?: boolean;
  onClick?: () => void;
  allMatches?: boolean;
}

export const SearchItem: VFC<SearchItemProps> = ({
  media,
  name,
  filter,
  disabled,
  onClick,
  allMatches,
}) => {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={cn(styles.searchItem, { [styles.disabled]: disabled })}
      onClick={onClick}
    >
      <div className={cn(styles.icon)}>
        <img className={cn(styles.iconContent)} src={media} alt="🖼️" />
      </div>
      <div className={cn(styles.info)}>
        <Text className={cn(styles.title)}>
          <HighlightedText allMatches={allMatches} filter={filter} text={name} />
        </Text>
      </div>
    </div>
  );
};
