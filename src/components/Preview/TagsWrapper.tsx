import React, { FC, ReactElement, VFC } from 'react';

// eslint-disable-next-line no-shadow
export enum ENftTags {
  Auction = 'Auction',
}

export const TagsMap = {
  Auction: {
    styleClass: 'accent',
    value: 'Auction',
  },
};

interface INftTagLabel {
  styleClass: string;
  value: string | ReactElement;
}

const NFTTagLabel: VFC<INftTagLabel> = ({ styleClass, value }) => (
  <div className={styleClass}>{value}</div>
);

interface ITagsWrapper {
  promoted?: boolean;
  tags?: ENftTags[];
}

export const TagsWrapper: FC<ITagsWrapper> = ({ children, tags, promoted }) => (
  <div>
    <div>
      <div>
        {tags.map((tag) => (
          <NFTTagLabel {...TagsMap[tag]} />
        ))}
      </div>
      <div>{promoted && <NFTTagLabel styleClass="promoted" value="promoted" />}</div>
    </div>
    {children}
  </div>
);
