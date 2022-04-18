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
import { CategoryName } from 'types';
import { nfts } from 'components/ArtCard/ArtCard.stories';
import Anime from 'assets/img/categoriesAnime.png';
import Photo from 'assets/img/categoriesPhoto.png';
import Art from 'assets/img/categoriesArt.png';
import Music from 'assets/img/categoriesMusic.png';
import Picture from 'assets/img/categoriesPicture.png';
import Movie from 'assets/img/categoriesMovie.png';
import { TitleDropdown } from './components';

import 'swiper/swiper.less';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import styles from './styles.module.scss';

interface Tag {
  id?: number;
  name?: string;
}
interface Category {
  id?: number;
  image: string;
  name?: string;
  tags: Tag[];
}

export const categories = [
  {
    id: 1,
    name: 'Anime illustration',
    tags: [
      { id: 1, name: 'Category №1' },
      { id: 2, name: 'Category №2' },
      { id: 3, name: 'Category №3' },
    ],
    image: Anime,
  },
  {
    id: 2,
    name: 'Photo',
    tags: [
      { id: 4, name: 'Category №4' },
      { id: 5, name: 'Category №5' },
    ],
    image: Photo,
  },
  {
    id: 3,
    name: 'Art',
    tags: [{ id: 6, name: 'Category №6' }],
    image: Art,
  },
  {
    id: 4,
    name: 'Music',
    tags: [
      { id: 7, name: 'Category №7' },
      { id: 8, name: 'Category №8' },
      { id: 9, name: 'Category №9' },
      { id: 10, name: 'Category №10' },
      { id: 11, name: 'Category №11' },
    ],
    image: Music,
  },
  {
    id: 5,
    name: 'Picture',
    tags: [
      { id: 7, name: 'Category №7' },
      { id: 8, name: 'Category №8' },
      { id: 9, name: 'Category №9' },
      { id: 10, name: 'Category №10' },
      { id: 11, name: 'Category №11' },
    ],
    image: Picture,
  },
  {
    id: 6,
    name: 'Movie',
    tags: [
      { id: 7, name: 'Category №7' },
      { id: 8, name: 'Category №8' },
      { id: 9, name: 'Category №9' },
      { id: 10, name: 'Category №10' },
      { id: 11, name: 'Category №11' },
    ],
    image: Movie,
  },
];

type Props = {
  className?: string;
};
const Trending: FC<Props> = ({ className }) => {
  // const categories = useShallowSelector(nftsSelector.getProp('categories'));
  // const nfts = useShallowSelector(nftsSelector.getProp('trending'));
  // const dispatch = useDispatch();
  const [title, setTitle] = useState<any>({ name: CategoryName.allCategories, id: 0 });
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
        <Text variant="heading-2" className={styles.title} align="center">
          Trending in
          {categories?.length && (
            <TitleDropdown
              value={title}
              setValue={setTitle}
              options={[
                { name: CategoryName.allCategories, id: 0 },
                ...categories.map((category: Category) => ({
                  id: category.id || 0,
                  name: category.name || '',
                })),
              ]}
            />
          )}
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
