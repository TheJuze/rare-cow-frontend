import { render } from '@testing-library/react';

import { CollectionCard } from './CollectionCard';
import { collectionCardPropsMocked } from './CollectionCard.mock';

describe('CollectionCard', () => {
  it('should render', () => {
    const { container } = render(
      <CollectionCard
        {...collectionCardPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
