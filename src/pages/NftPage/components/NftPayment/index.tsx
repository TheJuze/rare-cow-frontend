/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { TStandards } from 'appConstants';
import { ArrowGreen } from 'assets/icons/icons';
import { matic } from 'assets/img';
import {
  Text,
  Countdown,
  Button,
  Selector,
  Input,
  Avatar,
  Listing,
} from 'components';
import { useGetUserAccessForNft, useShallowSelector } from 'hooks';
import React, { FC, useCallback, useMemo, useState } from 'react';
import userSelector from 'store/user/selectors';
import { CollectionSlim, Ownership, TokenFull } from 'types/api';
import { OwnerAfterListing, OwnerListing } from './components';

import styles from './styles.module.scss';

type Props = {
  detailedNFT: TokenFull;
};

const NftPayment: FC<Props> = ({
  detailedNFT,
}) => {
  const userId = useShallowSelector(userSelector.getProp('id'));
  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
    isUserCanRemoveFromSale,
    isUserCanChangePrice,
  } = useGetUserAccessForNft(detailedNFT, String(userId));

  const hasBeenListed = useMemo(() => {
    const { isSelling, isAucSelling, isTimedAucSelling } = detailedNFT;
    return isAucSelling || isTimedAucSelling || isSelling;
  }, [detailedNFT]);

  const isAuction = useMemo(
    () => {
      const { isAucSelling, isTimedAucSelling } = detailedNFT;
      return isAucSelling || isTimedAucSelling;
    },
    [detailedNFT],
  );

  const currentOwnerNFTInfo = useMemo(() => {
    if(isOwner) {
      return detailedNFT.owners.find((owner) => owner.url === String(userId)) || {} as Ownership;
    }
    return {} as Ownership;
  }, [detailedNFT.owners, isOwner, userId]);

  return (
    <div className={styles.nftPayment}>
      {isOwner && (
        hasBeenListed ? <OwnerAfterListing
          previousPrice={detailedNFT.price}
          currency={detailedNFT.currency}
          itemsAmount={1}
        /> : <OwnerListing
          nftId={String(detailedNFT.id)}
          nftType={detailedNFT.standart as TStandards}
          nftSupply={+currentOwnerNFTInfo?.quantity}
          collectionAddress={detailedNFT.collection?.address}
          internalNftId={String(detailedNFT.internalId)}
        />
      )}
      {(isUserCanBuyNft || isUserCanEnterInAuction) && (
        <>
          <Countdown endAuction={+detailedNFT.endAuction} className={styles.countdown} />
          <div className={styles.priceWrapper}>
            {isAuction ? (
              <>
                {detailedNFT.highestBid ? (
                  <Text size="xs" color="base900">
                    Current bid
                  </Text>
                ) : (
                  <Text size="xs" color="base900">
                    Minimal bid
                  </Text>
                )}
              </>
            ) : (
              <Text size="xs" color="base900">
                Price
              </Text>
            )}

            <div className={styles.price}>
              <img src={matic} alt="currency" className={styles.priceImage} />
              <Text color="accent" className={styles.priceText}>
                {detailedNFT.price}
              </Text>
            </div>
            <Text className={styles.priceUsd}>$ {detailedNFT.usdPrice}</Text>
          </div>

          {detailedNFT.highestBid ? (
            <div className={styles.bidder}>
              <Avatar
                id={detailedNFT.highestBid.user.url}
                avatar={detailedNFT.highestBid.user.avatar}
                size={40}
              />
              <Text className={styles.bidderName} color="dark" variant="body-2" weight="semiBold">
                {detailedNFT.highestBid.user.displayName || detailedNFT.highestBid.user.address}
              </Text>
              <ArrowGreen />
            </div>
          ) : null}
          <Button className={styles.buy}>
            <Text variant="body-2" color="light">
              Buy
            </Text>
          </Button>
        </>
      )}
    </div>
  );
};
export default NftPayment;
