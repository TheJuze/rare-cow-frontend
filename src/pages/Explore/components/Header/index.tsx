/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from 'components';
import { useShallowSelector } from 'hooks';
import React, { useMemo, VFC } from 'react';
import nftActionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import { Category } from 'types/api';
import banner from 'assets/img/exploreBanner.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './styles.module.scss';

interface IHeaderProps {
  category: Category;
}

const Header: VFC<IHeaderProps> = ({ category }) => {
  const { [nftActionTypes.GET_CATEGORIES]: categoriesRequest } = useShallowSelector(
    uiSelector.getUI,
  );
  const isCategoriesLoading = useMemo(
    () => categoriesRequest === RequestStatus.REQUEST,
    [categoriesRequest],
  );
  return (
    <div className={styles.header}>
      {isCategoriesLoading ? (
        <Skeleton height="300px" />
      ) : (
        <img src={category?.banner || banner} alt="banner" className={styles.banner} />
      )}
      <Text color="metal800" variant="subtitle-1" className={styles.name}>
        Explore {category?.name}
      </Text>
      <Text variant="body-1" className={styles.desciption}>
        {category?.description}
      </Text>
    </div>
  );
};

export default Header;
