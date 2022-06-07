import { fromNameToCurrencyObj } from 'appConstants';
import { Button, SellersModal } from 'components';
import { useModals, useShallowSelector } from 'hooks';
import React, { useCallback, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useWalletConnectorContext } from 'services';
import { setModalProps } from 'store/modals/reducer';
import { buy } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';
import { Modals } from 'types';
import { Currency, Ownership } from 'types/api';

import styles from '../../styles.module.scss';

interface IUserBuy {
  isMultiple: boolean;
  sellers: Ownership[];
  currency: Currency;
  nftId: string;
  normalPrice: string;
}

export const UserBuy: VFC<IUserBuy> = ({
  isMultiple, sellers, currency, nftId, normalPrice,
}) => {
  const dispatch = useDispatch();
  const { modalType, closeModals, changeModalType } = useModals();
  const { walletService } = useWalletConnectorContext();
  const userAddress = useShallowSelector(userSelector.getProp('address'));

  const handleBuyAction = useCallback(
    (seller: Ownership, amount: string) => {
      if (seller && currency) {
        const tokenCurrency = fromNameToCurrencyObj(currency?.symbol);
        dispatch(
          buy({
            id: nftId,
            tokenAmount: amount,
            sellerId: seller.url,
            currency: tokenCurrency,
            amount: seller.price || normalPrice,
            web3Provider: walletService.Web3(),
          }),
        );
        dispatch(
          setModalProps({
            onApprove: () => handleBuyAction(seller, amount),
            onSendAgain: () => handleBuyAction(seller, amount),
            onTryAgain: () => handleBuyAction(seller, amount),
          }),
        );
      }
    },
    [currency, dispatch, nftId, normalPrice, walletService],
  );

  const onBuyClickHandler = useCallback(() => {
    if (userAddress.length > 0) {
      if (isMultiple) {
        changeModalType(Modals.ChooseSeller);
      } else {
        const seller = sellers?.[0];
        handleBuyAction(seller, '0');
      }
    } else {
      changeModalType(Modals.ConnectWallet);
    }
  }, [changeModalType, handleBuyAction, isMultiple, sellers, userAddress.length]);

  const handleChooseSeller = useCallback(
    (seller: Ownership, amount: string) => {
      if (seller) {
        handleBuyAction(seller, isMultiple ? amount : '0');
      }
    },
    [handleBuyAction, isMultiple],
  );

  return (
    <>
      <SellersModal
        visible={modalType === Modals.ChooseSeller}
        onClose={() => closeModals()}
        sellers={sellers}
        handleChooseSeller={handleChooseSeller}
        currency={currency}
      />
      <Button onClick={onBuyClickHandler} className={styles.buy}>
        {userAddress.length > 0 ? 'Buy' : 'Connect wallet'}
      </Button>
    </>
  );
};
