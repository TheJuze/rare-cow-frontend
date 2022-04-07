import { render } from '@testing-library/react';

import { OptionSelector } from './OptionSelector';
import { optionSelectorPropsMocked } from './OptionSelector.mock';

describe('OptionSelector', () => {
  it('should render', () => {
    const { container } = render(
      <OptionSelector
        {...optionSelectorPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
