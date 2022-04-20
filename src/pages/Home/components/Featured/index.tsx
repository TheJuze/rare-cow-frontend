/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// import { useDispatch } from 'react-redux';
// import { getTrending } from 'store/nfts/actions';
// import { clearTrending } from 'store/nfts/reducer';
// import nftsSelector from 'store/nfts/selectors';

import cx from 'classnames';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import { ArtCard, Text } from 'components';

import { useWindowState } from 'hooks';
import { nfts } from 'components/ArtCard/ArtCard.stories';

import 'swiper/swiper.less';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};
const Trending: FC<Props> = ({ className }) => {
  // const categories = useShallowSelector(nftsSelector.getProp('categories'));
  // const nfts = useShallowSelector(nftsSelector.getProp('trending'));
  // const dispatch = useDispatch();
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const { width } = useWindowState();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const slidesToShow = (widthValue: number) => {
    if (widthValue < 850) {
      return 1;
    }
    if (widthValue < 1050) {
      return 2;
    }
    if (widthValue < 1200) {
      return 3;
    }
    return 4;
  };

  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    setNumberOfSlide(slidesToShow(width));
  }, [width]);

  // const fetchTrendingNfts = useCallback(() => {
  //   dispatch(
  //     getTrending(
  //       title.name !== CategoryName.allCategories
  //         ? {
  //           category: title?.id,
  //         }
  //         : {},
  //     ),
  //   );
  // }, [dispatch, title]);

  // useEffect(() => {
  //   fetchTrendingNfts();
  // }, [fetchTrendingNfts]);

  // useEffect(
  //   () => () => {
  //     dispatch(clearTrending());
  //   },
  //   [dispatch],
  // );
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.notableDrops, className)}>
        <Text variant="heading-2" weight="bold" color="accent" className={styles.title} align="center">
          Featured tokens
        </Text>
        {nfts.length ? (
          <div className={cx(styles.drops, { [styles.row]: nfts.length <= 3 })}>
            {nfts.length > numberOfSlide ? (
              <>
                <div
                  ref={prevRef}
                  className={cx('swiper-button-prev', styles['swiper-button-prev'])}
                />
                <div
                  ref={nextRef}
                  className={cx('swiper-button-next', styles['swiper-button-next'])}
                />
                <Swiper
                  spaceBetween={30}
                  // centeredSlides
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
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
                      <SwiperSlide key={id}>
                        <Link to="/" className={styles.drop}>
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
                            isPromo
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            ) : (
              nfts.map((nft) => {
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
                  <Link key={id} to="/" className={cx(styles.drop, styles.dropDouble)}>
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
                      isPromo
                    />
                  </Link>
                );
              })
            )}
          </div>
        ) : (
          <div className={styles.noItems}>
            <Text size="l" align="center">
              There is no trending tokens in this category
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
