/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  nftMock1, nftMock2, nftMock3, profileAvatar, usdt,
} from 'assets/img';
import { ArtCardProps } from './ArtCard';

export const artCardPropsMocked: ArtCardProps = {
  name: 'NFT name',
  media: nftMock1,
  currency: usdt,
  isAuction: true,
  price: '54.7',
  id: '03423493',
  endAuction: 1649496517,
  likeCount: 22,
  isLiked: false,
  authorName: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
  authorAvatar: profileAvatar,
  authorId: 1,
  standart: 'ERC721',
  inStock: 1,
};

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
    id: '034293',
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
    id: '0342349',
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
