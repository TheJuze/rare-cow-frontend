/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { ArrowGreen } from 'assets/icons/icons';
import { matic } from 'assets/img';
import BigNumber from 'bignumber.js';
import {
  Text,
  Countdown,
  Button,
  Selector,
  Input,
  CheckboxButton,
  Avatar,
  OptionSelector,
} from 'components';
import { rates } from 'containers';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { TOption } from 'types';
import { validateOnlyNumbers } from 'utils';

import styles from './styles.module.scss';

type Props = {
  endAuction: number;
  price: string | number;
  usdPrice: string | number;
  isAucSelling: boolean;
  isTimedAucSelling: boolean;
  highestBid?: any;
};
const isOwner = true;
const isUserCanBuy = true;
const methods: TOption[] = [
  { content: 'Price', value: 'price' },
  { content: 'Auction', value: 'auction' },
  { content: 'Auction time', value: 'time' },
];

const NftPayment: FC<Props> = ({
  endAuction,
  price,
  usdPrice,
  isAucSelling,
  isTimedAucSelling,
  highestBid,
}) => {
  const [isTransfer, setIsTransfer] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const [activeCurrency, setActiveCurrency] = useState(rates[0]);
  const [method, setMethod] = useState(methods[0]);
  const isAuction = useMemo(
    () => isAucSelling || isTimedAucSelling,
    [isAucSelling, isTimedAucSelling],
  );

  const handleChaneTransfer = useCallback(() => {
    setIsTransfer(!isTransfer);
  }, [isTransfer]);

  const handleChangeCurrency = useCallback((newCurrency) => {
    setActiveCurrency(newCurrency);
  }, []);

  const handleChangeMethod = useCallback((newMethod) => {
    setMethod(newMethod);
  }, []);

  const handlePriceValueChange = useCallback((newPriceValue: string) => {
    if (!validateOnlyNumbers(newPriceValue)) return;
    setPriceValue(newPriceValue);
  }, []);

  return (
    <div className={styles.nftPayment}>
      {isOwner && (
        <>
          <Selector
            value={isTransfer}
            setValue={handleChaneTransfer}
            name="transfer"
            optionLeft="Transfer"
            optionRight="List for sale"
            className={styles.selector}
          />
          {isTransfer ? (
            <div className={styles.transfer}>
              <Input name="transfer" label="Send to Address" placeholder="Input address" />
              <Button className={styles.send}>
                <Text variant="body-2" color="light">
                  Send
                </Text>
              </Button>
            </div>
          ) : (
            <div className={styles.listing}>
              <div className={styles.method}>
                <OptionSelector
                  name="method"
                  options={methods}
                  selected={method}
                  setSelected={handleChangeMethod}
                  dir="horizontal"
                />
                {/* // TODO: Вставить 12, 24, 48 часов */}
              </div>
              <div className={styles.rates}>
                {rates.map((rate) => (
                  <CheckboxButton
                    isChecked={rate.symbol === activeCurrency.symbol}
                    onChange={() => handleChangeCurrency(rate)}
                    className={styles.currencyWrapper}
                    content={
                      <div className={styles.currency}>
                        <img src={rate.image} alt="currency" />
                        <Text variant="body-2" color="light1" className={styles.currencyText}>
                          {rate.symbol}
                        </Text>
                      </div>
                    }
                  />
                ))}
              </div>
              <div className={styles.createLot}>
                <Text size="xs" color="base900">
                  {method.value === 'price' ? 'Price' : 'Bid'}
                </Text>
                <div className={styles.createLotInput}>
                  <Input
                    placeholder="0.00"
                    name="price"
                    value={priceValue}
                    onChange={(e) => handlePriceValueChange(e.target.value)}
                    endAdornment={
                      <img
                        src={activeCurrency.image}
                        alt="currency"
                        className={styles.createLotInputImage}
                      />
                    }
                  />
                  <Button className={styles.createLotButton} size="sm">
                    <Text variant="body-2" color="light">
                      Create lot
                    </Text>
                  </Button>
                </div>
                <Text className={styles.priceUsd}>
                  ${' '}
                  {new BigNumber(activeCurrency.rate)
                    .times(new BigNumber(priceValue || '0'))
                    .toFixed(2)}
                </Text>
              </div>
            </div>
          )}
        </>
      )}
      {isUserCanBuy && (
        <>
          <Countdown endAuction={endAuction} className={styles.countdown} />
          <div className={styles.priceWrapper}>
            {isAuction ? (
              <>
                {highestBid ? (
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
                {price}
              </Text>
            </div>
            <Text className={styles.priceUsd}>$ {usdPrice}</Text>
          </div>

          {highestBid ? (
            <div className={styles.bidder}>
              <Avatar id={highestBid.user.url} avatar={highestBid.user.avatar} size={40} />
              <Text className={styles.bidderName} color="dark" variant="body-2" weight="semiBold">
                {highestBid.user.display_name || highestBid.user.address}
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
