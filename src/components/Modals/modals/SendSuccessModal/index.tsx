import React, { VFC } from 'react';

import modalsSelector from 'store/modals/selectors';
import userSelector from 'store/user/selectors';

import { Modal, Text } from 'components';
import Clipboard from 'components/Clipboard/Clipboard';
import { chains } from 'config';

import { useShallowSelector } from 'hooks';

import { Success } from 'assets/icons/icons';
import styles from './styles.module.scss';

type ISendSuccessModal = {
  visible: boolean;
  onClose: () => void;
  withSteps?: boolean;
};

const SendSuccessModal: VFC<ISendSuccessModal> = ({ visible, onClose, withSteps = true }) => {
  const activeModal = useShallowSelector(modalsSelector.getProp('modalState'));
  const chain = useShallowSelector(userSelector.getProp('chain'));
  const title = (
    <Text align="center" className={styles.title} weight="bold" color="darkDefault">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" className={styles.title} color="accent" weight="bold">
        SEND
      </Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <Success className={styles.success} />
      </div>
      <Text weight="semiBold" align="center" color="darkDefault" className={styles.subtitle}>
        Sent
      </Text>
      <Text align="center" color="darkDefault" className={styles.text}>
        It takes some time for transaction to get confirmed.
      </Text>
      {activeModal.txHash ? (
        <Clipboard
          name="txHash"
          className={styles.clipboard}
          value={`${chains[chain].scanner}tx/${activeModal.txHash}`}
        />
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default SendSuccessModal;
