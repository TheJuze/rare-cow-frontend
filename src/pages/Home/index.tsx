import React, { FC } from 'react';
import { Banner } from './components';

import s from './Home.module.scss';

const Home: FC = () => (
  <div className={s.homeWrapper}>
    <Banner />
  </div>
);
export default Home;
