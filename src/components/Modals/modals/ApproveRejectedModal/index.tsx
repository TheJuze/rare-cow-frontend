import React, { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { Error } from 'assets/icons/icons';
import styles from './styles.module.scss';

type IApproveRejectedModal = {
  visible: boolean;
  onClose: () => void;
  withSteps?: boolean;
  onApproveAgain?: () => void;
};

const ApproveRejectedModal: VFC<IApproveRejectedModal> = ({
  visible,
  onClose,
  withSteps = true,
  onApproveAgain,
}) => {
  const title = (
    <Text align="center" className={styles.title} weight="bold" color="dark">
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
      <Text weight="semiBold" align="center" color="dark" className={styles.subtitle}>
        You rejected Approve transaction in Metamask. Press Approve again to start over or close
        this window.
      </Text>
      <Button onClick={onApproveAgain} className={styles.button} size="sm">
        Approve again
      </Button>
    </Modal>
  );
};

export default ApproveRejectedModal;
