import { LightningIcon } from 'assets/icons/icons';
import React, { FC, ReactElement, VFC } from 'react';

import styles from './styles.module.scss';

// eslint-disable-next-line no-shadow
export enum ENftTags {
  Auction = 'Auction',
  Promote = 'Promote',
  Owned = 'Owned',
  InStock = 'InStock',
}

interface INftTagLabel {
  styleClass: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: (props: any) => string | ReactElement;
}

type TTagsMap = {
  [key in ENftTags]: INftTagLabel
};

export type TTagsPropsMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in ENftTags]?: any;
};

export const TagsMap: TTagsMap = {
  Auction: {
    styleClass: 'accent',
    value: () => 'Auction',
  },
  Promote: {
    styleClass: 'promote',
    value: () => <LightningIcon />,
  },
  Owned: {
    styleClass: 'accent',
    value: (count) => `Owned: ${count}`,
  },
  InStock: {
    styleClass: 'accent',
    value: (count) => `In stock: ${count}`,
  },
};

interface INftTagProps extends INftTagLabel{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
}

const NFTTagLabel: VFC<INftTagProps> = ({ styleClass, value, props }) => (
  <div className={styles[styleClass]}>{value(props)}</div>
);

interface ITagsWrapper {
  tags?: ENftTags[];
  propsMap?: TTagsPropsMap;
}

export const TagsWrapper: FC<ITagsWrapper> = ({ children, tags = ['Auction', 'Promote', 'Owned', 'InStock'], propsMap }) => (
  <div className={styles.tagWrapper}>
    <div className={styles.tagBody}>
      <div className={styles.tagContent}>
        {tags.map((tag) => Boolean(propsMap?.[tag]) && (
        <NFTTagLabel
          {...TagsMap[tag]}
          props={propsMap[tag]}
        />
        ))}
      </div>
    </div>
    {children}
  </div>
);
