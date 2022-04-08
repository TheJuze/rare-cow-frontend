import { render } from '@testing-library/react';

import { SearchInput } from './SearchInput';
import { searchInputPropsMocked } from './SearchInput.mock';

describe('SearchInput', () => {
  it('should render', () => {
    const { container } = render(
      <SearchInput
        {...searchInputPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
