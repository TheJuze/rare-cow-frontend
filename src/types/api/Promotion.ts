import { PromotionStatus, PromotionType } from './enums';

export interface Promotion {
  validUntil: string;
  clicksLeft: string;
  queue: string;
  status: PromotionStatus;
  type: PromotionType;
}
