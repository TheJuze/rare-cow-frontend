import { render } from '@testing-library/react';

import { Countdown } from './Countdown';
import { countdownPropsMocked } from './Countdown.mock';

describe('Countdown', () => {
  it('should render', () => {
    const { container } = render(
      <Countdown
        {...countdownPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
