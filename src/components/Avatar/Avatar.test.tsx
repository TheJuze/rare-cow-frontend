import { render } from '@testing-library/react';

import { Avatar } from './Avatar';
import { avatarPropsMocked } from './Avatar.mock';

describe('Avatar', () => {
  it('should render', () => {
    const { container } = render(
      <Avatar
        {...avatarPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
