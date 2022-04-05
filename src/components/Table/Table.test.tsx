import { render } from '@testing-library/react';

import { Table } from './Table';
import { simpleTablePropsMocked } from './Table.mock';

describe('Table', () => {
  it('should render', () => {
    const { container } = render(
      <Table
        {...simpleTablePropsMocked}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
