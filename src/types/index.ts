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

// eslint-disable-next-line no-shadow
export enum WalletProviders {
  metamask = 'MetaMask',
}

export type NestedObject<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? NestedObject<ObjectType[Key]>
    : ObjectType[Key];
}[keyof ObjectType & (string | number)];
