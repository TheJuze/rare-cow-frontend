/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
import { FC } from 'react';
import logo from 'assets/img/logo.png';

import { Button, Text } from 'components';

import { useBreakpoints } from 'hooks';
import { createDynamicLink, routes } from 'appConstants';
import { CategoryName } from 'types';
import styles from './styles.module.scss';

const Banner: FC = () => {
  const isDefaultScreen = useBreakpoints([1179]);
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
            RareCow will provide all the tools to create, sell and showcase your creations. Earn
            significant income through a fully digital ecosystem.
          </Text>
          {!isDefaultScreen && <img src={logo} alt="logo" className={styles.logo} />}
          <div className={styles.bannerBtns}>
            <Button
              className={styles.btn}
              to={createDynamicLink(routes.nest.explore.path, {
                categoryName: CategoryName.allCategories,
              })}
            >
              Explore
            </Button>
            <Button variant="outlined" className={styles.btn} to={routes.nest.create.path}>
              Create
            </Button>
          </div>
        </div>
        {isDefaultScreen && <img src={logo} alt="logo" className={styles.logo} />}
      </div>
    </div>
  );
};
export default Banner;
