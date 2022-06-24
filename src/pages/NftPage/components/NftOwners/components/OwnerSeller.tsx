import { fromNameToCurrencyObj } from 'appConstants';
import BigNumber from 'bignumber.js';
import {
  Avatar, Text, Button, NumberText, QuantityInput,
} from 'components';
import { useModals, useShallowSelector } from 'hooks';
import React, { useCallback, useState, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useWalletConnectorContext } from 'services';
import { setModalProps } from 'store/modals/reducer';
import { buy } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';
import { Currency, Ownership } from 'types/api';
import styles from '../styles.module.scss';

interface IOwnerSeller {
  owner: Ownership;
  isSelling?: boolean;
  currency: Currency;
  nftId: string;
  normalPrice: string;
  isAuction: boolean;
  isMultiple: boolean;
}

export const OwnerSeller: VFC<IOwnerSeller> = ({
  owner, isSelling = false, currency, nftId, normalPrice, isAuction, isMultiple,
}) => {
  const [quantity, setQuantity] = useState('1');
  const dispatch = useDispatch();
  const { changeModalType } = useModals();
  const { walletService } = useWalletConnectorContext();
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const userBalance = useShallowSelector(userSelector.getProp('balance'));

  const handleChangeQuantity = useCallback((amount) => {
    setQuantity(amount);
  }, []);

  const handleBuyAction = useCallback(() => {
    if(userAddress?.length > 0) {
      if (owner && currency) {
        const tokenCurrency = fromNameToCurrencyObj(currency?.symbol);
        dispatch(
          buy({
            id: nftId,
            tokenAmount: isMultiple ? quantity : '0',
            amount: owner.price || normalPrice,
            sellerId: owner.url,
            currency: tokenCurrency,
            web3Provider: walletService.Web3(),
          }),
        );
        dispatch(
          setModalProps({
            onApprove: () => handleBuyAction(),
            onSendAgain: () => handleBuyAction(),
            onTryAgain: () => handleBuyAction(),
          }),
        );
      }
    } else {
      changeModalType(Modals.ConnectWallet);
    }
  }, [changeModalType, currency, dispatch, isMultiple, nftId,
    normalPrice, owner, quantity, userAddress?.length, walletService]);

  const canBuy = new BigNumber(userBalance[currency?.symbol]).gte(normalPrice);
  return (
    <div className={styles.owner}>
      <div className={styles.left}>
        <Avatar size={40} avatar={owner.avatar} id={owner.url} withShadow />
        <div className={styles.ownerInfo}>
          <Text variant="body-2" color="darkDefault" weight="semiBold" className={styles.ownerInfoText}>
            {owner.name}
          </Text>
          {isSelling && !isAuction && (
            <Text size="xs" color="metal400" tag="span">
              {owner.sellingQuantity}/{owner.quantity} on sale for{' '}
              <Text size="xs" color="accent" weight="semiBold" tag="span">
                <NumberText>{owner.price}</NumberText> {owner.currency.symbol}
              </Text>{' '}
              each
            </Text>
          )}
        </div>
      </div>
      {isSelling && !isAuction && (
        <div className={styles.right}>
          {+owner.sellingQuantity > 1 && (
            <QuantityInput
              value={quantity}
              setValue={handleChangeQuantity}
              name={`amount${owner.url}`}
              minAmount={1}
              maxAmount={+owner.sellingQuantity}
            />
          )}
          <Button className={styles.buy} onClick={handleBuyAction} size="sm" disabled={!canBuy}>
            {userAddress.length > 0 ? 'Buy' : 'Connect'}
          </Button>
        </div>
      )}
    </div>
  );
};
