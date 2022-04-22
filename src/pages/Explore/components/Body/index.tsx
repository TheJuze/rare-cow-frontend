/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState, VFC } from 'react';
import { ArtCard, Button, FilterChips, Text } from 'components';

import { nfts } from 'components/ArtCard/ArtCard.stories';
import { Link } from 'react-router-dom';
import { FiltersIcon } from 'assets/icons/icons';
import { useFilters } from 'hooks';
import { Filters } from 'containers/Filters/Filters';
import styles from './styles.module.scss';

interface IBodyProps {}

const Body: VFC<IBodyProps> = () => {
  const [isShowFilters, setIsShowFilters] = useState(false);
  const [isShowChips, setIsShowChips] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    ERC721: false,
    ERC1155: false,
    isAuction: false,
    currency: [],
    price: '',
    date: '',
    likes: '',
    minPrice: '',
    maxPrice: '',
  });
  const { filters, handleChangeFilter, handleClearFilters } = useFilters();

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
      {isShowChips && (
        <div className={styles.total}>
          <Text color="metal800" align="left" className={styles.totalText}>
            Total({nfts.length})
          </Text>
          <FilterChips
            className={styles.chips}
            filters={appliedFilters}
            handleChangeFilter={handlDeleteChips}
          />
        </div>
      )}
      <div className={styles.bodyContent}>
        <Filters
          filters={filters}
          isShowFilters={isShowFilters}
          handleChangeFilter={handleChangeFilter}
          onClose={onApply}
          handleClearFilters={handleClearFilters}
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
