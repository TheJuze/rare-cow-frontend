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

interface INftMock {
  className?: string;
  image: string;
  name: string;
  isAuction?: boolean;
  currency: string;
  price: string | number;
  id: string | number;
  endAuction: number;
  authorId: string | number;
  authorAvatar: string;
  authorName: string;
  likesCount: number;
  isLiked: boolean;
  standart: 'ERC721' | 'ERC1155';
  inStock: number;
}

const nfts: INftMock[] = [
  {
    name: 'NFT name',
    image: nftMock1,
    currency: usdt,
    isAuction: true,
    price: '54.7',
    id: '03423493',
    endAuction: 1649496517,
    likesCount: 22,
    isLiked: false,
    authorName: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
    authorAvatar: profileAvatar,
    authorId: 1,
    standart: 'ERC721',
    inStock: 1,
  },
  {
    name: 'NFT name',
    image: nftMock2,
    currency: usdt,
    isAuction: false,
    price: '',
    id: '03423493',
    endAuction: 0,
    likesCount: 212223428374283,
    isLiked: true,
    authorName: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
    authorAvatar: profileAvatar,
    authorId: 2,
    standart: 'ERC721',
    inStock: 1,
  },
  {
    name: 'NFT name',
    image: nftMock3,
    currency: usdt,
    isAuction: false,
    price: '4',
    id: '03423493',
    endAuction: 0,
    likesCount: 0,
    isLiked: false,
    authorName: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
    authorAvatar: profileAvatar,
    authorId: 2,
    standart: 'ERC1155',
    inStock: 24,
  },
];

const Template: ComponentStory<typeof ArtCard> = () => (
  <>
    {nfts.map((nft) => (
      <ArtCard {...nft} />
    ))}
  </>
);
export const Default = Template.bind({});

Default.args = artCardPropsMocked;
