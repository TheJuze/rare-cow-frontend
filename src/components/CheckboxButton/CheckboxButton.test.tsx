import { render } from '@testing-library/react';

import { CheckboxButton } from './CheckboxButton';
import { checkboxButtonPropsMocked } from './CheckboxButton.mock';

describe('CheckboxButton', () => {
  it('should render', () => {
    const { container } = render(
      <CheckboxButton
        {...checkboxButtonPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
