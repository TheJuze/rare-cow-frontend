import { render } from '@testing-library/react';

import { Tooltip } from './Tooltip';
import { tooltipPropsMocked } from './Tooltip.mock';

describe('Tooltip', () => {
  it('should render', () => {
    const { container } = render(
      <Tooltip
        {...tooltipPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
