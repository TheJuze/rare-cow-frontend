/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import nftsSelector from 'store/nfts/selectors';

import cx from 'classnames';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import { ArtCard, Loader, Text } from 'components';

import { useShallowSelector, useWindowState } from 'hooks';

import 'swiper/swiper.less';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import { createDynamicLink, routes } from 'appConstants';
import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/nfts/actionTypes';
import { getFeatured } from 'store/nfts/actions';
import { RequestStatus } from 'types';
import { setFeatured, setFeaturedId } from 'store/nfts/reducer';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};
const Trending: FC<Props> = ({ className }) => {
  const nfts = useShallowSelector(nftsSelector.getProp('featured'));
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { [actionTypes.GET_TRENDING]: fetchingTrending } = useShallowSelector(uiSelector.getUI);
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const { width } = useWindowState();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const bulletsRef = useRef(null);

  const isNftsLoading = useMemo(
    () => fetchingTrending === RequestStatus.REQUEST,
    [fetchingTrending],
  );

  const slidesToShow = (widthValue: number) => {
    if (widthValue > 1200) {
      return 4;
    }
    if (widthValue > 950) {
      return 3;
    }
    if (widthValue > 650) {
      return 2;
    }
    return 1;
  };

  const isSwiper = useMemo(() => nfts.length >= numberOfSlide, [nfts.length, numberOfSlide]);

  const fetchFeaturedNfts = useCallback(() => {
    dispatch(
      getFeatured(),
    );
  }, [dispatch]);

  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    setNumberOfSlide(slidesToShow(width));
  }, [width]);

  useEffect(() => {
    fetchFeaturedNfts();
  }, [fetchFeaturedNfts]);

  const onNftPageClick = useCallback((nftId, featuredId) => {
    dispatch(setFeaturedId(featuredId));
    navigator(createDynamicLink(routes.nest.nft.path, { id: nftId }));
  }, [dispatch, navigator]);

  useEffect(() => () => { dispatch(setFeatured([])); }, [dispatch]);

  const renderItems = useMemo(() => {
    let result;
    if (isNftsLoading) {
      result = <Loader className={styles.loader} />;
    }
    if (isSwiper && nfts?.length) {
      result = (
        <div className={cx(styles.drops, { [styles.row]: nfts.length <= numberOfSlide })}>
          <div ref={prevRef} className={cx('swiper-button-prev', styles['swiper-button-prev'])} />
          <div ref={nextRef} className={cx('swiper-button-next', styles['swiper-button-next'])} />
          <div className={styles.bullets} ref={bulletsRef} />
          <Swiper
            spaceBetween={30}
            // centeredSlides
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
              el: bulletsRef.current,
              bulletClass: cx(styles['swiper-pagination-bullet'], 'swiper-pagination-bullet'),
              bulletActiveClass: cx(styles.active, 'swiper-pagination-bullet-active'),
            }}
            slidesPerView={numberOfSlide}
            loop
            className={styles.swiper}
            onSwiper={(swiper) => {
              // Delay execution for the refs to be defined
              setTimeout(() => {
                // Override prevEl & nextEl now that refs are defined
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                swiper.params.pagination.el = bulletsRef.current;

                // Re-init navigation
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {nfts.map((nft) => {
              const {
                id,
                name,
                price,
                highestBid,
                media,
                currency,
                creator,
                isAucSelling,
                standart,
                likeCount,
                isLiked,
                available,
                endAuction,
                promotionInfo,
              } = nft;
              return (
                <SwiperSlide key={id}>
                  <div
                    onClick={() => onNftPageClick(id, promotionInfo?.id)}
                    className={styles.drop}
                  >
                    <ArtCard
                      id={id || 0}
                      inStock={available}
                      name={name}
                      price={price || highestBid?.amount}
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
                      isPromo
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      );
    }
    if (nfts?.length && !isSwiper) {
      result = (
        <div className={cx(styles.drops, { [styles.row]: nfts.length <= numberOfSlide })}>
          {nfts.map((nft) => {
            const {
              id,
              name,
              price,
              highestBid,
              media,
              currency,
              creator,
              isAucSelling,
              standart,
              likeCount,
              isLiked,
              available,
              endAuction,
              promotionInfo,
            } = nft;
            return (
              <div
                key={id}
                onClick={() => onNftPageClick(id, promotionInfo?.id)}
                className={cx(styles.drop, styles.dropDouble)}
              >
                <ArtCard
                  id={id || 0}
                  inStock={available}
                  name={name}
                  price={price || highestBid?.amount}
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
                  isPromo
                  className={styles.card}
                />
              </div>
            );
          })}
        </div>
      );
    }
    if (!isNftsLoading && !nfts?.length) {
      result = (
        <div className={styles.noItems}>
          <Text size="l" align="center">
            There is no featured tokens in this category
          </Text>
        </div>
      );
    }
    return result;
  }, [isNftsLoading, isSwiper, nfts, numberOfSlide, onNftPageClick]);

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.notableDrops, className)}>
        <Text
          variant="heading-2"
          weight="bold"
          color="accent"
          className={styles.title}
          align="center"
        >
          Featured tokens
        </Text>
        {renderItems}
      </div>
    </div>
  );
};

export default Trending;
