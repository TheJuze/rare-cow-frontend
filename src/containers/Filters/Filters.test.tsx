import { render } from '@testing-library/react';

import { Filters } from './Filters';
import { filtersPropsMocked } from './Filters.mock';

describe('Filters', () => {
  it('should render', () => {
    const { container } = render(
      <Filters
        {...filtersPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
