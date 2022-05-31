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
import { getPromotions } from 'store/promotion/actions';
import { setSelectedOption } from 'store/promotion/reducer';
import promotionSelector from 'store/promotion/selectors';
import uiSelector from 'store/ui/selectors';
import {
  Chains, ExtendedPromotionOption, Modals, RequestStatus,
} from 'types';
import { PromotionType } from 'types/api';
import { PromoteCard } from './components/PromoteCard';

import styles from './styles.module.scss';

const PromoteModal: VFC = () => {
  const { closeModals, modalType } = useModals();
  const [isRightOption, setIsRightOption] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

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

  return (
    <Modal
      outerClassName={styles.wrapper}
      visible={modalType === Modals.Promote}
      onClose={closeModals}
    >
      <div className={styles.heading}>
        <PromoteModalIcon />
        <Text className={styles.headingTitle} weight="bold" color="base900" variant="heading-2">Pricing promote</Text>
      </div>
      <div className={styles.selectPromotion}>
        <Selector
          value={isRightOption}
          setValue={setIsRightOption}
          optionLeft="Premium Listing"
          optionRight="Featured listing"
        />
        <Text className={styles.selectPromotionDescription}>
          {isRightOption
            ? 'Your NFT will be listed on the main page'
            : 'Your NFT will be at the top of category page'}
        </Text>
      </div>
      {isFetching ? (
        <div>
          {promoteByGroups ? (
            promoteByGroups[isRightOption ? 'Featured' : 'Premium'][Chains.polygon].map(
              (promoteOption) => (
                <PromoteCard
                  promotionOption={promoteOption}
                  key={promoteOption.package}
                  promotionType={isRightOption ? PromotionType.Featured : PromotionType.Premium}
                  isSelected={
                    selectedOption ? promoteOption.package === selectedOption.package : false
                  }
                  setIsSelected={selectOptionHandler}
                />
              ),
            )
          ) : (
            <Text>There is now options</Text>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </Modal>
  );
};

export default PromoteModal;
