/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from 'components';
import React, { VFC } from 'react';

import styles from './styles.module.scss';

interface IHeaderProps {
  category: {
    banner: string;
    name: string;
    description: string;
  };
}

const Header: VFC<IHeaderProps> = ({ category }) => {
  return (
    <div className={styles.header}>
      <img src={category.banner} alt="banner" className={styles.banner} />
      <Text color="metal800" variant="subtitle-1" className={styles.name}>
        Explore {category.name}
      </Text>
      <Text variant="body-1" className={styles.desciption}>
        {category.description}
      </Text>
    </div>
  );
};

export default Header;
