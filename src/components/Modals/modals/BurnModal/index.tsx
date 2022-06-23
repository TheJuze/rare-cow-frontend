import React, { useCallback, useState, VFC } from 'react';

import {
  Button, QuantityInput, Modal, Text,
} from 'components';

import { BurnActionIcon } from 'assets/icons/icons';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import styles from './styles.module.scss';

type IBurnModal = {
  visible: boolean;
  onClose: () => void;
  isMultiple?: boolean;
  onBurn: (amount: number | string, userId: number | string) => void;
  maxBurnAmount?: number;
};

const BurnModal: VFC<IBurnModal> = ({
  visible, onClose, isMultiple, onBurn, maxBurnAmount,
}) => {
  const id = useShallowSelector(userSelector.getProp('id'));
  const [inputValue, setInputValue] = useState('1');

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return (
    <Modal containerClassName={styles.wrapper} visible={visible} onClose={onClose} title="">
      <Text color="metal800" className={styles.title}>
        Burn token
      </Text>
      <Text size="s">
        Are you sure to burn this token? This action cannot be undone. Token will be transfered to
        zero address
      </Text>
      {isMultiple ? (
        <>
          <Text color="metal800" className={styles.quantityTitle}>Quantity</Text>
          <QuantityInput
            name="amount"
            label="Quantity"
            value={inputValue}
            setValue={handleInputChange}
            minAmount={1}
            maxAmount={maxBurnAmount}
          />
        </>
      ) : null}
      <div className={styles.btnGroup}>
        <Button onClick={() => onBurn(inputValue, id)} className={styles.btnGroupElement}>
          Continue <BurnActionIcon className={styles.burnIcon} />
        </Button>
        <Button variant="outlined" onClick={onClose} className={styles.btnGroupElement}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default BurnModal;
