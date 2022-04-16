import { nftMock1, profileAvatar, usdt } from 'assets/img';
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
