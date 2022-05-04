/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';
import { Body, Header } from './components';

import styles from './styles.module.scss';

const collection = {
  url: 5,
  floorPrice: 1.0,
  name: 'single',
  avatar: 'https://ipfs11.rocknblock.io/ipfs/QmZffsiR8LNnhDEz3ShUaML3GuBuV3X2AWYr8fpNe9wVHR',
  creator: {
    url: 2,
    address: '0x677fe907cd22bd1d5dee8475f15bf3b40a5d8d73',
    displayName: 'cucunber',
  },
  tokensCount: 8,
};

const Collection: VFC = () => {
  return (
    <div className={styles.collection}>
      <Header collection={collection} />
      <Body />
    </div>
  );
};

export default Collection;
