import { render } from '@testing-library/react';

import { CollectionsList } from './CollectionsList';
import { collectionsListPropsMocked } from './CollectionsList.mock';

describe('CollectionsList', () => {
  it('should render', () => {
    const { container } = render(
      <CollectionsList
        {...collectionsListPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
