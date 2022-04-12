import { render } from '@testing-library/react';

import { SearchItem } from './SearchItem';
import { searchItemPropsMocked } from './SearchItem.mock';

describe('SearchItem', () => {
  it('should render', () => {
    const { container } = render(
      <SearchItem
        {...searchItemPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
