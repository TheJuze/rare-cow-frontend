import { TStandards } from 'appConstants';

export interface ICreateCollection {
  type: TStandards;
  media: File | null;
  mediaURL: string | null;
  name: string;
  description: string;
  symbol: string;
}
