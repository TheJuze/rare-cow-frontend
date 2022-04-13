import { render } from '@testing-library/react';

import { Clipboard } from './Clipboard';
import { clipboardPropsMocked } from './Clipboard.mock';

describe('Clipboard', () => {
  it('should render', () => {
    const { container } = render(
      <Clipboard
        {...clipboardPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
