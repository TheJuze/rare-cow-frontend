import { render } from '@testing-library/react';

import { Loader } from './Loader';
import { loaderPropsMocked } from './Loader.mock';

describe('Loader', () => {
  it('should render', () => {
    const { container } = render(
      <Loader
        {...loaderPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
