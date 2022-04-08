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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currency: any;
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
    currency: { image: usdt },
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
      return (
        <ArtCard
          name={nft.name}
          image={nft.image}
          currency={nft.currency}
          isAuction={nft.isAuction}
          price={nft.price}
          id={nft.id}
          endAuction={nft.endAuction}
          likesCount={nft.likesCount}
          isLiked={nft.isLiked}
          authorName={nft.authorName}
          authorAvatar={nft.authorAvatar}
          authorId={nft.authorId}
          standart={nft.standart}
          inStock={nft.inStock}
        />
      );
    })}
  </>
);
export const Default = Template.bind({});

Default.args = artCardPropsMocked;
