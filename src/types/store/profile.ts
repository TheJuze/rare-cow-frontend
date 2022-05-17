import { Collection } from 'types/api/Collection';
import { User } from 'types/api/User';
import { TBalance } from './user';

export type AdditionalUserInfo = {
  balance: TBalance;
  collections: Collection[];
};

export type ProfileState = User & AdditionalUserInfo;
