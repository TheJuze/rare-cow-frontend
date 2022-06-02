import { URL } from 'appConstants';
import ajax from './ajax';

export default {
  getPromotes() {
    return ajax({
      method: 'get',
      url: URL.promotion,
    });
  },
  payPromotes(data) {
    return ajax({
      method: 'post',
      url: URL.promotion,
      data,
    });
  },
  getPremiumPromotes() {
    return ajax({
      method: 'get',
      url: URL.premiumPromotion,
    });
  },
};
