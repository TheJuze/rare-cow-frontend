import { render } from '@testing-library/react';

import { ArtCardSkeleton } from './ArtCardSkeleton';
import { artCardSkeletonPropsMocked } from './ArtCardSkeleton.mock';

describe('ArtCardSkeleton', () => {
  it('should render', () => {
    const { container } = render(
      <ArtCardSkeleton
        {...artCardSkeletonPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
