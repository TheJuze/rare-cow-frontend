import { render } from '@testing-library/react';

import { Select } from './Select';
import { selectPropsMocked } from './Select.mock';

describe('Select', () => {
  it('should render', () => {
    const { container } = render(
      <Select
        {...selectPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
