import { render } from '@testing-library/react';

import { AvatarUploader } from './AvatarUploader';
import { avatarUploaderPropsMocked } from './AvatarUploader.mock';

describe('AvatarUploader', () => {
  it('should render', () => {
    const { container } = render(
      <AvatarUploader
        {...avatarUploaderPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
