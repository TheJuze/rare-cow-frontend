import { render } from '@testing-library/react';

import { Button } from './Button';
import { buttonPropsMocked } from './Button.mock';

describe('Button', () => {
  it('should render', () => {
    const { container } = render(<Button {...buttonPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
