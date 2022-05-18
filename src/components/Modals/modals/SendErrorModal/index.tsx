import React, { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { Error } from 'assets/icons/icons';

import styles from './styles.module.scss';

type ISendErrorModal = {
  visible: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  withSteps?: boolean;
  error?: string;
  errorCode?: string;
};

const SendErrorModal: VFC<ISendErrorModal> = ({
  visible,
  onClose,
  onTryAgain,
  error,
  errorCode,
  withSteps = true,
}) => {
  const title = (
    <Text align="center" className={styles.title} weight="bold" color="dark">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" className={styles.title} color="accent" weight="bold">
        SEND
      </Text>
    </Text>
  );
  console.log(error);
  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <Error className={styles.error} />
      </div>
      <Text tag="h5" weight="semiBold" color="dark" align="center" className={styles.subtitle}>
        Something went wrong 😖. Please try again. If it doesn&apos;t help then try again later.
      </Text>
      {errorCode && (
        <Text color="error" align="center" size="m">
          Error code - {errorCode}
        </Text>
      )}
      <Button onClick={onTryAgain} className={styles.button} size="sm">
        Try again
      </Button>
    </Modal>
  );
};

export default SendErrorModal;
