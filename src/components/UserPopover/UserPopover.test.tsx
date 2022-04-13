import { render } from '@testing-library/react';

import { UserPopover } from './UserPopover';
import { userPopoverPropsMocked } from './UserPopover.mock';

describe('UserPopover', () => {
  it('should render', () => {
    const { container } = render(
      <UserPopover
        {...userPopoverPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
