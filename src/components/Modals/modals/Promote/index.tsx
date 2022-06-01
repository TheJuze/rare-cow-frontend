import { PromoteModalIcon } from 'assets/icons/icons';
import { Modal } from 'components';
import { Loader } from 'components/Loader';
import { Selector } from 'components/Selector';
import { Text } from 'components/Typography';
import { useModals, useShallowSelector } from 'hooks';
import React, {
  useCallback, useEffect, useState, VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import { useWalletConnectorContext } from 'services';
import { buyPromotion, getPromotions } from 'store/promotion/actions';
import { setSelectedOption } from 'store/promotion/reducer';
import promotionSelector from 'store/promotion/selectors';
import uiSelector from 'store/ui/selectors';
import {
  Chains, ExtendedPromotionOption, Modals, RequestStatus,
} from 'types';
import { PromotionType } from 'types/api';
import { PromoteCard } from './components/PromoteCard';

import styles from './styles.module.scss';

interface IPromoteModal {
  tokenId: number;
}

const PromoteModal: VFC<IPromoteModal> = ({ tokenId }) => {
  const { closeModals, modalType } = useModals();
  const [isLeftOption, setIsLeftOption] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const { walletService } = useWalletConnectorContext();

  const promoteByGroups = useShallowSelector(promotionSelector.getPromoteByGroups);
  const selectedOption = useShallowSelector(promotionSelector.getProp('selectedOption'));

  const [isPromoteFetching] = useShallowSelector(uiSelector.getStatus(['SET_PROMOTION_SETTINGS']));

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  useEffect(() => {
    setIsFetching(
      isPromoteFetching === RequestStatus.SUCCESS || isPromoteFetching === RequestStatus.ERROR,
    );
  }, [isPromoteFetching]);

  const selectOptionHandler = useCallback(
    (option: ExtendedPromotionOption) => {
      dispatch(setSelectedOption(option));
    },
    [dispatch],
  );

  const onBuyClickHandler = useCallback((promoteOption: ExtendedPromotionOption) => {
    dispatch(buyPromotion({
      web3Provider: walletService.Web3(),
      package: promoteOption.package,
      currency: promoteOption.currency.name,
      tokenId,
    }));
  }, [dispatch, tokenId, walletService]);

  return (
    <Modal
      outerClassName={styles.wrapper}
      visible={modalType === Modals.Promote}
      onClose={closeModals}
      title=""
    >
      <div className={styles.heading}>
        <PromoteModalIcon />
        <Text className={styles.headingTitle} weight="bold" color="base900" variant="heading-2">
          Pricing promote
        </Text>
      </div>
      <div className={styles.selectPromotion}>
        <Selector
          value={isLeftOption}
          setValue={setIsLeftOption}
          optionLeft="Premium Listing"
          optionRight="Featured listing"
          className={styles.selectPromotionSelector}
        />
        <Text className={styles.selectPromotionDescription}>
          {isLeftOption
            ? 'Your NFT will be listed on the main page'
            : 'Your NFT will be at the top of category page'}
        </Text>
      </div>
      {isFetching ? (
        <div className={styles.promotionPlans}>
          {promoteByGroups ? (
            promoteByGroups[isLeftOption ? 'Premium' : 'Featured'][Chains.polygon].map(
              (promoteOption) => (
                <div className={styles.promotionPlansItem}>
                  <PromoteCard
                    promotionOption={promoteOption}
                    key={promoteOption.package}
                    promotionType={isLeftOption ? PromotionType.Premium : PromotionType.Featured}
                    isSelected={
                      selectedOption ? promoteOption.package === selectedOption.package : false
                    }
                    setIsSelected={selectOptionHandler}
                    onBuy={onBuyClickHandler}
                  />
                </div>
              ),
            )
          ) : (
            <Text>There is now options</Text>
          )}
        </div>
      ) : (
        <div className={styles.promotionPlans}>
          <Loader />
        </div>
      )}
    </Modal>
  );
};

export default PromoteModal;
