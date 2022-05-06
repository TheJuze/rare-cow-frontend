import { Collection } from 'types/api/Collection';
import { User } from 'types/api/User';

export type AdditionalUserInfo = {
  balance: string;
  collections: Collection[];
};

export type ProfileState = User & AdditionalUserInfo;
