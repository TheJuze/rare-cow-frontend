import { render } from '@testing-library/react';

import { SearchCollection } from './SearchCollection';
import { searchCollectionPropsMocked } from './SearchCollection.mock';

describe('SearchCollection', () => {
  it('should render', () => {
    const { container } = render(
      <SearchCollection
        {...searchCollectionPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
