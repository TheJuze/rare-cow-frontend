/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC } from 'react';
import { ArtCard, Button, FilterChips, Text } from 'components';

import { Link } from 'react-router-dom';
import { useBreakpoints } from 'hooks';
import styles from './styles.module.scss';

interface INftsProps {
  setIsShowFilters: any;
  isShowChips: boolean;
  isAppliedFilters: boolean;
  appliedFilters: any;
  handleDeleteChips: any;
  handleClearChips: any;
  nfts: any;
  onLoadMoreClick: (value: number) => void;
  currentPage: number;
}

const Nfts: VFC<INftsProps> = ({
  isShowChips,
  isAppliedFilters,
  appliedFilters,
  handleDeleteChips,
  handleClearChips,
  nfts,
  onLoadMoreClick,
  currentPage,
}) => {
  const [isMobile] = useBreakpoints([541]);

  const minSize = 264;

  return (
    <div className={styles.nfts}>
      {isMobile && isShowChips && isAppliedFilters && (
        <div className={styles.total}>
          <Text color="metal800" align="left" className={styles.totalText}>
            Total({nfts.length})
          </Text>
          <FilterChips
            className={styles.chips}
            filters={appliedFilters}
            handleChangeFilter={handleDeleteChips}
            handleClearFilters={handleClearChips}
            isAppliedFilters={isAppliedFilters}
          />
        </div>
      )}
      <div
        className={styles.nftsResults}
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
      <Button
        className={styles.load}
        onClick={() => onLoadMoreClick(currentPage + 1)}
        variant="outlined"
      >
        <Text className={styles.loadText} color="accent">
          Load more
        </Text>
      </Button>
    </div>
  );
};

export default Nfts;
