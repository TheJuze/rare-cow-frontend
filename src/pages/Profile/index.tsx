/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';
import { Body, Header } from './components';

import styles from './styles.module.scss';

const Profile: VFC = () => {
  return (
    <div className={styles.profile}>
      <Header />
      <Body />
    </div>
  );
};

export default Profile;
