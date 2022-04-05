import React from 'react';

import { toastifyPropsMocked } from './Toastify.mock';
import { Toastify } from './Toastify';

export default {
  title: 'components/Toastify',
  component: Toastify,
};

export const Default: React.FC = () => (
  <>
    {toastifyPropsMocked.map((toastify) => (
      <Toastify {...toastify} />
    ))}
  </>
);
