import React, { useCallback, useState, VFC } from 'react';

import {
  Button, Input, Modal, Text,
} from 'components';

import styles from './styles.module.scss';

type IBurnModal = {
  visible: boolean;
  onClose: () => void;
  isMultiple?: boolean;
  onBurn: (amount: number | string) => void;
};

const BurnModal: VFC<IBurnModal> = ({
  visible, onClose, isMultiple, onBurn,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return (
    <Modal visible={visible} onClose={onClose} title="Burn">
      <Text>
        Are you sure to burn this token? This action cannot be undone. Token will be transfered to
        zero address
      </Text>
      {isMultiple ? (
        <Input
          name="amount"
          label="Amount"
          value={inputValue}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          placeholder="Input text"
          type="number"
        />
      ) : (
        <></>
      )}
      <Button onClick={() => onBurn(inputValue)} className={styles.button}>
        Burn
      </Button>
    </Modal>
  );
};

export default BurnModal;
