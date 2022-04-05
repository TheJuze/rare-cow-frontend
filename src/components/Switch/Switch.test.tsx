import { render } from '@testing-library/react';

import { Switch } from './Switch';
import { switchPropsMocked } from './Switch.mock';

describe('Switch', () => {
  it('should render', () => {
    const { container } = render(
      <Switch
        {...switchPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
