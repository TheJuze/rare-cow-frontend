/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC } from 'react';

import { useBreakpoints } from 'hooks';
import styles from './styles.module.scss';
import { NftCreators, NftInfo, NftOwners, NftPayment } from './components';

const nft = {
  id: 133,
  is_selling: false,
  is_auc_selling: true,
  is_timed_auc_selling: false,
  name: 'auction',
  media: 'https://ipfs11.rocknblock.io/ipfs/QmbLBEqoAG7APmCBX3HcNkPGJLwGbsN9BqfqxxckkZbcvE',
  animation: null,
  total_supply: 1,
  price: 2,
  currency: {
    rate: '391.66000000',
    symbol: 'PHETA',
    name: 'Pheta',
    image: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
  },
  available: 1,
  usd_price: 1174.98,
  standart: 'ERC721',
  collection: {
    url: 19,
    description: '',
    floor_price: 3.0,
    name: 'Single Default Collection',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmfNwxk14Cr65qNC9UjJiJSEwZxVNgWCjt3N9BWXnMvMUx',
    address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
    display_theme: 'Padded',
    is_default: true,
    is_nsfw: false,
    cover: null,
    standart: 'ERC721',
    symbol: 'SINGLE',
  },
  creator: {
    id: 4,
    url: 4,
    name: 'Alena',
    address: '0xc2fdfe804a9c4f105467d5f6703769256c092b2a',
    display_name: 'Alena',
    custom_url: null,
    created_at: '2022-03-09T13:55:32.093234Z',
    site: 'www.google.com',
    is_verificated: false,
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmNyL3yYQEjFGoFdN2kHYTcqQcx15LnaSHHyoTHAnZ5jdc',
    bio: 'Hello\r\nhello',
    twitter: '',
    instagram: '@aleesh_ka',
    facebook: null,
    email: 'alena@yandex.ru',
  },
  is_liked: false,
  like_count: 0,
  minimal_bid: 1,
  description:
    "Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday Thanks god it's Friday friday friday fri",
  royalty: 0,
  created_at: '2022-03-31T07:38:11.928800Z',
  format: 'image',
  network: {
    ipfs_icon: null,
    name: 'Binance-Smart-Chain',
    short_name: 'BSC',
    native_symbol: 'BNB',
    currencies: [
      {
        rate: '391.66000000',
        symbol: 'PHETA',
        name: 'Pheta',
        image:
          'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
      },
    ],
  },
  external_link: null,
  has_digital_key: false,
  sellers: [],
  owners: [
    {
      id: 4,
      url: 4,
      name: 'Alena',
      address: '0xc2fdfe804a9c4f105467d5f6703769256c092b2a',
      display_name: 'Alena',
      custom_url: null,
      created_at: '2022-03-09T13:55:32.093234Z',
      site: 'www.google.com',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmNyL3yYQEjFGoFdN2kHYTcqQcx15LnaSHHyoTHAnZ5jdc',
      bio: 'Hello\r\nhello',
      twitter: '',
      instagram: '@aleesh_ka',
      facebook: null,
      email: 'alena@yandex.ru',
      created_tokens_count: 11,
      owned_tokens_count: 9,
      quantity: 1,
      price: 2,
      currency: {
        rate: '391.66000000',
        symbol: 'USDT',
        name: 'Usdt',
        image:
          'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
      },
    },
  ],
  selling: true,
  start_auction: null,
  end_auction: 1651354842,
  digital_key: null,
  bids: [
    {
      id: 20,
      quantity: 1,
      amount: '3.000000000000000000',
      currency: {
        rate: '391.66000000',
        symbol: 'PHETA',
        name: 'Pheta',
        image:
          'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
      },
      state: 'Committed',
      user: {
        id: 21,
        url: 21,
        name: '0x063c22e0917b4b051cb81ef91c5052cd8c0d0e56',
        address: '0x063c22e0917b4b051cb81ef91c5052cd8c0d0e56',
        display_name: null,
        custom_url: null,
        created_at: '2022-03-25T13:47:08.472541Z',
        site: null,
        is_verificated: false,
        avatar: 'https://ipfs11.rocknblock.io/ipfs/QmaBHkDYUxVShc5mBGRgxCJnk8GEUatgLeZQUjrrbRAKSb',
        bio: null,
        twitter: null,
        instagram: null,
        facebook: null,
        email: '',
      },
    },
  ],
  highest_bid: {
    id: 20,
    quantity: 1,
    amount: '3.000000000000000000',
    currency: {
      rate: '391.66000000',
      symbol: 'PHETA',
      name: 'Pheta',
      image: 'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
    },
    state: 'Committed',
    user: {
      id: 21,
      url: 21,
      name: '0x063c22e0917b4b051cb81ef91c5052cd8c0d0e56',
      address: '0x063c22e0917b4b051cb81ef91c5052cd8c0d0e56',
      display_name: null,
      custom_url: null,
      created_at: '2022-03-25T13:47:08.472541Z',
      site: null,
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmaBHkDYUxVShc5mBGRgxCJnk8GEUatgLeZQUjrrbRAKSb',
      bio: null,
      twitter: null,
      instagram: null,
      facebook: null,
      email: '',
    },
  },
  highest_bid_usd: 1174.98,
  minimal_bid_usd: 1174.98,
  multiple_currency: false,
  tags: [{ id: 1, name: 'Category №1' }],
  history: [
    {
      id: 196,
      date: '2022-03-31T07:39:43.021159Z',
      method: 'Listing',
      new_owner: null,
      old_owner: {
        id: 4,
        url: 4,
        name: 'Alena',
        address: '0xc2fdfe804a9c4f105467d5f6703769256c092b2a',
        display_name: 'Alena',
        custom_url: null,
        created_at: '2022-03-09T13:55:32.093234Z',
        site: 'www.google.com',
        is_verificated: false,
        avatar: 'https://ipfs11.rocknblock.io/ipfs/QmNyL3yYQEjFGoFdN2kHYTcqQcx15LnaSHHyoTHAnZ5jdc',
        bio: 'Hello\r\nhello',
        twitter: '',
        instagram: '@aleesh_ka',
        facebook: null,
        email: 'alena@yandex.ru',
      },
      price: '1.000000000000000000',
      USD_price: '444.38',
      amount: 0,
      currency: {
        rate: '391.66000000',
        symbol: 'USDT',
        name: 'Usdt',
        image:
          'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615',
      },
    },
  ],
  service_fee: 3.0,
  currency_service_fee: 0.09,
  usd_service_fee: 11.75,
  internal_id: 56,
  views_count: 4,
  properties: [
    { value: 'value', trait_type: 'test', display_type: 'properties' },
    { value: 'value2', trait_type: 'test2', display_type: 'properties' },
  ],
  stats: null,
  rankings: null,
};

