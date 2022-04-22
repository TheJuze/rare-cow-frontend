import { render } from '@testing-library/react';

import { Chips } from './Chips';
import { chipsPropsMocked } from './Chips.mock';

describe('Chips', () => {
  it('should render', () => {
    const { container } = render(<Chips {...chipsPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
