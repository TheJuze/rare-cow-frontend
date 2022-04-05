import { FC } from 'react';

import { ReactComponent as Logo } from 'assets/icons/logo.svg';

import s from './Home.module.scss';

const Home: FC = () => {
  return (
    <div className={s.homeWrapper}>
      <Logo />
    </div>
  );
};
export default Home;
