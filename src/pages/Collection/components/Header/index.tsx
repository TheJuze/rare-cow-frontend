/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDynamicLink, routes } from 'appConstants';
import { ArtCardSkeleton, Text } from 'components';
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import { Collection } from 'types/api';
import { formatDigits, sliceString } from 'utils';

import styles from './styles.module.scss';

interface IHeaderProps {
  collection: Collection;
  isLoading: boolean;
  id: string;
}

const Header: VFC<IHeaderProps> = ({ collection, isLoading, id }) => {
  return (
    <div className={styles.header}>
      {isLoading ? (
        <ArtCardSkeleton key={id} />
      ) : (
        <>
          <div className={styles.avatarWrapper}>
            <img src={collection?.avatar} alt="collection" className={styles.avatar} />
          </div>
          <div className={styles.info}>
            <Text variant="subtitle-1" color="darkDefault">
              {collection?.name}
            </Text>
            <Text size="xs" color="darkDefault" tag="span">
              Created by{' '}
              <Link
                to={createDynamicLink(routes.nest.profile.path, {
                  userId: collection?.creator.url,
                })}
              >
                <Text size="xs" color="accent" tag="span">
                  {collection?.creator.displayName ||
                    sliceString(collection?.creator.address, 6, 4)}
                </Text>
              </Link>
            </Text>
            <div className={styles.price}>
              <Text size="xs" color="darkDefault">
                Items {collection?.tokensCount}, Floor price: $
                {formatDigits(collection?.floorPrice)}
              </Text>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
