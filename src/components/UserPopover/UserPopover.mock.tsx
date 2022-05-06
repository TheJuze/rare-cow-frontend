import { profileAvatar } from 'assets/img';
import { UserPopoverProps } from './UserPopover';

export const userPopoverPropsMocked: UserPopoverProps = {
  id: 1,
  avatar: profileAvatar,
  name: 'Edward',
  visible: false,
  bodyRef: null,
  address: '',
  disconnect: () => {},
};
