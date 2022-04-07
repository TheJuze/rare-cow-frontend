import { render } from '@testing-library/react';

import { Dropdown } from './Dropdown';
import { dropdownPropsMocked } from './Dropdown.mock';

describe('Dropdown', () => {
  it('should render', () => {
    const { container } = render(
      <Dropdown
        {...dropdownPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
