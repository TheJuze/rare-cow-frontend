import { render } from '@testing-library/react';

import { FilterChips } from './FilterChips';
import { filterChipsPropsMocked } from './FilterChips.mock';

describe('FilterChips', () => {
  it('should render', () => {
    const { container } = render(
      <FilterChips
        {...filterChipsPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
