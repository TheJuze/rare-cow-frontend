/* eslint-disable arrow-body-style */
import React, { useMemo, VFC } from 'react';
import { useShallowSelector } from 'hooks';
import nftsSelector from 'store/nfts/selectors';
import { useParams } from 'react-router-dom';
import { Body, Header } from './components';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const { categoryName } = useParams();
  const categories = useShallowSelector(nftsSelector.getProp('categories'));
  const category = useMemo(
    () => categories.filter((currentCategory) => currentCategory.name === categoryName)[0],
    [categories, categoryName],
  );
  return (
    <div className={styles.explore}>
      <Header category={category} />
      <Body category={category} />
    </div>
  );
};

export default Explore;
