export type TAvailableSocials = 'email' | 'instagram' | 'twitter' | 'site';

type TSocial = {
  [key in TAvailableSocials]: string;
};

export interface IProfile {
  id: number;
  avatarURL: string | null;
  name: string;
  balance: string;
  currency: string;
  address: string;
  socials: TSocial;
  description: string;
}
