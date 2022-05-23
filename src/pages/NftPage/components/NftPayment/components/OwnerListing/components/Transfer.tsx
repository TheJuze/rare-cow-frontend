import { TStandards } from 'appConstants';
import {
  Input, Button, Text, QuantityInput,
} from 'components';
import React, { useCallback, useState, VFC } from 'react';
import styles from '../../../styles.module.scss';

interface ITransfer {
  nftType: TStandards,
  nftSupply: number,
  onSend: (transferAddress: string, transferAmount: string) => void;
}

export const Transfer:VFC<ITransfer> = ({ onSend, nftType, nftSupply }) => {
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('1');

  const handleChangeAddress = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTransferAddress(event.currentTarget.value);
    }, [],
  );

  const handleSend = useCallback(() => {
    onSend(transferAddress, transferAmount);
  }, [onSend, transferAddress, transferAmount]);

  return (
    <div className={styles.transfer}>
      <Input onChange={handleChangeAddress} value={transferAddress} name="transfer" label="Send to Address" placeholder="Input address" />
      {nftType === 'ERC1155' && (
      <div className={styles.transferQuantity}>
        <QuantityInput label="Quantity" maxAmount={nftSupply} name="amount" value={transferAmount} setValue={setTransferAmount} />
      </div>
      )}
      <Button disabled={!transferAddress} onClick={handleSend} className={styles.send}>
        <Text variant="body-2" color="light">
          Send
        </Text>
      </Button>
    </div>
  );
};
