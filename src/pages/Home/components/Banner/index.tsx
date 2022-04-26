/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
import { FC } from 'react';
import logo from 'assets/img/logo.png';
import logoSmall from 'assets/img/logoSmall.png';

import { Button, Text } from 'components';

import { useWindowState } from 'hooks';
import { routes } from 'appConstants';
import styles from './styles.module.scss';

const Banner: FC = () => {
  const { width } = useWindowState();
  return (
    <div className={styles.banner}>
      <div className={styles.bannerBody}>
        <div className={styles.bannerBodyLeft}>
          <div className={styles.titleTop}>
            <Text weight="bold" color="dark0" className={styles.title}>
              RareCow
            </Text>{' '}
            <Text color="accent" weight="bold" className={styles.title}>
              NFT
            </Text>
          </div>
          <div className={styles.titleBottom}>
            <Text color="accent" weight="bold" className={styles.title}>
              Marketplace
            </Text>
          </div>
          <Text variant="body-1" color="dark0" className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Text>
          {width < 1179 && <img src={logoSmall} alt="logo" className={styles.logo} />}
          <div className={styles.bannerBtns}>
            <Button className={styles.btn} to={routes.nest.explore.path}>
              Explore
            </Button>
            <Button variant="outlined" className={styles.btn} to={routes.nest.create.path}>
              Create
            </Button>
          </div>
        </div>
        {width >= 1179 && <img src={logo} alt="logo" className={styles.logo} />}
      </div>
    </div>
  );
};
export default Banner;
