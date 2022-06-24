/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'assets/img';

import { useDispatch } from 'react-redux';
import { getTrending } from 'store/nfts/actions';
import { clearTrending } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';

import cx from 'classnames';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { createDynamicLink, routes } from 'appConstants';
import { ArtCard, Loader, Text } from 'components';

import { useShallowSelector, useWindowState } from 'hooks';
import { CategoryName, RequestStatus } from 'types';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { TitleDropdown } from './components';

import 'swiper/swiper.less';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const Trending: FC<Props> = ({ className }) => {
  const categories = useShallowSelector(nftsSelector.getProp('categories'));
  const nfts = useShallowSelector(nftsSelector.getProp('trending'));
  const dispatch = useDispatch();
  const { [actionTypes.GET_TRENDING]: fetchingTrending } = useShallowSelector(uiSelector.getUI);
  const [title, setTitle] = useState<any>({ name: CategoryName.allCategories, id: 0 });
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const { width } = useWindowState();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const bulletsRef = useRef(null);
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

  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    setNumberOfSlide(slidesToShow(width));
  }, [width]);

  const isSwiper = useMemo(() => nfts.length >= numberOfSlide, [nfts.length, numberOfSlide]);
  const isNftsLoading = useMemo(
    () => fetchingTrending === RequestStatus.REQUEST,
    [fetchingTrending],
  );

  const fetchTrendingNfts = useCallback(() => {
    dispatch(
      getTrending(title.name !== CategoryName.allCategories ? { tags: title?.id } : { tags: '' }),
    );
  }, [dispatch, title]);

  useEffect(() => {
    fetchTrendingNfts();
  }, [fetchTrendingNfts]);

  useEffect(
    () => () => {
      dispatch(clearTrending());
    },
    [dispatch],
  );

  const renderItems = useMemo(() => {
    let result;
    if (isNftsLoading) {
      result = <Loader className={styles.loader} />;
    }
    if (isSwiper && nfts?.length) {
      result = (
        <div className={cx(styles.drops, { [styles.row]: nfts.length <= numberOfSlide })}>
          <div ref={prevRef} className={cx('swiper-button-prev', styles['swiper-button-prev'])}>
            <ArrowLeft className={styles['swiper-button-prev-icon']} />
          </div>
          <div ref={nextRef} className={cx('swiper-button-next', styles['swiper-button-next'])}>
            <ArrowRight className={styles['swiper-button-next-icon']} />
          </div>
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
                onPromotion,
                isTimedAucSelling,
              } = nft;
              return (
                <SwiperSlide key={id}>
                  <Link
                    to={createDynamicLink(routes.nest.nft.path, { id })}
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
                      isAuction={isAucSelling || isTimedAucSelling}
                      likeCount={likeCount}
                      isLiked={isLiked}
                      standart={standart}
                      endAuction={endAuction}
                      className={styles.card}
                      isPromo={onPromotion}
                    />
                  </Link>
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
              onPromotion,
              isTimedAucSelling,
            } = nft;
            return (
              <Link
                key={id}
                to={createDynamicLink(routes.nest.nft.path, { id })}
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
                  isAuction={isAucSelling || isTimedAucSelling}
                  likeCount={likeCount}
                  isLiked={isLiked}
                  standart={standart}
                  endAuction={endAuction}
                  isPromo={onPromotion}
                  className={styles.card}
                />
              </Link>
            );
          })}
        </div>
      );
    }
    if (!isNftsLoading && !nfts?.length) {
      result = (
        <div className={styles.noItems}>
          <Text size="l" align="center">
            There is no trending tokens in this category
          </Text>
        </div>
      );
    }
    return result;
  }, [isNftsLoading, isSwiper, nfts, numberOfSlide]);
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.notableDrops, className)}>
        <Text
          variant="heading-2"
          weight="bold"
          color="darkDefault"
          className={styles.title}
          align="center"
        >
          Trending in
          {categories?.length ? (
            <TitleDropdown value={title} setValue={setTitle} options={categories} />
          ) : (
            ' All Categories'
          )}
        </Text>
        {renderItems}
      </div>
    </div>
  );
};

export default Trending;
