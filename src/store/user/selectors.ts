import type { State, UserState } from 'types';

const userSelector = {
  getUser: (state: State): UserState => state.user,
  getProp:
    <T extends keyof UserState>(propKey: T) => (state: State) => state.user[propKey],
};

export default userSelector;
