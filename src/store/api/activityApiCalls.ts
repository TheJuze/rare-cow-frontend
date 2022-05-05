import { URL } from 'appConstants';
import { Chains } from 'types';

import ajax from './ajax';

export default {
  getTopCollections(params: { network: Chains }) {
    return ajax({
      method: 'get',
      url: URL.topCollections,
      params,
    });
  },
};
