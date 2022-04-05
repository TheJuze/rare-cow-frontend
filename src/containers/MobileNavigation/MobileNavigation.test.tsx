import { render } from '@testing-library/react';

import { MobileNavigation } from './MobileNavigation';
import { mobileNavigationPropsMocked } from './MobileNavigation.mock';

describe('MobileNavigation', () => {
  it('should render', () => {
    const { container } = render(
      <MobileNavigation
        {...mobileNavigationPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
