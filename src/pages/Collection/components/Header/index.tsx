/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDynamicLink, routes } from 'appConstants';
import { Text } from 'components';
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { sliceString } from 'utils';

import styles from './styles.module.scss';

interface IHeaderProps {
  collection: {
    avatar: string;
    url: string | number;
    name: string;
    creator: {
      displayName: string;
      address: string;
      url: string | number;
    };
    tokensCount: string | number;
    floorPrice: string | number;
  };
}

const Header: VFC<IHeaderProps> = ({ collection }) => {
  return (
    <div className={styles.header}>
      <div className={styles.avatarWrapper}>
        <img src={collection.avatar} alt="collection" className={styles.avatar} />
      </div>
      <div className={styles.info}>
        <Text variant="subtitle-1" color="dark">
          {collection.name}
        </Text>
        <Text size="xs" color="dark" tag="span">
          Created by{' '}
          <Link
            to={createDynamicLink(routes.nest.profile.path, { userId: collection.creator.url })}
          >
            <Text size="xs" color="accent" tag="span">
              {collection.creator.displayName || sliceString(collection.creator.address, 6, 4)}
            </Text>
          </Link>
        </Text>
        <div className={styles.price}>
          <Text size="xs" color="dark">
            Items {collection.tokensCount}, Floor price: ${collection.floorPrice}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Header;
