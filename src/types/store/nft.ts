import { TNullable } from 'types';
import { TokenFull } from 'types/api/TokenFull';
import { TResponseCategories } from 'types/requests';

export type NftsState = {
  nfts: TokenFull[];
  presearchedNfts: TokenFull[];
  detailedNft: TNullable<TokenFull>;
  totalPages: number;
  categories: TNullable<TResponseCategories>;
  trending: TokenFull[];
};
