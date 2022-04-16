/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  nftMock1, nftMock2, nftMock3, profileAvatar, usdt,
} from 'assets/img';

import { ArtCard } from './ArtCard';
import { artCardPropsMocked } from './ArtCard.mock';

export default {
  title: 'components/ArtCard',
  component: ArtCard,
} as ComponentMeta<typeof ArtCard>;

export interface INftMock {
  className?: string;
  media: string;
  name: string;
  highestBid?: any;
  minimalBid?: string | number;
  isAucSelling?: boolean;
  currency: any;
  price: string | number;
  id: string | number;
  endAuction: number;
  creator: any;
  likeCount: number;
  isLiked: boolean;
  standart: 'ERC721' | 'ERC1155';
  available: number;
}

export const nfts: INftMock[] = [
  {
    name: 'NFT name',
    media: nftMock1,
    currency: { image: usdt },
    isAucSelling: true,
    price: '',
    highestBid: { amount: '48.5' },
    id: '03423493',
    endAuction: 1649496517,
    likeCount: 22,
    isLiked: false,
    creator: {
      name: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      avtar: profileAvatar,
      url: '1',
    },
    standart: 'ERC721',
    available: 1,
  },
  {
    name: 'NFT name',
    media: nftMock2,
    currency: { image: usdt },
    isAucSelling: false,
    price: '',
    id: '03423493',
    endAuction: 0,
    likeCount: 28374283,
    isLiked: true,
    creator: {
      name: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      avtar: profileAvatar,
      url: 2,
    },
    standart: 'ERC721',
    available: 1,
  },
  {
    name: 'NFT name',
    media: nftMock3,
    currency: { image: usdt },
    isAucSelling: false,
    price: '4',
    id: '03423493',
    endAuction: 0,
    likeCount: 0,
    isLiked: false,
    creator: {
      name: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      avtar: profileAvatar,
      url: 3,
    },
    standart: 'ERC1155',
    available: 24,
  },
  {
    name: 'NFT name',
    media: nftMock1,
    currency: { image: usdt },
    isAucSelling: true,
    price: '',
    minimalBid: '41.54',
    id: '034493',
    endAuction: 1649496517,
    likeCount: 22,
    isLiked: false,
    creator: {
      name: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      avtar: profileAvatar,
      url: 4,
    },
    standart: 'ERC721',
    available: 1,
  },
  {
    name: 'NFT name',
    media: nftMock1,
    currency: { image: usdt },
    isAucSelling: true,
    price: '',
    minimalBid: '41.54',
    id: '0343',
    endAuction: 1649496517,
    likeCount: 22,
    isLiked: false,
    creator: {
      name: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      avtar: profileAvatar,
      url: 4,
    },
    standart: 'ERC721',
    available: 1,
  },
];

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
