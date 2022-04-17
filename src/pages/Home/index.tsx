import React, { FC } from 'react';
import {
  Banner, Categories, Featured, Trending,
} from './components';

import s from './Home.module.scss';

const Home: FC = () => (
  <div className={s.homeWrapper}>
    <Banner />
    <Featured />
    <Trending />
    <Categories />
  </div>
);
export default Home;
