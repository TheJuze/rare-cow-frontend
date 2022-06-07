import { TStandards } from 'appConstants';
import { ArrowGreen } from 'assets/icons/icons';
import { Avatar, Countdown, Text } from 'components';
import { useGetUserAccessForNft, useShallowSelector } from 'hooks';
import React, { FC, useMemo } from 'react';
import userSelector from 'store/user/selectors';
import { Ownership, TokenFull } from 'types/api';
import {
  NFTPrice, OwnerAfterListing, OwnerListing, UserBuy,
} from './components';
import { UserBid } from './components/UserBid';

import styles from './styles.module.scss';

type Props = {
  detailedNFT: TokenFull;
};

const NftPayment: FC<Props> = ({ detailedNFT }) => {
  const userId = useShallowSelector(userSelector.getProp('id'));
  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isOwner,
    isUserCanRemoveFromSale,
    isTimedAuction,
  } = useGetUserAccessForNft(detailedNFT, String(userId));

  const hasBeenListed = useMemo(() => {
    const { isSelling, isAucSelling, isTimedAucSelling } = detailedNFT;
    return isAucSelling || isTimedAucSelling || isSelling;
  }, [detailedNFT]);

  const isAuction = useMemo(() => {
    const { isAucSelling, isTimedAucSelling } = detailedNFT;
    return isAucSelling || isTimedAucSelling;
  }, [detailedNFT]);

  const currentOwnerNFTInfo = useMemo(() => {
    if (isOwner) {
      return detailedNFT.owners.find((owner) => owner.url === String(userId)) || ({} as Ownership);
    }
    return {} as Ownership;
  }, [detailedNFT.owners, isOwner, userId]);

  const sellers = useMemo(() => detailedNFT?.sellers || [], [detailedNFT?.sellers]);

  const currentPrice = useMemo(() => {
    const { highestBid, price, usdPrice } = detailedNFT;
    if (highestBid && price && usdPrice) {
      if (detailedNFT.isAucSelling || detailedNFT.isTimedAucSelling) {
        if (!highestBid) {
          return { price, usdPrice, is: true };
        }
        const { currency } = highestBid;
        return {
          price: highestBid.amount,
          usdPrice: +highestBid.amount * (+currency?.rate || 1),
          is: true,
        };
      }
    }
    return { price: price || '0', usdPrice: usdPrice || '0', is: true };
  }, [detailedNFT]);

  return (
    <div className={styles.nftPayment}>
      {isTimedAuction && (
        <Countdown endAuction={+detailedNFT.endAuction} className={styles.countdown} />
      )}
      {+currentPrice.price > 0 && (
        <NFTPrice
          highestBid={detailedNFT.highestBid}
          price={currentPrice.price}
          usdPrice={+currentPrice.usdPrice}
          isAuction={isAuction}
          currency={detailedNFT.currency}
        />
      )}
      {detailedNFT.highestBid && detailedNFT.highestBid.user ? (
        <div className={styles.bidder}>
          <Avatar
            id={detailedNFT.highestBid?.user.url}
            avatar={detailedNFT.highestBid?.user.avatar}
            size={40}
          />
          <Text
            className={styles.bidderName}
            color="darkDefault"
            variant="body-2"
            weight="semiBold"
          >
            {detailedNFT.highestBid?.user.displayName || detailedNFT.highestBid?.user.address}
          </Text>
          <ArrowGreen />
        </div>
      ) : null}
      {isOwner &&
        (hasBeenListed ? (
          <OwnerAfterListing
            detailedNFT={detailedNFT}
            userId={String(userId)}
            isAuction={isAuction}
            isUserCanEndAuction={isUserCanEndAuction}
            isUserCanRemoveFromSale={isUserCanRemoveFromSale}
          />
        ) : (
          <OwnerListing
            nftId={String(detailedNFT.id)}
            nftType={detailedNFT.standart as TStandards}
            nftSupply={+currentOwnerNFTInfo?.quantity}
            collectionAddress={detailedNFT.collection?.address}
            internalNftId={String(detailedNFT.internalId)}
            userId={String(userId)}
          />
        ))}
      <>
        {isUserCanBuyNft && (
          <UserBuy
            nftId={String(detailedNFT.id)}
            currency={detailedNFT.currency}
            isMultiple={detailedNFT.standart === 'ERC1155'}
            sellers={sellers}
            normalPrice={detailedNFT.price}
          />
        )}
        {isUserCanEnterInAuction && <UserBid detailedNFT={detailedNFT} />}
      </>
    </div>
  );
};
export default NftPayment;
