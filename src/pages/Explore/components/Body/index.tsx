/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, VFC } from 'react';
import { ArtCard, Button, Text } from 'components';

import { nfts } from 'components/ArtCard/ArtCard.stories';
import { Link } from 'react-router-dom';
import { FiltersIcon } from 'assets/icons/icons';
import { useFilters } from 'hooks';
import { Filters } from 'containers/Filters/Filters';
import styles from './styles.module.scss';

interface IBodyProps {}

const Body: VFC<IBodyProps> = () => {
  const [isShowFilters, setIsShowFilters] = useState(false);
  const filters = useFilters();

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
      </div>
      <div className={styles.bodyContent}>
        <Filters
          filters={filters}
          isShowFilters={isShowFilters}
          onClose={() => setIsShowFilters(false)}
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
