import { render } from '@testing-library/react';

import { Listing } from './Listing';
import { listingPropsMocked } from './Listing.mock';

describe('Listing', () => {
  it('should render', () => {
    const { container } = render(
      <Listing
        {...listingPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
