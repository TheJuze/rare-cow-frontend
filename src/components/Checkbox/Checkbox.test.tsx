import { render } from '@testing-library/react';

import { Checkbox } from './Checkbox';
import { checkboxPropsMocked } from './Checkbox.mock';

describe('Checkbox', () => {
  it('should render', () => {
    const { container } = render(
      <Checkbox
        {...checkboxPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
