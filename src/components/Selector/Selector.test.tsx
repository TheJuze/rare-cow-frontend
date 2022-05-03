import { render } from '@testing-library/react';

import { Selector } from './Selector';
import { selectorPropsMocked } from './Selector.mock';

describe('Selector', () => {
  it('should render', () => {
    const { container } = render(
      <Selector
        {...selectorPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
