/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC } from 'react';
import { Avatar, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  creatorAvatar: string;
  creatorId: string;
  creatorName: string;
  collectionAvatar: string;
  collectionId: string;
  collectionName: string;
};
const NftCreators: FC<Props> = ({
  creatorAvatar,
  creatorId,
  creatorName,
  collectionAvatar,
  collectionId,
  collectionName,
}) => {
  return (
    <div className={styles.nftCreators}>
      <div className={styles.creator}>
        <Text size="xs">Created by</Text>
        <div className={styles.creatorWrapper}>
          <Avatar size={40} avatar={creatorAvatar} id={creatorId} />
          <Text variant="body-2" color="dark" weight="semiBold" className={styles.creatorText}>
            {creatorName}
          </Text>
        </div>
      </div>
      <div className={styles.collection}>
        <Text size="xs">Collection</Text>
        <div className={styles.collectionWrapper}>
          <Avatar size={40} avatar={collectionAvatar} id={collectionId} isCollection />
          <Text variant="body-2" color="dark" weight="semiBold" className={styles.collectionText}>
            {collectionName}
          </Text>
        </div>
      </div>
    </div>
  );
};
export default NftCreators;
