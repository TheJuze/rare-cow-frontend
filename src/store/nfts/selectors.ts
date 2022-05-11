import type { State, NftsState } from 'types';

const nftSelector = {
  getNfts: (state: State): NftsState => state.nfts,
  // eslint-disable-next-line max-len
  getProp:
    <T extends keyof NftsState>(propKey: T) => (state: State) => state.nfts[propKey],
};

export default nftSelector;
