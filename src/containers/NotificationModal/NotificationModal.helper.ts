import { Modals } from 'types/store/modals';

export const modalData = {
  [Modals.ApprovePending]: {
    title1: 'STEP 1/2',
    title2: 'APPROVE',
    icon: '',
    title3: 'Please press "Approve" button in metamask extension',
    title4:
      'BEP-20 tokens are deployed with functionality that allows other smart contracts to move tokens. By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens that are able to move when using MetaMask Swap.',
  },

  [Modals.ApproveRejected]: {
    title1: 'STEP 1/2',
    title2: 'APPROVE',
    icon: '',
    title3: 'You rejected Approve transaction in Metamask. Press Approve again to start over or close this window.',
    title4:
      'BEP-20 tokens are deployed with functionality that allows other smart contracts to move tokens. By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens that are able to move when using MetaMask Swap.',
  },

  [Modals.SendPending]: {
    title1: 'STEP 2/2',
    title2: 'SEND',
    icon: '',
    title3: 'Please press "Confirm" button in Metamask extension',
    title4: 'Your assets will be transferred from your wallet to the contract address',
  },

  [Modals.SendSuccess]: {
    title1: 'STEP 2/2',
    title2: 'SEND',
    icon: '',
    title3: 'Sent',
    title4: 'It takes some time for transaction to get confirmed.',
  },

  [Modals.SendRejected]: {
    title1: 'STEP 2/2',
    title2: 'SEND',
    icon: '',
    title3: '',
    title4: 'It takes some time for transaction to get confirmed.',
    title5: 'You rejected Send transaction in Metamask. Press Send again to start over or close this window.',
  },
};
