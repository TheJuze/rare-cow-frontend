import { render } from '@testing-library/react';

import { QuantityInput } from './QuantityInput';
import { quantityInputPropsMocked } from './QuantityInput.mock';

describe('QuantityInput', () => {
  it('should render', () => {
    const { container } = render(
      <QuantityInput
        {...quantityInputPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
