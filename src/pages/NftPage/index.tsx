/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC, useEffect, useMemo } from 'react';

import { useBreakpoints, useGetUserAccessForNft, useShallowSelector } from 'hooks';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetailedNft } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';
import { TAudioPreview } from 'components/Preview/AudioPreview';
import { TImagePreview } from 'components/Preview/ImagePreview';
import { TVideoPreview } from 'components/Preview/VideoPreview';
import { TThreePreview } from 'components/Preview/ThreePreview';
import { getPreviewer, PromoteModal } from 'components';
import { clearDetailedNft } from 'store/nfts/reducer';
import userSelector from 'store/user/selectors';
import { NftCreators, NftInfo, NftOwners, NftPayment } from './components';
import styles from './styles.module.scss';

const NftPage: FC = () => {
  const [isMobile] = useBreakpoints([767]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const nft = useShallowSelector(nftSelector.getProp('detailedNft'));
  const userId = useShallowSelector(userSelector.getProp('id'));

  useEffect(() => {
    dispatch(getDetailedNft({ id }));
    return () => {
      dispatch(clearDetailedNft());
    };
  }, [id, dispatch]);

  const previewerProps = useMemo(() => {
    const audio: TAudioPreview = {
      previewSrc: nft?.media,
      mediaSrc: nft?.animation,
    };
    const image: TImagePreview = {
      src: nft?.media,
    };
    const video: TVideoPreview = {
      previewSrc: nft?.media,
      mediaSrc: nft?.animation,
    };
    const threeD: TThreePreview = {
      previewSrc: nft?.media,
      mediaSrc: nft?.animation,
      withSwitch: false,
    };

    return {
      audio,
      image,
      video,
      threeD,
    };
  }, [nft]);

  const { previewComponent } = useMemo(() => {
    return getPreviewer(previewerProps, nft?.format);
  }, [nft?.format, previewerProps]);

  const { isOwner, isUserCanEnterInAuction } = useGetUserAccessForNft(nft, userId);
  const currentOwnerData = useMemo(
    () => nft?.owners?.find((owner) => +owner.url === userId),
    [nft?.owners, userId],
  );

  if (!nft) {
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
          isOwner={isOwner}
          isMultiple={nft.standart === 'ERC1155'}
          maxBurnAmount={+currentOwnerData?.quantity || 0}
          canBurn={isUserCanEnterInAuction}
        />
        <div className={styles.nftImage}>{previewComponent}</div>
        <NftPayment detailedNFT={nft} />
        <NftCreators
          creatorAvatar={nft.creator.avatar}
          creatorId={String(nft.creator.url)}
          creatorName={nft.creator.displayName}
          collectionAvatar={nft.collection.avatar}
          collectionId={String(nft.collection.url)}
          collectionName={nft.collection.name}
        />
        <NftOwners
          userId={String(userId)}
          owners={nft.owners}
          properties={nft.properties}
          history={nft.history}
          nftId={String(nft.id)}
          currency={nft.currency}
          normalPrice={nft.price}
          isAuction={nft.isAucSelling || nft.isTimedAucSelling}
        />
        <PromoteModal tokenId={nft.id} />
      </div>
    );
  }

  return (
    <div className={styles.nftWrapper}>
      <div className={styles.nftImage}>{previewComponent}</div>
      <div className={styles.nftBlock}>
        <NftInfo
          name={nft.name}
          id={nft.id}
          description={nft.description}
          likeCount={nft.likeCount}
          isLiked={nft.isLiked}
          isOwner={isOwner}
          isMultiple={nft.standart === 'ERC1155'}
          maxBurnAmount={+currentOwnerData?.quantity || 0}
          canBurn={isUserCanEnterInAuction}
        />
        <NftPayment detailedNFT={nft} />
        <NftCreators
          creatorAvatar={nft.creator.avatar}
          creatorId={String(nft.creator.url)}
          creatorName={nft.creator.displayName}
          collectionAvatar={nft.collection.avatar}
          collectionId={String(nft.collection.url)}
          collectionName={nft.collection.name}
        />
        <NftOwners
          userId={String(userId)}
          owners={nft.owners}
          properties={nft.properties}
          history={nft.history}
          nftId={String(nft.id)}
          currency={nft.currency}
          normalPrice={nft.price}
          isAuction={nft.isAucSelling || nft.isTimedAucSelling}
        />
        <PromoteModal tokenId={nft.id} />
      </div>
    </div>
  );
};
export default NftPage;
