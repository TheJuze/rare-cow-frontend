/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */
import { FC, useCallback } from 'react';
import logo from 'assets/img/logo.png';

import { Button, Text } from 'components';

import { useBreakpoints, useShallowSelector } from 'hooks';
import { createDynamicLink, routes } from 'appConstants';
import { CategoryName, Modals } from 'types';
import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const Banner: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDefaultScreen = useBreakpoints([1179]);
  const address = useShallowSelector(userSelector.getProp('address'));
  const handleClickButton = useCallback(() => {
    if (address?.length) {
      navigate(routes.nest.create.path);
    } else {
      dispatch(
        setActiveModal({
          activeModal: Modals.ConnectWallet,
          txHash: '',
          open: true,
        }),
      );
    }
  }, [address?.length, dispatch, navigate]);
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
            <Button variant="outlined" className={styles.btn} onClick={handleClickButton}>
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
