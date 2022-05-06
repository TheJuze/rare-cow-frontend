/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState, VFC } from 'react';
import { ArtCard, Button, FilterChips, SearchCollection, Text } from 'components';

import { nfts } from 'components/ArtCard/ArtCard.mock';
import { Link } from 'react-router-dom';
import { FiltersIcon } from 'assets/icons/icons';
import { useFilters } from 'hooks';
import { Filters } from 'containers/Filters/Filters';
import styles from './styles.module.scss';

interface IBodyProps {}

export const collectionsMock = [
  {
    url: 12,
    description: 'bad collection',
    floor_price: 0,
    name: 'something',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmYS12TeqsSPPx1uReQhac8gbyFSEiBGJS34Zz4gZsUeFX',
    address: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC1155',
    symbol: 'sg',
    creator: {
      id: 14,
      url: 14,
      name: 'Curry',
      address: '0xb20a6e3807ce96eec3758d8d09b181dca4da1e0c',
      display_name: 'Curry',
      custom_url: null,
      created_at: '2022-03-24T12:48:37.164596Z',
      site: '',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmeLa6daGs4Lb8T3LUh8RczHvF5WDn6s74aBsDLfFDNmBs',
      bio: 'jhh',
      twitter: '',
      instagram: '',
      facebook: null,
      email: '',
    },
    tokens: [
      'https://ipfs11.rocknblock.io/ipfs/QmRyDoVqShKMG6KXSCb2sDWtX2u3rjbSGXLwrES21rnofG',
      'https://ipfs11.rocknblock.io/ipfs/QmUbyQbtSzkoGdjaTfxkBBaM4foMGrJZAgmQQuX3WzN8od',
      'https://ipfs11.rocknblock.io/ipfs/QmeZRQigYxwsuE43BA9uPZvpEjRzVr5FamZNtuKobN7z3J',
      'https://ipfs11.rocknblock.io/ipfs/Qmbrzkd43P9nqQ9SyqNV68dU3YZzkvp4T7QJBZg2zwYTbS',
      'https://ipfs11.rocknblock.io/ipfs/QmWRgxaRcrD2gN8dWMNNbh58oDq87jV4Hcr7zqNkvnxpBx',
    ],
    likes_count: { likes_count: 1 },
  },
  {
    url: 13,
    description: '',
    floor_price: 1.0,
    name: 'Multiple coll',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmNQHAJBeztWdZYoxNVZKHmhrBKiqHxnPf8EYWak7ME6di',
    address: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC1155',
    symbol: 'mcll',
    creator: {
      id: 15,
      url: 15,
      name: '0x2a89b1b3b41bc4b6bb75c7b888d00c4dddd4b161',
      address: '0x2a89b1b3b41bc4b6bb75c7b888d00c4dddd4b161',
      display_name: null,
      custom_url: null,
      created_at: '2022-03-25T09:07:23.541034Z',
      site: null,
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmaBHkDYUxVShc5mBGRgxCJnk8GEUatgLeZQUjrrbRAKSb',
      bio: null,
      twitter: null,
      instagram: null,
      facebook: null,
      email: '',
    },
    tokens: [
      'https://ipfs11.rocknblock.io/ipfs/QmNQHAJBeztWdZYoxNVZKHmhrBKiqHxnPf8EYWak7ME6di',
      'https://ipfs11.rocknblock.io/ipfs/QmQjE8Dg6Cot7zCjP3ifwyTSVVmLREDBCVbEUXvtqzAiHw',
    ],
    likes_count: { likes_count: 1 },
  },
  {
    url: 14,
    description: 'Nice characters',
    floor_price: 0,
    name: 'Characters',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmaBHkDYUxVShc5mBGRgxCJnk8GEUatgLeZQUjrrbRAKSb',
    address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC721',
    symbol: 'PFP',
    creator: {
      id: 20,
      url: 20,
      name: 'Polina',
      address: '0x12a64f3d1194b084cba4829d0451cd1032d6de00',
      display_name: 'Polina',
      custom_url: null,
      created_at: '2022-03-25T13:43:36.315273Z',
      site: '',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/Qmb98wQWgkRtcuggmt5WoVE6dNsxwtqfkj5sm6UuEaVxiN',
      bio: 'Art great lover',
      twitter: '',
      instagram: '',
      facebook: null,
      email: '',
    },
    tokens: [],
    likes_count: { likes_count: 0 },
  },
  {
    url: 15,
    description: 'Very pretty and cool! xx',
    floor_price: 0,
    name: 'Persons',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmfNwxk14Cr65qNC9UjJiJSEwZxVNgWCjt3N9BWXnMvMUx',
    address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC721',
    symbol: 'PFPs',
    creator: {
      id: 22,
      url: 22,
      name: 'Polka',
      address: '0x3a9a34d723f080a4f0b2fa72fc9f497028da6414',
      display_name: 'Polka',
      custom_url: null,
      created_at: '2022-03-25T14:14:59.698867Z',
      site: '',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/Qmb98wQWgkRtcuggmt5WoVE6dNsxwtqfkj5sm6UuEaVxiN',
      bio: '',
      twitter: '',
      instagram: '',
      facebook: null,
      email: '',
    },
    tokens: [],
    likes_count: { likes_count: 0 },
  },
  {
    url: 16,
    description: '',
    floor_price: 0,
    name: 'c0l',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmNQHAJBeztWdZYoxNVZKHmhrBKiqHxnPf8EYWak7ME6di',
    address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC721',
    symbol: 'c0l',
    creator: {
      id: 19,
      url: 19,
      name: 'asdf',
      address: '0x59583c7bd7fcf6064564e1f3b2095fef126d0c5c',
      display_name: 'asdf',
      custom_url: null,
      created_at: '2022-03-25T10:39:15.006347Z',
      site: '',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmXq9Uo6wX1ZL7qAAMXsYJodM8rxq8Xie1ceoUqs1Agpp7',
      bio: 'asdf',
      twitter: '',
      instagram: '',
      facebook: null,
      email: '',
    },
    tokens: ['https://ipfs11.rocknblock.io/ipfs/QmYyfo56myNxxk3hcxKtFiqtLjtu9sAvYA245zyng8TJUF'],
    likes_count: { likes_count: 0 },
  },
  {
    url: 17,
    description: '',
    floor_price: 0,
    name: 'c0l multi',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmNQHAJBeztWdZYoxNVZKHmhrBKiqHxnPf8EYWak7ME6di',
    address: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC1155',
    symbol: 'c0lm',
    creator: {
      id: 19,
      url: 19,
      name: 'asdf',
      address: '0x59583c7bd7fcf6064564e1f3b2095fef126d0c5c',
      display_name: 'asdf',
      custom_url: null,
      created_at: '2022-03-25T10:39:15.006347Z',
      site: '',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmXq9Uo6wX1ZL7qAAMXsYJodM8rxq8Xie1ceoUqs1Agpp7',
      bio: 'asdf',
      twitter: '',
      instagram: '',
      facebook: null,
      email: '',
    },
    tokens: [],
    likes_count: { likes_count: 0 },
  },
  {
    url: 2,
    description: '',
    floor_price: 0,
    name: 'solevoi pack',
    avatar: 'https://ipfs11.rocknblock.io/ipfs/QmZffsiR8LNnhDEz3ShUaML3GuBuV3X2AWYr8fpNe9wVHR',
    address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
    display_theme: 'Padded',
    is_default: false,
    is_nsfw: false,
    cover: null,
    standart: 'ERC721',
    symbol: 'SOLi',
    creator: {
      id: 2,
      url: 2,
      name: 'cucunber',
      address: '0x677fe907cd22bd1d5dee8475f15bf3b40a5d8d73',
      display_name: 'cucunber',
      custom_url: null,
      created_at: '2022-03-09T12:50:32.172788Z',
      site: 'google.com',
      is_verificated: false,
      avatar: 'https://ipfs11.rocknblock.io/ipfs/QmWediFaRMa97TmdbZkhfHWnnEsv7B2zbCGG8GEwFaek8x',
      bio: 'Fl studio is a digital audio workstation developed by Belgian company Image-Line. Fl studio features a graphic user interface with a pattern-based music sequencer. The program is available in four different editions for Miscrosoft Windows and macOS. Image-Line offers lifetime free updates to the program after one-time purchase, which means customers receive all future updates of the software for free after their purchase. Image-Line also develop FL Studio Mobile for Android, iOS, and Universal',
      twitter: '',
      instagram: '@cucunber',
      facebook: null,
      email: 'cucunber@cucunber.cu',
    },
    tokens: [
      'https://ipfs11.rocknblock.io/ipfs/QmRDFTp5vicvSwcmXYeV86TQN5wE417KdS7vsobFmEPKid',
      'https://ipfs11.rocknblock.io/ipfs/QmRDFTp5vicvSwcmXYeV86TQN5wE417KdS7vsobFmEPKid',
      'https://ipfs11.rocknblock.io/ipfs/QmSs7sq842D4rJmTGEoRMLTHWQR9DeXxi9BjHn4TqWkLPx',
      'https://ipfs11.rocknblock.io/ipfs/QmRDFTp5vicvSwcmXYeV86TQN5wE417KdS7vsobFmEPKid',
      'https://ipfs11.rocknblock.io/ipfs/QmRDFTp5vicvSwcmXYeV86TQN5wE417KdS7vsobFmEPKid',
      'https://ipfs11.rocknblock.io/ipfs/QmRDFTp5vicvSwcmXYeV86TQN5wE417KdS7vsobFmEPKid',
    ],
    likes_count: { likes_count: 0 },
  },
];

