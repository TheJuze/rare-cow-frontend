import { matic, usdt } from 'assets/img';

export const fees = {
  minting: 15,
};

export const standards = ['ERC721', 'ERC1155'] as const;
export type TStandards = typeof standards[number];
export const standardsMap: { [key in TStandards]: string } = {
  ERC721: 'Single',
  ERC1155: 'Multiple',
};

export const appliedCurrencies = ['USDT', 'MATIC'] as const;
export type TAppliedCurrencies = typeof appliedCurrencies[number];

export type TCurrencies = {
  name: TAppliedCurrencies;
  isNative: boolean;
};

export const currencies: TCurrencies[] = [
  { name: 'MATIC', isNative: true },
  { name: 'USDT', isNative: false },
];

export const fromNameToCurrencyObj = (currency: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (appliedCurrencies.includes(currency as any)) {
    return currencies.find((c) => c.name === currency);
  }
  return null;
};

export const currenciesIconsMap = {
  USDT: usdt,
  MATIC: matic,
};
