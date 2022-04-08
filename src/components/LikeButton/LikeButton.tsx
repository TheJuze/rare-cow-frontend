import { useEffect, useCallback, useState, VFC } from 'react';

import cn from 'clsx';

import { Button } from 'components/Button';
import { Like } from 'assets/icons/icons';
import './styles.scss';
import { formatDigits } from 'utils/numberFormatter';

export interface LikeButtonProps {
  className?: string;
  likesCount: number;
  isLiked: boolean;
}

export const LikeButton: VFC<LikeButtonProps> = ({ className, likesCount, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);

  const onLikeClickHandler = useCallback(() => {
    setCount((prev) => prev + (liked ? -1 : 1));
    setLiked(!liked);
  }, [liked]);

  useEffect(() => {
    setCount(likesCount);
  }, [likesCount]);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

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
