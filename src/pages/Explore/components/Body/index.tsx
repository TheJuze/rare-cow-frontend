/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, VFC } from 'react';
import { ArtCard, Checkbox, CheckboxButton, Dropdown, Input, Text } from 'components';

import { nfts } from 'components/ArtCard/ArtCard.stories';
import { Link } from 'react-router-dom';
import { usdt, matic } from 'assets/img';
import arrowDown from 'assets/img/icons/arrowDown.svg';
import arrowUp from 'assets/img/icons/arrowUp.svg';
import styles from './styles.module.scss';

interface IBodyProps {}

const Body: VFC<IBodyProps> = () => {
  const [isAuction, setIsAuction] = useState(false);
  const [is721Active, setIs721Active] = useState(false);
  const [is1155Active, setIs1155Active] = useState(false);
  const [isMaticActive, setIsMaticActive] = useState(false);
  const [isUsdtActive, setIsUsdtActive] = useState(false);
  const [isDateLastActive, setIsDateLastActive] = useState(false);
  const [isDateNewActive, setIsDateNewActive] = useState(false);
  const [isLikesUpActive, setIsLikesUpActive] = useState(false);
  const [isLikesDownActive, setIsLikesDownActive] = useState(false);
  const [isPriceUpActive, setIsPriceUpActive] = useState(false);
  const [isPriceDownActive, setIsPriceDownActive] = useState(false);

  const currencyOptions = [
    {
      id: '0',
      content: (
        <CheckboxButton
          isChecked={isMaticActive}
          onChange={() => setIsMaticActive(!isMaticActive)}
          content={(
            <div className={styles.currency}>
              <img src={matic} alt="currency" />
              <Text variant="body-2">MATIC</Text>
            </div>
)}
        />
      ),
    },
    {
      id: '1',
      content: (
        <CheckboxButton
          isChecked={isUsdtActive}
          onChange={() => setIsUsdtActive(!isUsdtActive)}
          content={(
            <div className={styles.currency}>
              <img src={usdt} alt="currency" />
              <Text variant="body-2">USDT</Text>
            </div>
)}
        />
      ),
    },
  ];
  const dateOptions = [
    {
      id: '0',
      content: (
        <CheckboxButton
          isChecked={isDateLastActive}
          onChange={() => setIsDateLastActive(!isDateLastActive)}
          content={(
            <div className={styles.currency}>
              <Text variant="body-2">Date Last</Text>
              <img src={arrowDown} alt="arrowDown" />
            </div>
)}
        />
      ),
    },
    {
      id: '1',
      content: (
        <CheckboxButton
          isChecked={isDateNewActive}
          onChange={() => setIsDateNewActive(!isDateNewActive)}
          content={(
            <div className={styles.currency}>
              <Text variant="body-2">Date New</Text>
              <img src={arrowUp} alt="arrowUp" />
            </div>
)}
        />
      ),
    },
  ];
  const likesOptions = [
    {
      id: '0',
      content: (
        <CheckboxButton
          isChecked={isLikesUpActive}
          onChange={() => setIsLikesUpActive(!isLikesUpActive)}
          content={(
            <div className={styles.currency}>
              <Text variant="body-2">Likes</Text>
              <img src={arrowUp} alt="arrowUp" />
            </div>
)}
        />
      ),
    },
    {
      id: '1',
      content: (
        <CheckboxButton
          isChecked={isLikesDownActive}
          onChange={() => setIsLikesDownActive(!isLikesDownActive)}
          content={(
            <div className={styles.currency}>
              <Text variant="body-2">Likes</Text>
              <img src={arrowDown} alt="arrowDown" />
            </div>
)}
        />
      ),
    },
  ];
  const priceOptions = [
    {
      id: '0',
      content: (
        <div className={styles.price}>
          <CheckboxButton
            isChecked={isPriceUpActive}
            onChange={() => setIsPriceUpActive(!isPriceUpActive)}
            content={(
              <div className={styles.currency}>
                <Text variant="body-2">Price</Text>
                <img src={arrowUp} alt="arrowUp" />
              </div>
  )}
          />
          <CheckboxButton
            isChecked={isPriceDownActive}
            onChange={() => setIsPriceDownActive(!isPriceDownActive)}
            content={(
              <div className={styles.currency}>
                <Text variant="body-2">Price</Text>
                <img src={arrowDown} alt="arrowDown" />
              </div>
  )}
          />
        </div>),
    },
    {
      id: '0',
      content: (
        <div className={styles.priceInputs}>
          <div className={styles.priceTitles}>
            <Text color="light4" className={styles.priceTitle}>Min</Text>
            <Text color="light4" className={styles.priceTitle}>Max</Text>
          </div>
          <div className={styles.priceItems}>
            <div className={styles.priceItem}>
              <Input name="min" classNameBody={styles.priceInput} placeholder="0.00" />
            </div>
            <Text>-</Text>
            <div className={styles.priceItem}>
              <Input name="max" classNameBody={styles.priceInput} placeholder="0.00" />
            </div>
          </div>
        </div>),
    },
  ];
  const minSize = 264;
  return (
    <div className={styles.body}>
      <div className={styles.bodyFilters}>
        <Text variant="body-2" className={styles.bodyFiltersTitle}>
          Filter
        </Text>
        <div className={styles.standarts}>
          <CheckboxButton
            isChecked={is721Active}
            onChange={() => setIs721Active(!is721Active)}
            content={<Text variant="body-2">721 NFT</Text>}
            className={styles.standart}
          />
          <CheckboxButton
            isChecked={is1155Active}
            onChange={() => setIs1155Active(!is1155Active)}
            content={<Text variant="body-2">1155 NFT</Text>}
            className={styles.standart}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            value={{ id: '0', content: 'Any currency' }}
            setValue={() => {}}
            classNameBody={styles.dropdownBody}
            options={currencyOptions}
            name="currency"
            variant="transparent"
            isOutsideClickClose={false}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            value={{ id: '0', content: 'Date' }}
            setValue={() => {}}
            classNameBody={styles.dropdownBody}
            options={dateOptions}
            name="date"
            variant="transparent"
            isOutsideClickClose={false}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            value={{ id: '0', content: 'Likes' }}
            setValue={() => {}}
            classNameBody={styles.dropdownBody}
            options={likesOptions}
            name="likes"
            variant="transparent"
            isOutsideClickClose={false}
          />
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            value={{ id: '0', content: 'Price' }}
            setValue={() => {}}
            classNameBody={styles.dropdownBody}
            options={priceOptions}
            name="price"
            variant="transparent"
            isOutsideClickClose={false}
          />
          <div className={styles.auction}>
            <Checkbox value={isAuction} onChange={() => setIsAuction(!isAuction)}>
              <Text size="xs">Auction</Text>
            </Checkbox>
          </div>
        </div>
      </div>
      <div
        className={styles.bodyResults}
        style={{
          gridTemplateColumns:
            nfts.length !== 0 ? `repeat(auto-fill,minmax(${minSize}px,1fr))` : '1fr',
        }}
      >
        {nfts.map((nft) => {
          const {
            id,
            name,
            price,
            highestBid,
            minimalBid,
            media,
            currency,
            creator,
            isAucSelling,
            standart,
            likeCount,
            isLiked,
            available,
            endAuction,
          } = nft;
          return (
            <Link key={id} to="/" className={styles.card}>
              <ArtCard
                id={id || 0}
                inStock={available}
                name={name}
                price={price || highestBid?.amount || minimalBid}
                media={media || ''}
                currency={currency?.image || ''}
                authorName={creator?.name || ''}
                authorAvatar={creator?.avatar || ''}
                authorId={creator?.url || '0'}
                isAuction={isAucSelling || Boolean(endAuction)}
                likeCount={likeCount}
                isLiked={isLiked}
                standart={standart}
                endAuction={endAuction}
                className={styles.card}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
