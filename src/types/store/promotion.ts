import { TCurrencies } from 'appConstants';
import { PromotionType } from 'types/api';
import { PromotionOptions } from 'types/api/PromotionOptions';
import { PromotionSettings } from 'types/api/PromotionSettings';
import { Chains } from 'types/connect';

export type ExtendedPromotionOption = {
  currency: TCurrencies;
  package: number;
} & PromotionOptions;

export type PromoteByGroups = {
  [type in PromotionType]: {
    [network in Chains]: ExtendedPromotionOption[];
  };
};

export type PromoteInitialState = {
  promoteState: PromotionSettings[];
  selectedOption: ExtendedPromotionOption | null;
};
