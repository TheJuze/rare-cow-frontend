import { PromoteModalIcon } from 'assets/icons/icons';
import { Modal } from 'components';
import { Selector } from 'components/Selector';
import { Text } from 'components/Typography';
import { useModals } from 'hooks';
import React, { useState, VFC } from 'react';
import { Modals } from 'types';

import styles from './styles.module.scss';

export const PromoteModal: VFC = () => {
  const { closeModals, modalType } = useModals();
  const [isRightOption, setIsRightOption] = useState(false);

  return (
    <Modal visible={modalType === Modals.Promote} onClose={closeModals}>
      <div className={styles.heading}>
        <PromoteModalIcon />
        <Text variant="heading-2">Pricing promote</Text>
      </div>
      <div className={styles.selectPromotion}>
        <Selector value={isRightOption} setValue={setIsRightOption} optionLeft="Premium Listing" optionRight="Featured listing" />
        <Text className={styles.selectPromotionDescription}>
          {isRightOption ? 'Your NFT will be listed on the main page' : 'Your NFT will be at the top of category page'}
        </Text>
      </div>
    </Modal>
  );
};
