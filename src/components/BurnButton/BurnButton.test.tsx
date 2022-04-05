import { render } from '@testing-library/react';

import { BurnButton } from './BurnButton';
import { burnButtonPropsMocked } from './BurnButton.mock';

describe('BurnButton', () => {
  it('should render', () => {
    const { container } = render(
      <BurnButton
        {...burnButtonPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
