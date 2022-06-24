/* eslint-disable no-nested-ternary */
import { currenciesIconsMap, fromNameToCurrencyObj } from 'appConstants';
import { Button, Input, Text } from 'components';
import { useShallowSelector } from 'hooks';
import React, {
  useCallback, useEffect, useMemo, useState, VFC,
} from 'react';
import ratesSelector from 'store/rates/selectors';
import { Chains, EInputStatus } from 'types';
import { TokenFull } from 'types/api';
import { validateOnlyNumbers } from 'utils';

import cn from 'clsx';
import { useDispatch } from 'react-redux';
import {
  endAuction, getFeeInfo, removeFromSale, setOnSale,
} from 'store/nfts/actions';
import { useWalletConnectorContext } from 'services';
import BigNumber from 'bignumber.js';
import userSelector from 'store/user/selectors';
import { getRates } from 'store/rates/actions';
import nftSelector from 'store/nfts/selectors';
import styles from './styles.module.scss';

interface IOwnerAfterListing {
  detailedNFT: TokenFull;
  userId: string;
  isAuction: boolean;
  isUserCanEndAuction: boolean;
  isUserCanRemoveFromSale: boolean;
  isUserCanPutOnSale?: boolean;
  isUserCanChangePrice?: boolean;
}

export const OwnerAfterListing: VFC<IOwnerAfterListing> = ({
  detailedNFT,
  userId,
  isAuction,
  isUserCanEndAuction,
  isUserCanRemoveFromSale,
  isUserCanChangePrice,
  isUserCanPutOnSale,
}) => {
  const { currency, totalSupply: itemsAmount } = detailedNFT;
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const userNetwork = useShallowSelector(userSelector.getProp('chain'));
  const rates = useShallowSelector(ratesSelector.getProp('rates'));
  const { exchangeAmount } = useShallowSelector(nftSelector.getProp('fees'));
  const { walletService } = useWalletConnectorContext();

  const isSingle = useMemo(() => detailedNFT.standart === 'ERC721', [detailedNFT.standart]);

  const handleGetRates = useCallback(() => {
    dispatch(getRates({ network: userNetwork || Chains.polygon }));
  }, [dispatch, userNetwork]);

  useEffect(() => {
    handleGetRates();
  }, [handleGetRates]);

  useEffect(() => {
    dispatch(getFeeInfo({ web3Provider: walletService.Web3() }));
  }, [dispatch, walletService]);

  const onPriceChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let { value } = event.currentTarget;
      const splittedValue = value.split('.');
      if (splittedValue[1] && splittedValue[1].length > 6) {
        value = [splittedValue[0], splittedValue[1].slice(0, 6)].join('.');
      }
      if (validateOnlyNumbers(value)) {
        setPrice(value);
      }
    },
    [],
  );

  const currentPaymentPrice = useMemo(() => {
    const requiredToken = rates?.find((rate) => rate.symbol === currency?.symbol);
    if (requiredToken) {
      return parseFloat(requiredToken.rate);
    }
    return parseFloat(currency?.rate);
  }, [currency?.rate, currency?.symbol, rates]);

  const currentOwnerAmountTokens = useMemo(() => {
    const { owners } = detailedNFT;
    if (owners) {
      const currentOwner = owners.find((owner) => owner.url === userId);
      if (currentOwner) {
        return currentOwner.sellingQuantity || currentOwner.quantity;
      }
    }
    return 0;
  }, [detailedNFT, userId]);

  const updateClickHandler = useCallback(() => {
    setPrice('');
    dispatch(
      setOnSale({
        id: detailedNFT.id,
        internalId: detailedNFT.internalId,
        collectionAddress: detailedNFT.collection?.address,
        price,
        isSingle,
        web3Provider: walletService.Web3(),
        amount: currentOwnerAmountTokens,
        currency: fromNameToCurrencyObj(detailedNFT?.currency?.symbol),
      }),
    );
  }, [
    currentOwnerAmountTokens,
    detailedNFT.collection?.address,
    detailedNFT?.currency?.symbol,
    detailedNFT.id,
    detailedNFT.internalId,
    dispatch,
    isSingle,
    price,
    walletService,
  ]);

  const removeClickHandler = useCallback(() => {
    if (isAuction) {
      dispatch(
        endAuction({
          id: detailedNFT.id,
          web3Provider: walletService.Web3(),
        }),
      );
    } else {
      dispatch(
        removeFromSale({
          id: detailedNFT.id,
        }),
      );
    }
  }, [detailedNFT.id, dispatch, isAuction, walletService]);

  return (
    <div className={styles.wrapper}>
      {(isUserCanChangePrice || isUserCanPutOnSale) && (
        <div className={styles.priceSection}>
          <div className={styles.priceField}>
            <Input
              label="Price"
              caption={{
                status: EInputStatus.COMMON,
                caption: (
                  <Text color="light3" size="xs">
                    ${' '}
                    {price ? new BigNumber(price).times(itemsAmount * currentPaymentPrice)
                      .decimalPlaces(5)
                      .toString() : '0'}
                  </Text>
                ),
              }}
              name="price"
              value={price}
              endAdornment={<img src={currenciesIconsMap[currency?.symbol]} alt={currency?.name} />}
              onChange={onPriceChangeHandler}
              placeholder={detailedNFT.price}
            />
          </div>
          <div className={cn(styles.priceField, styles.priceUpdater)}>
            <Button
              disabled={
                !Number.isFinite(parseFloat(price)) ||
                +price === +detailedNFT.price ||
                detailedNFT.bids?.length !== 0
              }
              variant="outlined"
              onClick={updateClickHandler}
            >
              Update
            </Button>
          </div>
        </div>
      )}
      {isUserCanRemoveFromSale && (
        <Button
          disabled={isAuction ? !isUserCanEndAuction : !isUserCanRemoveFromSale}
          onClick={removeClickHandler}
          className={styles.remove}
        >
          {isAuction ? 'Accept bid' : 'Remove from sale'}
        </Button>
      )}
      {new BigNumber(exchangeAmount).gte(0) && (
      <div>
        <Text variant="body-2" color="accent">
          Selling fee is {exchangeAmount} %
        </Text>
      </div>
      )}
    </div>
  );
};
