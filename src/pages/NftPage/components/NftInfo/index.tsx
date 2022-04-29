/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC, useCallback, useMemo, useState } from 'react';
import { LikeButton, Text } from 'components';

import { Dots } from 'assets/icons/icons';
import { sliceString } from 'utils';
import styles from './styles.module.scss';

type Props = {
  name: string;
  id: string | number;
  description: string;
  likeCount: number;
  isLiked: boolean;
};
const NftInfo: FC<Props> = ({ name, id, description, likeCount, isLiked }) => {
  const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
  const isShowDots = useMemo(
    () => description.length > 120 && !isDescriptionOpened,
    [description.length, isDescriptionOpened],
  );
  const handleOpenDescription = useCallback(() => {
    setIsDescriptionOpened(!isDescriptionOpened);
  }, [isDescriptionOpened]);
  return (
    <div className={styles.nftInfo}>
      <div className={styles.nftInfoTop}>
        <Text variant="subtitle-1" color="dark">
          {name}
        </Text>
        <LikeButton likesCount={likeCount} isLiked={isLiked} />
      </div>
      <Text variant="body-2" color="metal800">
        Id: {id}
      </Text>
      <div className={styles.nftInfoDescription}>
        <Text variant="body-2" color="metal800">
          {isDescriptionOpened ? description : sliceString(description, 120, 0)}
        </Text>
        {isShowDots && (
          <div className={styles.dots} onClick={handleOpenDescription}>
            <Dots />
          </div>
        )}
      </div>
    </div>
  );
};
export default NftInfo;
