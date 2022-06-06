import React from 'react';
import { TNullable } from 'types';
import { Ownership, TokenFull } from 'types/api';

export default (nft: TNullable<TokenFull>, userId: string | number) => {
  const isOwner = React.useMemo(() => {
    if (userId && nft && nft.owners) {
      return !!nft.owners.find((owner: Ownership) => String(owner.url) === String(userId));
    }
    return false;
  }, [nft, userId]);

  const isUserCanRemoveFromSale = React.useMemo(() => {
    if (userId && nft) {
      if (
        nft.standart === 'ERC721' &&
        (nft.isSelling || (nft.isAucSelling && !nft.bids)) &&
        isOwner
      ) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        nft.sellers?.find((seller: Ownership) => +seller.url === +userId) &&
        isOwner
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanChangePrice = React.useMemo(() => {
    if (userId && nft) {
      if (nft.standart === 'ERC721' && nft.isSelling && isOwner) {
        return true;
      }

      if (
        nft.standart === 'ERC1155' &&
        nft.sellers?.find((seller: Ownership) => seller.url === userId) &&
        isOwner
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanBuyNft = React.useMemo(() => {
    if (userId && nft && nft.price && nft.isSelling) {
      if (nft.standart === 'ERC721' && !isOwner && nft.available !== 0) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        ((nft.sellers && nft.sellers.some((seller) => +seller.url !== +userId)))
      ) {
        return true;
      }
    }
    return false;
  }, [nft, userId, isOwner]);

  const isUserCanEnterInAuction = React.useMemo(() => {
    if (userId && nft && (nft.isAucSelling || nft?.isTimedAucSelling)) {
      if (nft.standart === 'ERC721' && !isOwner && String(nft.highestBid?.user?.id) !== String(userId)) {
        return true;
      }
    }
    return false;
  }, [userId, nft, isOwner]);

  const isUserCanBurn = React.useMemo(() => {
    if (userId && nft && isOwner) {
      if (nft.standart === 'ERC721' && (nft.isAucSelling || nft.isTimedAucSelling) && !nft.bids?.length) {
        return true;
      }
      if (nft.standart === 'ERC1155') {
        return true;
      }
    }
    return false;
  }, [userId, nft, isOwner]);

  const isUserCanEndAuction = React.useMemo(() => {
    if (
      userId &&
      nft &&
      nft.isAucSelling &&
      !nft.isTimedAucSelling &&
      nft.bids?.length &&
      isOwner
    ) {
      if (nft.standart === 'ERC721') {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isTimedAuction = React.useMemo(() => nft?.isTimedAucSelling, [nft?.isTimedAucSelling]);

  const isUserCanPutOnSale = React.useMemo(() => {
    if (userId && nft && isOwner) {
      if (nft.standart === 'ERC721' && !nft.isSelling && !nft.isAucSelling && !nft.startAuction) {
        return true;
      }
      if (nft.standart === 'ERC1155' && !nft.sellers?.find((seller) => seller.url === userId)) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  return {
    isOwner,
    isUserCanRemoveFromSale,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isUserCanBurn,
    isUserCanEndAuction,
    isUserCanChangePrice,
    isTimedAuction,
  };
};
