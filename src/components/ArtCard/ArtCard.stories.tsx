import { ComponentMeta, ComponentStory } from '@storybook/react';
import { nftMock1, profileAvatar, usdt } from 'assets/img';

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
];

const Template: ComponentStory<typeof ArtCard> = () => (
  <>
    {nfts.map((nft) => {
      const {
        name,
        image,
        currency,
        isAuction,
        price,
        id,
        endAuction,
        likesCount,
        isLiked,
        authorName,
        authorAvatar,
        authorId,
        standart,
        inStock,
      } = nft;
      return (
        <ArtCard
          name={name}
          image={image}
          currency={currency}
          isAuction={isAuction}
          price={price}
          id={id}
          endAuction={endAuction}
          likesCount={likesCount}
          isLiked={isLiked}
          authorName={authorName}
          authorAvatar={authorAvatar}
          authorId={authorId}
          standart={standart}
          inStock={inStock}
        />
      );
    })}
  </>
);
export const Default = Template.bind({});

Default.args = artCardPropsMocked;
