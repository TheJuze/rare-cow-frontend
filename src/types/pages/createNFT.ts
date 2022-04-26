import { TStandards } from 'appConstants';
import { Category } from 'types/api/Category';
import { Collection } from 'types/api/Collection';
import { TProperty } from 'types/components';

export interface ICreateForm {
  type: TStandards;
  name: string;
  description: string;
  category: Category | null;
  properties: TProperty[];
  collections: {
    withCollection: boolean;
    collections: Collection | null;
  };
  media: File[] | null;
  preview: File[] | null;
  quantity: string;
  listing: {
    listNow: boolean;
    price: string;
    listType: number;
    timestamp: number;
  };
}
