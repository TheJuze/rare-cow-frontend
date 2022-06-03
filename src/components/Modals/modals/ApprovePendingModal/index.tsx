import React, { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type IApprovePendingModal = {
  visible: boolean;
  onClose: () => void;
  withSteps?: boolean;
};

const ApprovePendingModal: VFC<IApprovePendingModal> = ({ visible, onClose, withSteps = true }) => {
  const title = (
    <Text className={styles.title} align="center" weight="bold" color="darkDefault">
      {withSteps && 'STEP 1/2 '}
      <Text tag="span" className={styles.title} color="accent" weight="bold">
        APPROVE
      </Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <Loader />
      </div>
      <Text weight="semiBold" align="center" color="darkDefault" className={styles.subtitle}>
        Please press &quot;Approve&quot; button in metamask extension
      </Text>
    </Modal>
  );
};

export default ApprovePendingModal;
