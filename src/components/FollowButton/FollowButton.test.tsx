import { render } from '@testing-library/react';

import { FollowButton } from './FollowButton';
import { followButtonPropsMocked } from './FollowButton.mock';

describe('FollowButton', () => {
  it('should render', () => {
    const { container } = render(
      <FollowButton
        {...followButtonPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
