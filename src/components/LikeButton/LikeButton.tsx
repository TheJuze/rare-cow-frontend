import React, {
  useEffect, useCallback, useState, VFC,
} from 'react';

import cn from 'clsx';

import { Button } from 'components/Button';
import { Like } from 'assets/icons/icons';
import './styles.scss';
import { formatDigits } from 'utils/numberFormatter';
import { toast } from 'react-toastify';
import { like } from 'store/nfts/actions';
import { useDispatch } from 'react-redux';

export interface LikeButtonProps {
  className?: string;
  likesCount: number;
  isLiked: boolean;
  nftId: string;
}

/**
 * @param {number} likesCount - count of likes at the moment of initialization
 * @param {boolean} isLiked - the like state
 * @param {string} [className] - the wrapper class name
 */
export const LikeButton: VFC<LikeButtonProps> = ({
  className, likesCount, isLiked, nftId,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);

  useEffect(() => {
    setCount(likesCount);
  }, [likesCount]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const dispatch = useDispatch();

  const successCallback = useCallback(() => {
    if (liked) {
      setCount(isLiked ? likesCount - 1 : likesCount);
      setLiked(false);
    } else {
      setCount(isLiked ? likesCount : likesCount + 1);
      setLiked(true);
    }
  }, [liked, isLiked, likesCount]);

  const errorCallback = useCallback(() => {
    if (liked) {
      toast.error('Dislike error');
    } else {
      toast.error('Like error');
    }
  }, [liked]);

  const likeAction = useCallback(
    (art: number | string) => {
      dispatch(
        like({
          id: art,
          successCallback,
          errorCallback,
        }),
      );
    },
    [dispatch, errorCallback, successCallback],
  );

  const onLikeClickHandler = useCallback(() => {
    likeAction(nftId);
  }, [likeAction, nftId]);

  return (
    <Button
      startAdornment={<Like />}
      variant="filled"
      color="primary"
      className={cn(className, 'likeButton', { liked })}
      active={liked}
      onClick={onLikeClickHandler}
    >
      {formatDigits(count)}
    </Button>
  );
};
