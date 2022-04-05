import React from 'react';

import { Spinner } from './Spinner';
import { spinnerPropsMocked } from './Spinner.mock';

export default {
  title: 'basic-components/Spinner',
  component: Spinner,
};

export const Default: React.FC = () => (
  <>
    <Spinner
      {...spinnerPropsMocked}
    />
  </>
);
