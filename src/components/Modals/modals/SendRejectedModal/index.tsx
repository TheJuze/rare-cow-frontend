import React, { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { Error } from 'assets/icons/icons';

import styles from './styles.module.scss';

type ISendRejectedModal = {
  visible: boolean;
  onClose: () => void;
  withSteps?: boolean;
  onSendAgain?: () => void;
};

const SendRejectedModal: VFC<ISendRejectedModal> = ({
  visible,
  onClose,
  withSteps = true,
  onSendAgain,
}) => {
  const title = (
    <Text align="center" className={styles.title} weight="bold" color="dark">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" className={styles.title} color="accent" weight="bold">
        SEND
      </Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <Error className={styles.error} />
      </div>
      <Text tag="h5" weight="semiBold" align="center" color="dark" className={styles.subtitle}>
        You rejected Send transaction in Metamask. Press Send again to start over or close this
        window.
      </Text>
      <Button onClick={onSendAgain} className={styles.button} size="sm">
        Send again
      </Button>
    </Modal>
  );
};

export default SendRejectedModal;
