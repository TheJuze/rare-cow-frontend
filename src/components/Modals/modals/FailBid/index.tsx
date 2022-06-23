import React, { VFC } from 'react';

import { Modal, Text } from 'components';

import { Error } from 'assets/icons/icons';

import styles from './styles.module.scss';

type IFailBidModal = {
  visible: boolean;
  onClose: () => void;
  error?: string;
  title?: string;
};

const FailBidModal: VFC<IFailBidModal> = ({
  visible, onClose, error = '', title = '',
}) => (
  <Modal
    containerClassName={styles.container}
    visible={visible}
    onClose={onClose}
    title={(
      <Text align="center" weight="bold" color="accent" variant="subtitle-1">
        {title}
      </Text>
    )}
    maxWidth={628}
  >
    <div className={styles.icon}>
      <Error className={styles.error} />
    </div>
    <Text tag="h4" weight="semiBold" align="center" color="darkDefault" className={styles.subtitle}>
      {error}
    </Text>
  </Modal>
);

export default FailBidModal;
