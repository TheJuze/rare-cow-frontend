import { State } from 'types';
import { RatesState } from 'types/store/rates';

const ratesSelector = {
  getRates: (state: State): RatesState => state.rates,
  getProp: <T extends keyof RatesState>(propKey: T) => (state: State) => state.rates[propKey],
};

export default ratesSelector;