const NftPage: FC = () => {
  const [isMobile] = useBreakpoints([767]);

  if (isMobile) {
    return (
      <div className={styles.nftWrapper}>
        <NftInfo
          name={nft.name}
          id={nft.id}
          description={nft.description}
          likeCount={nft.like_count}
          isLiked={nft.is_liked}
        />
        <div className={styles.nftImage}>
          <img src={nft.media} alt="nft" />
        </div>
        <NftPayment
          endAuction={nft.end_auction}
          price={nft.price}
          usdPrice={nft.usd_price}
          isAucSelling={nft.is_auc_selling}
          isTimedAucSelling={nft.is_timed_auc_selling}
          highestBid={nft.highest_bid}
        />
        <NftCreators
          creatorAvatar={nft.creator.avatar}
          creatorId={String(nft.creator.url)}
          creatorName={nft.creator.display_name}
          collectionAvatar={nft.collection.avatar}
          collectionId={String(nft.collection.url)}
          collectionName={nft.collection.name}
        />
        <NftOwners owners={nft.owners} properties={nft.properties} history={nft.history} />
      </div>
    );
  }

  return (
    <div className={styles.nftWrapper}>
      <div className={styles.nftImage}>
        <img src={nft.media} alt="nft" />
      </div>
      <div className={styles.nftBlock}>
        <NftInfo
          name={nft.name}
          id={nft.id}
          description={nft.description}
          likeCount={nft.like_count}
          isLiked={nft.is_liked}
        />
        <NftPayment
          endAuction={nft.end_auction}
          price={nft.price}
          usdPrice={nft.usd_price}
          isAucSelling={nft.is_auc_selling}
          isTimedAucSelling={nft.is_timed_auc_selling}
          highestBid={nft.highest_bid}
        />
        <NftCreators
          creatorAvatar={nft.creator.avatar}
          creatorId={String(nft.creator.url)}
          creatorName={nft.creator.display_name}
          collectionAvatar={nft.collection.avatar}
          collectionId={String(nft.collection.url)}
          collectionName={nft.collection.name}
        />
        <NftOwners owners={nft.owners} properties={nft.properties} history={nft.history} />
      </div>
    </div>
  );
};
export default NftPage;
