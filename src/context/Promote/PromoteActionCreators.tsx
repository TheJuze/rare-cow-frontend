import { PromotionSettings } from 'types/api/PromotionSettings';

// eslint-disable-next-line no-shadow
export enum PromoteActions {
  SET_PROMOTION_SETTINGS = 'SET_PROMOTION_SETTINGS',
}

export type PromoteActionsType = {
  type: PromoteActions.SET_PROMOTION_SETTINGS;
  payload: PromotionSettings[];
};
