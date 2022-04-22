/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArtCard } from './ArtCard';
import { artCardPropsMocked, nfts } from './ArtCard.mock';

export default {
  title: 'components/ArtCard',
  component: ArtCard,
} as ComponentMeta<typeof ArtCard>;

const Template: ComponentStory<typeof ArtCard> = () => (
  <>
    {nfts.map((nft) => {
      const {
        id,
        name,
        price,
        highestBid,
        minimalBid,
        media,
        currency,
        creator,
        isAucSelling,
        standart,
        likeCount,
        isLiked,
        available,
        endAuction,
      } = nft;
      return (
        <ArtCard
          id={id || 0}
          inStock={available}
          name={name}
          price={price || highestBid?.amount || minimalBid}
          media={media || ''}
          currency={currency?.image || ''}
          authorName={creator?.name || ''}
          authorAvatar={creator?.avatar || ''}
          authorId={creator?.url || '0'}
          isAuction={isAucSelling || Boolean(endAuction)}
          likeCount={likeCount}
          isLiked={isLiked}
          standart={standart}
          endAuction={endAuction}
        />
      );
    })}
  </>
);
export const Default = Template.bind({});

Default.args = artCardPropsMocked;
