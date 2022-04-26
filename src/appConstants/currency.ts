export const fees = {
  minting: 15,
};

export const standards = ['ERC721', 'ERC1155'] as const;
export type TStandards = typeof standards[number];
export const standardsMap: { [key in TStandards]: string } = {
  ERC721: 'Single',
  ERC1155: 'Multiple',
};
