import { render } from '@testing-library/react';

import { Input } from './Input';
import { inputPropsMocked } from './Input.mock';

describe('Input', () => {
  it('should render', () => {
    const { container } = render(
      <Input
        {...inputPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
