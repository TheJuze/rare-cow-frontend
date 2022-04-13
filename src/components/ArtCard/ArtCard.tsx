import React, { useCallback, useRef, VFC } from 'react';

import cn from 'clsx';

import { Text } from 'components/Typography';

import './styles.scss';
import { Link } from 'react-router-dom';
import { Loader } from 'components/Loader';
import { sliceString } from 'utils';
import { BidedIcon } from 'assets/icons/icons';
import { useTimeLeft } from 'hooks';
import { Avatar } from 'components/Avatar';
import { LikeButton } from 'components/LikeButton';

export interface ArtCardProps {
  className?: string;
  image: string;
  name: string;
  isAuction?: boolean;
  currency: string;
  price: string | number;
  id: string | number;
  endAuction: number;
  authorId: string | number;
  authorAvatar: string;
  authorName: string;
  likesCount: number;
  isLiked: boolean;
  standart: 'ERC721' | 'ERC1155';
  inStock: number;
}

export const ArtCard: VFC<ArtCardProps> = ({
  className,
  image,
  name,
  isAuction,
  currency,
  price,
  id,
  endAuction,
  authorId,
  authorAvatar,
  authorName,
  likesCount,
  isLiked,
  standart,
  inStock,
}) => {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const offset = 2.5;
  const timeLeft = useTimeLeft(endAuction * 1000);
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
  return (
    <div className={cn('artCard', className)}>
      {isAuction && (
        <div className="artCard-auction">
          <Text color="gray6">Auction</Text>
        </div>
      )}
      {standart === 'ERC1155' && (
        <div className="artCard-auction">
          <Text color="gray6">In stock: {inStock}</Text>
        </div>
      )}
      <Link
        to="/"
        // to={isCollection ? routes.collection.link(artId) : routes.nft.link(artId)}
        className="artCard-imageWrapper"
        onMouseOver={onMouseOver}
        onFocus={() => {}}
        ref={wrapRef}
      >
        {image ? (
          <img ref={imgRef} className="artCard-image" src={image} alt="" />
        ) : (
          <Loader className="artCard-loader" />
        )}
      </Link>
      <div className="artCard-info__wrapper">
        <div className="artCard-info__line">
          <Text color="dark" weight="medium">
            {sliceString(name, 20, 0)}
          </Text>
          {price ? (
            <div className="artCard-info__line-price">
              {isAuction && <BidedIcon />}
              <img src={currency} alt="currency" className="artCard-info__line-price-currency" />
              <Text color="accent">{price}</Text>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="artCard-info__line">
          <Text color="light3">Id: {id}</Text>
          {endAuction && timeLeft ? (
            <Text color="light3">
              {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}:
              {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
              {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
            </Text>
          ) : (
            <></>
          )}
        </div>
        <div className="artCard-info__line">
          <div className="artCard-info__line-author">
            <Avatar id={authorId} avatar={authorAvatar} size={28} />
            <Text color="dark" className="artCard-info__line-author-name" weight="medium">
              {sliceString(authorName, 10, 5)}
            </Text>
          </div>
          <LikeButton likesCount={likesCount} isLiked={isLiked} />
        </div>
      </div>
    </div>
  );
};
