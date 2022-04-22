/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';
import banner from 'assets/img/exploreBanner.png';
import { Body, Header } from './components';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const category = {
    banner,
    name: 'Photo',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };
  return (
    <div className={styles.explore}>
      <Header category={category} />
      <Body />
    </div>
  );
};

export default Explore;
