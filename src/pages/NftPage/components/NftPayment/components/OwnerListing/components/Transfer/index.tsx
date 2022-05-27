import { TStandards } from 'appConstants';
import {
  Input, Button, Text, QuantityInput,
} from 'components';
import { useShallowSelector } from 'hooks';
import React, { useCallback, useState, VFC } from 'react';
import { toast } from 'react-toastify';
import userSelector from 'store/user/selectors';
import Web3 from 'web3';
import styles from '../../../../styles.module.scss';

interface ITransfer {
  nftType: TStandards;
  nftSupply: number;
  onSend: (transferAddress: string, transferAmount: string) => void;
}

const validation = [
  {
    msg: 'You cannot transfer you token to yourself',
    validator: (address, { userAddress }) => address !== userAddress,
  },
  {
    msg: 'This address is not valid',
    validator: (address) => Web3.utils.isAddress(address),
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValid = (address: string, out: any) => validation
  .find((validator) => !validator.validator(address, out));

export const Transfer: VFC<ITransfer> = ({ onSend, nftType, nftSupply }) => {
  const [transferAddress, setTransferAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('1');
  const userAddress = useShallowSelector(userSelector.getProp('address'));

  const handleChangeAddress = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const transAddress = event.currentTarget.value;
      setTransferAddress(transAddress);
    },
    [],
  );

  const handleSend = useCallback(() => {
    const valid = isValid(transferAddress.toLowerCase(), { userAddress });
    if (!valid) {
      onSend(transferAddress, transferAmount);
    } else {
      toast.error(valid.msg);
    }
  }, [onSend, transferAddress, transferAmount, userAddress]);

  return (
    <div className={styles.transfer}>
      <Input
        onChange={handleChangeAddress}
        value={transferAddress}
        name="transfer"
        label="Send to Address"
        placeholder="Input address"
      />
      {nftType === 'ERC1155' && (
        <div className={styles.transferQuantity}>
          <QuantityInput
            label="Quantity"
            maxAmount={nftSupply}
            name="amount"
            value={transferAmount}
            minAmount={1}
            setValue={setTransferAmount}
          />
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
