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
        {width < 1179 ? (
          <>
            <div className={styles.titleTop}>
              <Text variant="heading-2" weight="bold" color="dark0">
                RareCow
              </Text>{' '}
              <Text variant="heading-2" color="accent" weight="bold">
                NFT
              </Text>
            </div>
            <div className={styles.titleBottom}>
              <Text variant="heading-2" color="accent" weight="bold">
                Marketplace
              </Text>
            </div>
            <Text size="xs" align="center" className={styles.subtitle} color="dark0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
            <img src={logoSmall} alt="logo" className={styles.logo} />
            <div className={styles.bannerBtns}>
              <Button className={styles.btn} to={routes.nest.explore.path}>
                Explore
              </Button>
              <Button variant="outlined" className={styles.btn} href="/">
                Create
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.bannerBodyLeft}>
              <div className={styles.titleTop}>
                <Text variant="display-1" weight="bold">
                  RareCow
                </Text>{' '}
                <Text variant="display-1" color="accent" weight="bold">
                  NFT
                </Text>
              </div>
              <div className={styles.titleBottom}>
                <Text variant="display-1" color="accent" weight="bold">
                  Marketplace
                </Text>
              </div>
              <Text variant="body-1" color="dark0" className={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
              <div className={styles.bannerBtns}>
                <Button className={styles.btn} to={routes.nest.explore.path}>
                  Explore
                </Button>
                <Button variant="outlined" className={styles.btn} href="/">
                  Create
                </Button>
              </div>
            </div>
            {/* <div className={styles.bannerBodyRight}> */}
            <img src={logo} alt="logo" className={styles.logo} />
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
};
export default Banner;
