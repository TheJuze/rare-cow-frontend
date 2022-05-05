import type { StateWithUIState } from 'types';

const uiSelector = {
  getUI: (state: StateWithUIState) => state.ui,
  getProp: (propKey: string) => (state: StateWithUIState) => state.ui[propKey],
};

export default uiSelector;
