/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC, useEffect, useMemo } from 'react';

import { useBreakpoints, useGetUserAccessForNft, useShallowSelector } from 'hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDetailedNft } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';
import { TAudioPreview } from 'components/Preview/AudioPreview';
import { TImagePreview } from 'components/Preview/ImagePreview';
import { TVideoPreview } from 'components/Preview/VideoPreview';
import { TThreePreview } from 'components/Preview/ThreePreview';
import { getPreviewer, Loader, PromoteModal, TagsWrapper, TTagsPropsMap } from 'components';
import { clearDetailedNft } from 'store/nfts/reducer';
import userSelector from 'store/user/selectors';
import { PromotionStatus } from 'types/api';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import actionTypes from 'store/nfts/actionTypes';
import apiActions from 'store/api/actions';
import { NftCreators, NftInfo, NftOwners, NftPayment } from './components';
import styles from './styles.module.scss';

const NftPage: FC = () => {
  const [nftInfoLoading] = useShallowSelector(uiSelector.getStatus(['GET_DETAILED_NFT']));
  const {
    [actionTypes.GET_DETAILED_NFT]: getNftRequestStatus,
    [actionTypes.BURN]: burnRequestStatus,
  } = useShallowSelector(uiSelector.getUI);
  const isNftLoading = useMemo(
    () => getNftRequestStatus === RequestStatus.REQUEST,
    [getNftRequestStatus],
  );
  const [isMobile] = useBreakpoints([767]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const nft = useShallowSelector(nftSelector.getProp('detailedNft'));
  const userId = useShallowSelector(userSelector.getProp('id'));
  const navigate = useNavigate();

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
      preview: true,
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

  useEffect(() => {
    if (burnRequestStatus === RequestStatus.SUCCESS) {
      navigate('/');
      dispatch(apiActions.reset(actionTypes.BURN));
    }
  }, [burnRequestStatus, dispatch, navigate]);

  useEffect(() => {
    if (nftInfoLoading === RequestStatus.ERROR) {
      navigate('/404');
    }
  }, [navigate, nftInfoLoading]);

  const { previewComponent } = useMemo(() => {
    return getPreviewer(previewerProps, nft?.format);
  }, [nft?.format, previewerProps]);

  const { isOwner, isUserCanBurn } = useGetUserAccessForNft(nft, userId);
  const currentOwnerData = useMemo(
    () => nft?.owners?.find((owner) => +owner.url === userId),
    [nft?.owners, userId],
  );

  const tagsProps = useMemo<TTagsPropsMap>(
    () => (nft
      ? {
        Auction: nft.isAucSelling || nft.isTimedAucSelling,
        InStock: nft.standart === 'ERC1155' ? nft.available : 0,
        Owned: isOwner ? nft.owners.find((owner) => +owner.url === +userId).quantity : false,
        Promote:
              (nft.premiumPromotionInfo &&
                nft.premiumPromotionInfo.status === PromotionStatus.InProgress) ||
              (nft.featuredPromotionInfo &&
                nft.featuredPromotionInfo.status === PromotionStatus.InProgress),
      }
      : {}),
    [isOwner, nft, userId],
  );

  if (!nft) {
    return null;
  }
  if (isMobile) {
    return (
      <div className={styles.nftWrapper}>
        {isNftLoading ? (
          <Loader size="lg" />
        ) : (
          <>
            <NftInfo
              name={nft.name}
              id={nft.id}
              description={nft.description}
              likeCount={nft.likeCount}
              isLiked={nft.isLiked}
              isOwner={isOwner}
              isMultiple={nft.standart === 'ERC1155'}
              maxBurnAmount={+currentOwnerData?.quantity || 0}
              canBurn={isUserCanBurn}
              premiumPromotionInfo={nft.premiumPromotionInfo}
              featuredPromotionInfo={nft.featuredPromotionInfo}
            />
            <div className={styles.nftImage}>
              <TagsWrapper propsMap={tagsProps}>{previewComponent}</TagsWrapper>
            </div>
            <NftPayment detailedNFT={nft} />
            <NftCreators
              creatorAvatar={nft.creator.avatar}
              creatorId={String(nft.creator.url)}
              creatorName={nft.creator.name}
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
              isMultiple={nft.standart === 'ERC1155'}
            />
            <PromoteModal
              tokenId={nft.id}
              premium={nft.premiumPromotionInfo}
              featured={nft.featuredPromotionInfo}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.nftWrapper}>
      {isNftLoading ? (
        <Loader size="lg" />
      ) : (
        <>
          <div className={styles.nftImage}>
            <TagsWrapper propsMap={tagsProps}>{previewComponent}</TagsWrapper>
          </div>
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
              canBurn={isUserCanBurn}
              premiumPromotionInfo={nft.premiumPromotionInfo}
              featuredPromotionInfo={nft.featuredPromotionInfo}
            />
            <NftPayment detailedNFT={nft} />
            <NftCreators
              creatorAvatar={nft.creator.avatar}
              creatorId={String(nft.creator.url)}
              creatorName={nft.creator.name}
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
              isMultiple={nft.standart === 'ERC1155'}
            />
            <PromoteModal
              tokenId={nft.id}
              premium={nft.premiumPromotionInfo}
              featured={nft.featuredPromotionInfo}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default NftPage;
