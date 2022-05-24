import React, { useMemo, VFC } from 'react';

import cn from 'clsx';

import { TokenFull } from 'types/api';
import { Link } from 'react-router-dom';
import { ArtCard } from 'components/ArtCard';
import { Text } from 'components';
import { ArtCardSkeleton } from 'components/ArtCardSkeleton';
import actionTypes from 'store/nfts/actionTypes';
import { useShallowSelector } from 'hooks';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';

export interface NftListProps {
  className?: string;
  nfts: TokenFull[];
  minSize?: number;
  currentPage: number;
  skeletonsCount?: number;
}

export const NftList: VFC<NftListProps> = ({
  className,
  nfts,
  minSize = 264,
  currentPage,
  skeletonsCount = 8,
}) => {
  const { [actionTypes.SEARCH_NFTS]: getNftsRequestStatus } = useShallowSelector(uiSelector.getUI);
  const skeleton = Array.from(Array(skeletonsCount).keys()).map((element) => (
    <ArtCardSkeleton key={element} />
  ));
  const elements = nfts.map((nft) => {
    const {
      id,
      name,
      price,
      highestBid,
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
          price={price || highestBid?.amount}
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
  });

  const returnedElements = useMemo(() => {
    let els;
    if (getNftsRequestStatus === RequestStatus.REQUEST) {
      if (currentPage === 1) {
        els = skeleton;
      }
      if (currentPage > 1) {
        els = [...elements, ...skeleton];
      }
    }
    if (getNftsRequestStatus !== RequestStatus.REQUEST) {
      els = elements.length ? (
        elements
      ) : (
        <Text align="center" variant="subtitle-1" color="dark">
          No NFTs found for your request
        </Text>
      );
    }
    return els;
  }, [currentPage, elements, getNftsRequestStatus, skeleton]);

  return (
    <div
      className={cn(styles.nftList, className)}
      style={{
        gridTemplateColumns:
          nfts.length !== 0 || getNftsRequestStatus === RequestStatus.REQUEST
            ? `repeat(auto-fill,minmax(${minSize}px,1fr))`
            : '1fr',
      }}
    >
      {returnedElements}
    </div>
  );
};
