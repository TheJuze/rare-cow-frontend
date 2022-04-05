import React from 'react';

import { render } from '@testing-library/react';

import { Modal } from './Modal';
import { modalPropsMocked } from './Modal.mock';

describe('Modal', () => {
  it('should render', () => {
    const { container } = render(
      <Modal
        {...modalPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
