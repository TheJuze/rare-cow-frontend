import { render } from '@testing-library/react';

import { ArtCard } from './ArtCard';
import { artCardPropsMocked } from './ArtCard.mock';

describe('ArtCard', () => {
  it('should render', () => {
    const { container } = render(
      <ArtCard
        {...artCardPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
