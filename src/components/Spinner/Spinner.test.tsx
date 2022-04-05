import React from 'react';

import { render } from '@testing-library/react';

import { Spinner } from './Spinner';
import { spinnerPropsMocked } from './Spinner.mock';

describe('Spinner', () => {
  it('should render', () => {
    const { container } = render(
      <Spinner
        {...spinnerPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
