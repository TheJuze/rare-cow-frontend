// eslint-disable-next-line no-shadow
export enum Modals {
  ApprovePending = 'ApprovePending',
  ApproveRejected = 'ApproveRejected',
  ApproveError = 'ApproveError',
  SendPending = 'SendPending',
  SendRejected = 'SendRejected',
  SendSuccess = 'SendSuccess',
  SendError = 'SendError',
  Transfer = 'Transfer',
  ChooseSeller = 'ChooseSeller',
  ChooseQuantity = 'ChooseQuantity',
  Burn = 'Burn',
  none = 'none',
  ConnectWallet = 'ConnectWallet',
  Promote = 'Promote',
}

export interface ModalState {
  activeModal: Modals;
  txHash: string;
  open: boolean;
}
export interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ModalsInitialState = {
  modalState: ModalState;
  modalProps: ModalProps;
};
