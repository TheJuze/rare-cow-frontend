import { TStandards } from 'appConstants';
import {
  Listing, ListingSubmit, Selector,
} from 'components';
import React, { useCallback, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useWalletConnectorContext } from 'services';
import { setOnAuction, setOnSale, transfer } from 'store/nfts/actions';

import styles from '../../styles.module.scss';
import { Transfer } from './components';

interface IOwnerListing{
  nftType: TStandards,
  nftId: string,
  internalNftId: string,
  collectionAddress: string,
  nftSupply: number;
}

export const OwnerListing:VFC<IOwnerListing> = ({
  nftId,
  nftType, nftSupply, internalNftId, collectionAddress,
}) => {
  const [isTransfer, setIsTransfer] = useState(false);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const handleChangeTransfer = useCallback(() => {
    setIsTransfer(!isTransfer);
  }, [isTransfer]);

  const onListing = useCallback((values: ListingSubmit) => {
    switch(values.listType) {
      case 'Auction': {
        dispatch(setOnAuction({
          id: nftId,
          internalId: internalNftId,
          minimalBid: values.price,
          isSingle: nftType === 'ERC721',
          web3Provider: walletService.Web3(),
          collectionAddress,
          currency: values.currency,
        }));
        break;
      }
      case 'Auction time': {
        dispatch(setOnAuction({
          id: nftId,
          internalId: internalNftId,
          minimalBid: values.price,
          auctionDuration: values.timestamp,
          isSingle: nftType === 'ERC721',
          web3Provider: walletService.Web3(),
          collectionAddress,
          currency: values.currency,
        }));
        break;
      }
      case 'Price': {
        dispatch(setOnSale({
          id: nftId,
          internalId: internalNftId,
          price: values.price,
          currency: values.currency,
          isSingle: nftType === 'ERC721',
          collectionAddress,
          web3Provider: walletService.Web3(),
        }));
        break;
      }
      default: {
        break;
      }
    }
  }, [collectionAddress, dispatch, internalNftId, nftId, nftType, walletService]);

  const onTransfer = useCallback((transferAddress: string, transferAmount: string) => {
    dispatch(transfer({
      web3Provider: walletService.Web3(),
      id: nftId,
      address: transferAddress,
      amount: transferAmount,
    }));
  }, [dispatch, nftId, walletService]);

  return(
    <>
      <Selector
        value={isTransfer}
        setValue={handleChangeTransfer}
        name="transfer"
        optionLeft="Transfer"
        optionRight="List for sale"
        className={styles.selector}
      />
      {isTransfer ? (
        <Transfer onSend={onTransfer} nftType={nftType} nftSupply={nftSupply} />
      ) : (
        <Listing isMultiple={nftType === 'ERC1155'} optionsDirection="horizontal" buttonText="Create lot" className={styles.listing} onSubmit={onListing} />
      )}
    </>
  );
};
