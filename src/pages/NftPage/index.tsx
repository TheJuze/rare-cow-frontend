/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC, useEffect } from 'react';

import { useBreakpoints, useShallowSelector } from 'hooks';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetailedNft } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';
import styles from './styles.module.scss';
import { NftCreators, NftInfo, NftOwners, NftPayment } from './components';

const NftPage: FC = () => {
  const [isMobile] = useBreakpoints([767]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const nft = useShallowSelector(nftSelector.getProp('detailedNft'));

  useEffect(() => {
    dispatch(getDetailedNft({ id }));
  }, [id, dispatch]);

  if(!nft) {
    return null;
  }

  if (isMobile) {
    return (
      <div className={styles.nftWrapper}>
        <NftInfo
          name={nft.name}
          id={nft.id}
          description={nft.description}
          likeCount={nft.likeCount}
          isLiked={nft.isLiked}
        />
        <div className={styles.nftImage}>
          <img src={nft.media} alt="nft" />
        </div>
        <NftPayment
          endAuction={+nft.endAuction}
          price={nft.price}
          usdPrice={nft.usdPrice}
          isAucSelling={nft.isAucSelling}
          isTimedAucSelling={nft.isTimedAucSelling}
          highestBid={nft.highestBid}
        />
        <NftCreators
          creatorAvatar={nft.creator.avatar}
          creatorId={String(nft.creator.url)}
          creatorName={nft.creator.displayName}
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
          likeCount={nft.likeCount}
          isLiked={nft.isLiked}
        />
        <NftPayment
          endAuction={+nft.endAuction}
          price={nft.price}
          usdPrice={nft.usdPrice}
          isAucSelling={nft.isAucSelling}
          isTimedAucSelling={nft.isTimedAucSelling}
          highestBid={nft.highestBid}
        />
        <NftCreators
          creatorAvatar={nft.creator.avatar}
          creatorId={String(nft.creator.url)}
          creatorName={nft.creator.displayName}
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
