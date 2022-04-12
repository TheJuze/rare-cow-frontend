import { render } from '@testing-library/react';

import { HighlightedText } from './HighlightedText';
import { highlightedTextPropsMocked } from './HighlightedText.mock';

describe('HighlightedText', () => {
  it('should render', () => {
    const { container } = render(
      <HighlightedText
        {...highlightedTextPropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
