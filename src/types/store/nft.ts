import { TNullable } from 'types';
import { Category, Collection, User } from 'types/api';
import { TokenFull } from 'types/api/TokenFull';
import { TResponseCategories } from 'types/requests';

export type NftsState = {
  nfts: TokenFull[];
  presearchedNfts: TokenFull[];
  detailedNft: TNullable<TokenFull>;
  totalPages: number;
  categories: TNullable<TResponseCategories>;
  trending: TokenFull[];
  searchData: {
    collections: Collection[];
    users: User[];
    categories: Category[];
  };
};

export type SearchActionPayloadType = {
  key: 'collections' | 'users' | 'categories';
  values: Array<Collection | User | Category>;
};
