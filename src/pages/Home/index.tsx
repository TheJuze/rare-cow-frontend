import React, { FC } from 'react';
import { Banner, Trending } from './components';

import s from './Home.module.scss';

const Home: FC = () => (
  <div className={s.homeWrapper}>
    <Banner />
    <Trending />
  </div>
);
export default Home;
