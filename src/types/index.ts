/* eslint-disable no-shadow */
export * from './connect';
export * from './store';
export * from './components';
export * from './pages';

export type TNullable<T> = T | null;
export type TOptionable<T> = T | undefined;
export type Rewrite<
  T,
  Keys extends string | number | symbol,
  K = { [key: string]: unknown },
> = Omit<T, Keys> & K;

export interface IModalProps {
  className?: string;
  visible: boolean;
  onClose: () => void;
}

export enum WalletProviders {
  metamask = 'MetaMask',
}

export enum CategoryName {
  movie = 'Movie',
  picture = 'Picture',
  music = 'Music',
  art = 'Art',
  photo = 'Photo',
  anime = 'Anime Illustration',
  allCategories = 'All Categories',
}
