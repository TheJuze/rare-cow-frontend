/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC } from 'react';
import { Text } from 'components';

import styles from './styles.module.scss';

interface IBioProps {
  bio: string;
}

const Bio: VFC<IBioProps> = ({ bio }) => (
  <div className={styles.bio}>
    <Text className={styles.bioTitle} color="dark">
      Profile Information
    </Text>
    <Text className={styles.bioInfo} variant="body-2" color="dark">
      {bio || 'There is no bio on this profile yet'}
    </Text>
  </div>
);

export default Bio;
