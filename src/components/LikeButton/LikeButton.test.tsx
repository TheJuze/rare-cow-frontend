import { render } from '@testing-library/react';

import { LikeButton } from './LikeButton';
import { likeButtonPropsMocked } from './LikeButton.mock';

describe('LikeButton', () => {
  it('should render', () => {
    const { container } = render(
      <LikeButton
        {...likeButtonPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
