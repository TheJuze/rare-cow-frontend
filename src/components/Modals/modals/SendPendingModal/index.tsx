import React, { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type ISendPendingModal = {
  visible: boolean;
  onClose: () => void;
  withSteps?: boolean;
  subtitleText?: string;
};

const SendPendingModal: VFC<ISendPendingModal> = ({
  visible,
  onClose,
  withSteps = true,
  subtitleText = 'Please press "Send" button in MetaMask extension',
}) => {
  const title = (
    <Text className={styles.title} align="center" weight="bold">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" className={styles.title} color="accent" weight="bold">
        SEND
      </Text>
    </Text>
  );

  return (
    <Modal
      containerClassName={styles.container}
      visible={visible}
      onClose={onClose}
      title={title}
      maxWidth={628}
    >
      <div className={styles.icon}>
        <Loader />
      </div>
      {subtitleText && (
        <Text tag="h4" weight="semiBold" align="center" className={styles.subtitle}>
          {subtitleText}
        </Text>
      )}
    </Modal>
  );
};

export default SendPendingModal;
