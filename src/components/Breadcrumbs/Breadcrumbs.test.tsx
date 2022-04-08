import { render } from '@testing-library/react';

import { Breadcrumbs } from './Breadcrumbs';
import { breadcrumbsPropsMocked } from './Breadcrumbs.mock';

describe('Breadcrumbs', () => {
  it('should render', () => {
    const { container } = render(
      <Breadcrumbs
        {...breadcrumbsPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
