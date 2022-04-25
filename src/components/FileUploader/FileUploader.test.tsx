import { render } from '@testing-library/react';
import React from 'react';
import { FileUploader } from './FileUploader';
import { fileUploaderPropsMocked } from './FileUploader.mock';

describe('FileUploader', () => {
  it('should render', () => {
    const { container } = render(<FileUploader {...fileUploaderPropsMocked} />);
    expect(container).toMatchSnapshot();
  });
});
