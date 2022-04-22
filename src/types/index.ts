/* eslint-disable no-shadow */
export * from './connect';
export * from './store';
export * from './components';
export * from './api';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;

export interface IModalProps {
  className?: string;
  visible: boolean;
  onClose: () => void;
}

export enum WalletProviders {
  metamask = 'MetaMask',
}

export enum CategoryName {
  rooms = 'Rooms',
  area = 'Area',
  skins = 'Skins',
  buildings = 'Buildings',
  allCategories = 'All categories',
}