const Body: VFC<IBodyProps> = () => {
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [isShowChips, setIsShowChips] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    ERC721: false,
    ERC1155: false,
    isAuction: false,
    currency: [],
    collections: [],
    price: '',
    date: '',
    likes: '',
    minPrice: '',
    maxPrice: '',
  });
  const { filters, handleChangeFilter, handleClearFilters } = useFilters();
  const isAppliedFilters = useMemo(
    () =>
      Boolean(
        appliedFilters.ERC721 ||
          appliedFilters.ERC1155 ||
          appliedFilters.isAuction ||
          appliedFilters.currency.length ||
          appliedFilters.collections.length ||
          appliedFilters.price ||
          appliedFilters.date ||
          appliedFilters.likes ||
          appliedFilters.minPrice ||
          appliedFilters.maxPrice,
      ),
    [
      appliedFilters.ERC1155,
      appliedFilters.ERC721,
      appliedFilters.collections.length,
      appliedFilters.currency.length,
      appliedFilters.date,
      appliedFilters.isAuction,
      appliedFilters.likes,
      appliedFilters.maxPrice,
      appliedFilters.minPrice,
      appliedFilters.price,
    ],
  );

  const handleCollectionChange = useCallback(
    (newCollection) => {
      handleChangeFilter(
        'collections',
        filters.collections.includes(newCollection)
          ? filters.collections.filter((currentCollection) => currentCollection !== newCollection)
          : [...filters.collections, newCollection],
      );
    },
    [filters.collections, handleChangeFilter],
  );

  const onApply = useCallback(() => {
    setIsShowChips(true);
    setIsShowFilters(false);
    setAppliedFilters({ ...filters });
  }, [filters]);

  const handlDeleteChips = useCallback(
    (key, value) => {
      handleChangeFilter(key, value);
      setAppliedFilters({ ...appliedFilters, [key]: value });
    },
    [appliedFilters, handleChangeFilter],
  );

  const handleClearChips = useCallback(() => {
    handleClearFilters();
    setAppliedFilters({
      ERC721: false,
      ERC1155: false,
      isAuction: false,
      currency: [],
      collections: [],
      price: '',
      date: '',
      likes: '',
      minPrice: '',
      maxPrice: '',
    });
  }, [handleClearFilters]);

  const minSize = 264;
  return (
    <div className={styles.body}>
      <div className={styles.bodyTop}>
        <Button
          size="sm"
          variant="filled"
          startAdornment={<FiltersIcon />}
          className={styles.filters}
          onClick={() => setIsShowFilters(true)}
        >
          <Text color="metal700">Filters</Text>
        </Button>
        <SearchCollection
          collections={collectionsMock}
          className={styles.collections}
          activeCollections={filters.collections}
          handleClickCollection={handleCollectionChange}
        />
      </div>
      {isShowChips && isAppliedFilters && (
        <div className={styles.total}>
          <Text color="metal800" align="left" className={styles.totalText}>
            Total({nfts.length})
          </Text>
          <FilterChips
            className={styles.chips}
            filters={appliedFilters}
            handleChangeFilter={handlDeleteChips}
            handleClearFilters={handleClearChips}
            isAppliedFilters={isAppliedFilters}
          />
        </div>
      )}
      <div className={styles.bodyContent}>
        <Filters
          filters={filters}
          isShowFilters={isShowFilters}
          handleChangeFilter={handleChangeFilter}
          onClose={onApply}
          handleClearFilters={handleClearChips}
        />
        <div
          className={styles.bodyResults}
          style={{
            gridTemplateColumns:
              nfts.length !== 0 ? `repeat(auto-fill,minmax(${minSize}px,1fr))` : '1fr',
          }}
        >
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
              <Link key={id} to="/" className={styles.card}>
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
                  className={styles.card}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Body;
