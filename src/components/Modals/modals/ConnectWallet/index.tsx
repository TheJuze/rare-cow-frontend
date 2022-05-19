import React, { useCallback, VFC } from 'react';
import { Modal, Text } from 'components';
import { MetaMaskLogo, WalletConnectLogo } from 'assets/icons';
import { Chains, WalletProviders } from 'types';
import { useWalletConnectorContext } from 'services';

import cn from 'clsx';

import styles from './styles.module.scss';

interface IConnectWalletModal {
  visible: boolean,
  onClose: () => void;
}

const iconsMap = {
  MetaMask: <MetaMaskLogo />,
  WalletConnect: <WalletConnectLogo />,
};

const connectors = [WalletProviders.metamask, WalletProviders.walletConnect];

const ConnectWalletModal:VFC<IConnectWalletModal> = ({ visible, onClose }) => {
  const { connect } = useWalletConnectorContext();
  const handleConnect = useCallback((connector: WalletProviders) => {
    connect(connector, Chains.polygon);
    onClose();
  }, [connect, onClose]);
  return(
    <Modal visible={visible} onClose={onClose} title="">
      <Text color="dark" align="left" className={styles.title}>Connect a Wallet</Text>
      <Text size="xs" align="left" className={styles.subtitle}>Please select a wallet to connect to this dapp:</Text>
      {connectors.map((connector) => (
        <button onClick={() => handleConnect(connector)} type="button" className={cn(styles.btn, styles[connector])}>
          {iconsMap[connector]}
        </button>
      ))}
    </Modal>
  );
};

export default ConnectWalletModal;
