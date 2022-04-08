import { render } from '@testing-library/react';

import { TabBar } from './TabBar';
import { tabBarPropsMocked } from './TabBar.mock';

describe('TabBar', () => {
  it('should render', () => {
    const { container } = render(
      <TabBar
        {...tabBarPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
