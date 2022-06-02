import { PromoteByGroups, PromoteInitialState, State } from 'types';

const promotionSelector = {
  getRates: (state: State): PromoteInitialState => state.promotion,
  getProp:
    <T extends keyof PromoteInitialState>(propKey: T) => (state: State) => state.promotion[propKey],
  getPromoteByGroups: (state: State) => {
    const groups = {} as PromoteByGroups;
    state.promotion.promoteState.forEach((promoteOpt) => {
      const {
        type,
        network: { name },
        options,
      } = promoteOpt;
      if (type in groups) {
        if (name in groups[type]) {
          groups[type][name] = [...groups[type][name], ...options];
        } else {
          groups[type][name] = options;
        }
      } else {
        groups[type] = {};
        groups[type][name] = options;
      }
    }, []);
    return Object.keys(groups).length > 0 ? groups : null;
  },
};

export default promotionSelector;
