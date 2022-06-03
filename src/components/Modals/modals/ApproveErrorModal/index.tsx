import React, { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { Error } from 'assets/icons/icons';
import styles from './styles.module.scss';

type IApproveErrorModal = {
  visible: boolean;
  onClose: () => void;
  withSteps?: boolean;
  onApproveAgain?: () => void;
};

const ApproveErrorModal: VFC<IApproveErrorModal> = ({
  visible,
  onClose,
  withSteps = true,
  onApproveAgain,
}) => {
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
        <Error className={styles.error} />
      </div>
      <Text weight="semiBold" align="center" color="darkDefault" className={styles.subtitle}>
        Something went wrong 😖. Please try again. If it doesn&apos;t help then try again later.
      </Text>
      <Button onClick={onApproveAgain} className={styles.button} size="sm">
        Approve again
      </Button>
    </Modal>
  );
};

export default ApproveErrorModal;
