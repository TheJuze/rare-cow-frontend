import { render } from '@testing-library/react';

import { Header } from './Header';
import { headerPropsMocked } from './Header.mock';

describe('Header', () => {
  it('should render', () => {
    const { container } = render(
      <Header
        {...headerPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
