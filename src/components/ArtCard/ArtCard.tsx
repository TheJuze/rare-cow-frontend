import React, {
  useCallback, useMemo, useRef, VFC,
} from 'react';

import cn from 'clsx';

import { Text } from 'components/Typography';

import './styles.scss';
import { Loader } from 'components/Loader';
import { formatDigits, sliceString } from 'utils';
import { BidedIcon } from 'assets/icons/icons';
import { useTimeLeft } from 'hooks';
import { Avatar } from 'components/Avatar';
import { LikeButton } from 'components/LikeButton';
import { ENftTags, TagsWrapper, TTagsPropsMap } from 'components/Preview';

export interface ArtCardProps {
  className?: string;
  media: string;
  name: string;
  isAuction?: boolean;
  currency: string;
  price: string | number;
  id: string | number;
  endAuction: string | number;
  authorId: string | number;
  authorAvatar: string;
  authorName: string;
  likeCount: number;
  isLiked: boolean;
  standart: string | 'ERC721' | 'ERC1155';
  inStock: number;
  isPromo?: boolean;
}

export const ArtCard: VFC<ArtCardProps> = ({
  className,
  media,
  name,
  isAuction,
  currency,
  price,
  id,
  endAuction,
  authorId,
  authorAvatar,
  authorName,
  likeCount,
  isLiked,
  standart,
  inStock,
  isPromo = false,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const offset = 2.5;
  const timeLeft = useTimeLeft(Number(endAuction) * 1000);
  const onMouseOver = useCallback(() => {
    if (wrapRef.current && imgRef.current) {
      const div = wrapRef.current;
      const img = imgRef.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mouseMoveEvent = (e: any) => {
        const moveX = 100 - ((e.offsetX - offset) / div.offsetWidth) * 100;
        const moveY = 100 - ((e.offsetY - offset) / div.offsetHeight) * 100;
        img.style.objectPosition = `${moveX}% ${moveY}%`;
      };
      div.addEventListener('mousemove', mouseMoveEvent);
      // eslint-disable-next-line func-names
      div.onmouseleave = function () {
        div.removeEventListener('mousemove', mouseMoveEvent);
        img.style.objectPosition = '50% 50%';
        div.onmouseleave = null;
      };
    }
  }, [imgRef, wrapRef]);

  const tagsProps = useMemo<TTagsPropsMap>(() => (id ? {
    Auction: isAuction,
    InStock: standart === 'ERC1155' ? inStock : 0,
    Promote: isPromo,
  } : {}), [id, inStock, isAuction, isPromo, standart]);

  return (
    <div className={cn('artCard', className)}>
      <div
        className="artCard-imageWrapper"
        onMouseOver={onMouseOver}
        onFocus={() => {}}
        ref={wrapRef}
      >
        {media ? (
          <TagsWrapper
            tags={[ENftTags.Auction, ENftTags.InStock, ENftTags.Promote]}
            propsMap={tagsProps}
          >
            <img ref={imgRef} className="artCard-image" src={media} alt="" />
          </TagsWrapper>

        ) : (
          <Loader className="artCard-loader" />
        )}
      </div>
      <div className="artCard-info__wrapper">
        <div className="artCard-info__line">
          <Text size="s" color="darkDefault" weight="medium">
            {sliceString(name, 20, 0)}
          </Text>
          {price ? (
            <div className="artCard-info__line-price">
              {isAuction && <BidedIcon />}
              <img src={currency} alt="currency" className="artCard-info__line-price-currency" />
              <Text variant="body-2" color="accent">{formatDigits(+price)}</Text>
            </div>
          ) : (
            null
          )}
        </div>
        <div className="artCard-info__line">
          <Text size="s" color="light3">Id: {id}</Text>
          {endAuction && timeLeft ? (
            <Text size="s" color="light3">
              {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
              {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
              {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
            </Text>
          ) : (
            null
          )}
        </div>
        <div className="artCard-info__line">
          <div className="artCard-info__line-author">
            <Avatar id={authorId} avatar={authorAvatar} size={28} />
            <Text size="xs" color="darkDefault" className="artCard-info__line-author-name" weight="medium">
              {sliceString(authorName, 7, 5)}
            </Text>
          </div>
          <LikeButton
            nftId={String(id)}
            likesCount={likeCount}
            isLiked={isLiked}
            className="artCard-info__line-author-like"
          />
        </div>
      </div>
    </div>
  );
};
