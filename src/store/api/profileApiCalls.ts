import { URL } from 'appConstants';
import { ReactText } from 'react';
import { LoginReq } from 'types';
import { RequestWithNetwork, TEditableProfileField } from 'types/requests';

import ajax from './ajax';

export default {
  getMetamaskMessage() {
    return ajax({
      method: 'get',
      url: URL.getMetamaskMessage,
    });
  },
  metamaskLogin(data: LoginReq) {
    return ajax({
      method: 'post',
      url: URL.metamaskLogin,
      data,
    });
  },
  getProfileInfo(params: { id: string | number }) {
    return ajax({
      method: 'get',
      url: URL.getProfileInfo(params.id),
    });
  },
  getSelfInfo() {
    return ajax({
      method: 'get',
      url: URL.getSelfInfo,
    });
  },
  getSelfCollections({ network }: RequestWithNetwork) {
    return ajax({
      method: 'get',
      url: URL.getSelfCollection,
      params: { network },
    });
  },
  editProfile(newParams: TEditableProfileField) {
    return ajax({
      method: 'patch',
      url: URL.editProfile,
      data: newParams,
    });
  },
  follow(userIdToFollow: ReactText) {
    return ajax({
      method: 'post',
      url: URL.follow,
      data: { id: userIdToFollow },
    });
  },
  unfollow(userIdToUnfollow: ReactText) {
    return ajax({
      method: 'post',
      url: URL.unfollow,
      data: { id: userIdToUnfollow },
    });
  },
};
