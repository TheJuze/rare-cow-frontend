import { render } from '@testing-library/react';

import { NftList } from './NftList';
import { nftListPropsMocked } from './NftList.mock';

describe('NftList', () => {
  it('should render', () => {
    const { container } = render(
      <NftList
        {...nftListPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
