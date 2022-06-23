import { TNullable } from 'types';
import { Category, Collection, User } from 'types/api';
import { TokenFull } from 'types/api/TokenFull';
import { TResponseCategories } from 'types/requests';

export type TFees = {
  amount: string;
  exchangeAmount: string;
  receiver: string;
};

export type NftsState = {
  nfts: TokenFull[];
  presearchedNfts: TokenFull[];
  detailedNft: TNullable<TokenFull>;
  featuredId: TNullable<number>;
  totalPages: number;
  categories: TNullable<TResponseCategories>;
  trending: TokenFull[];
  featured: TokenFull[];
  premium: TokenFull[];
  searchData: {
    collections: Collection[];
    users: User[];
    categories: Category[];
  };
  fees: TFees,
};

export type SearchActionPayloadType = {
  key: 'collections' | 'users' | 'categories';
  values: Array<Collection | User | Category>;
};
