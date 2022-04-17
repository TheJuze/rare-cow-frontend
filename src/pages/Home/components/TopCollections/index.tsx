/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';

// import { useDispatch } from 'react-redux';
// import { getTopCollections } from 'store/collections/actions';
// import { clearTopCollections } from 'store/collections/reducer';
// import collectionsSelector from 'store/collections/selectors';
// import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { Text } from 'components';

import { usdt } from 'assets/img';
import collectionAvatar from 'assets/img/collectionAvatar.png';
import { CollectionCard } from './components';

// import { useShallowSelector } from 'hooks';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const collections = [
  {
    collection: {
      url: 26,
      description: 'for test',
      floorPrice: 0,
      name: 'collection for shit NFT',
      avatar: collectionAvatar,
      address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
      display_theme: 'Padded',
      is_default: false,
      is_nsfw: false,
      cover: null,
      standart: 'ERC721',
      symbol: 'SFSN',
    },
    currency: { image: usdt },
    price: 160745.0,
    difference: null,
    floorPrice: null,
    total_items: 2,
    total_owners: 2,
  },
  {
    collection: {
      url: 19,
      description: '',
      floorPrice: 3.0,
      name: 'Single Default Collection',
      avatar: collectionAvatar,
      address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
      display_theme: 'Padded',
      is_default: true,
      is_nsfw: false,
      cover: null,
      standart: 'ERC721',
      symbol: 'SINGLE',
    },
    currency: { image: usdt },
    price: 132149.12,
    difference: null,
    floorPrice: 10.0,
    total_items: 18,
    total_owners: 10,
  },
  {
    collection: {
      url: 20,
      description: '',
      floorPrice: 10.0,
      name: 'Multiple default collection',
      avatar: collectionAvatar,
      address: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
      display_theme: 'Padded',
      is_default: true,
      is_nsfw: false,
      cover: null,
      standart: 'ERC1155',
      symbol: 'MULTI',
    },
    currency: { image: usdt },
    price: 89938.95,
    difference: null,
    floorPrice: 10.0,
    total_items: 7,
    total_owners: null,
  },
  {
    collection: {
      url: 16,
      description: '',
      floorPrice: 0,
      name: 'c0l',
      avatar: collectionAvatar,
      address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
      display_theme: 'Padded',
      is_default: false,
      is_nsfw: false,
      cover: null,
      standart: 'ERC721',
      symbol: 'c0l',
    },
    currency: { image: usdt },
    price: 1339.56,
    difference: null,
    floorPrice: 123,
    total_items: 1,
    total_owners: 1,
  },
  {
    collection: {
      url: 22,
      description: 'qwertyuiop',
      floorPrice: 0.2,
      name: 'ColorCollection',
      avatar: collectionAvatar,
      address: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
      display_theme: 'Padded',
      is_default: false,
      is_nsfw: false,
      cover: null,
      standart: 'ERC1155',
      symbol: 'CRMС',
    },
    currency: { image: usdt },
    price: 1307.16,
    difference: null,
    floorPrice: 0.2,
    total_items: 2,
    total_owners: null,
  },
  {
    collection: {
      url: 13,
      description: '',
      floorPrice: 1.0,
      name: 'Multiple coll',
      avatar: collectionAvatar,
      address: '0xf58248adaDE39b1ECA2e59Ff6219642aE0Ea2Bf5',
      display_theme: 'Padded',
      is_default: false,
      is_nsfw: false,
      cover: null,
      standart: 'ERC1155',
      symbol: 'mcll',
    },
    currency: { image: usdt },
    price: 978.34,
    difference: null,
    floorPrice: 1.0,
    total_items: 2,
    total_owners: null,
  },
  {
    collection: {
      url: 1,
      description: '',
      floorPrice: 1.0,
      name: 'Collection n1',
      avatar: collectionAvatar,
      address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
      display_theme: 'Padded',
      is_default: false,
      is_nsfw: false,
      cover: null,
      standart: 'ERC721',
      symbol: 'Col1',
    },
    currency: { image: usdt },
    price: null,
    difference: null,
    floorPrice: null,
    total_items: 7,
    total_owners: 4,
  },
  {
    collection: {
      url: 7,
      description: '',
      floorPrice: 0,
      name: 'Spring Collection',
      avatar: collectionAvatar,
      address: '0xbA9669b82011ed728A87278CD6B9Daf6A8Bf11F9',
      display_theme: 'Padded',
      is_default: false,
      is_nsfw: false,
      cover: null,
      standart: 'ERC721',
      symbol: 'SCL',
    },
    currency: { image: usdt },
    price: null,
    difference: null,
    floorPrice: null,
    total_items: 4,
    total_owners: 3,
  },
];

const TopCollections: FC<Props> = ({ className }) => {
  // const chain = useShallowSelector(userSelector.getProp('chain'));
  // const dispatch = useDispatch();
  // const collections = useShallowSelector(collectionsSelector.getProp('topCollections'));

  const withoutDefault = useMemo(
    () => collections.filter((c: any) => !c.collection.isDefault),
    [collections],
  );

  // const handleFetchTopCollections = useCallback(() => {
  //   dispatch(
  //     getTopCollections({
  //       network: chain,
  //     }),
  //   );
  // }, [chain, dispatch]);

  // useEffect(() => {
  //   handleFetchTopCollections();
  // }, [handleFetchTopCollections]);

  // useEffect(
  //   () => () => {
  //     dispatch(clearTopCollections());
  //   },
  //   [dispatch],
  // );

  return (
    <div className={cx(styles.topCollections, className)}>
      <Text
        variant="heading-2"
        color="accent"
        weight="semiBold"
        className={styles.title}
        align="center"
      >
        Top collections
      </Text>
      {withoutDefault.length ? (
        <div className={styles.collections}>
          <ol
            className={styles.collectionsWrapper}
            style={{
              gridTemplateColumns: `repeat(${
                collections.length > 3 ? 3 : collections.length
              }, 1fr)`,
            }}
          >
            {withoutDefault.map((collection: any, index: number) => (
              <CollectionCard
                key={index}
                avatar={collection.collection?.avatar || ''}
                id={collection.collection?.url || 0}
                index={index + 1}
                name={collection.collection?.name || ''}
                currency={collection.currency.image}
                price={
                  new BigNumber(collection?.floorPrice || '0').isEqualTo(0)
                    ? '< 0.01'
                    : new BigNumber(collection?.floorPrice).toString() || 0
                }
              />
            ))}
          </ol>
        </div>
      ) : (
        <Text className={styles.noItems}>
          There are no collections
        </Text>
      )}
    </div>
  );
};

export default TopCollections;
