import React from 'react';

import { Modal } from './Modal';
import { modalPropsMocked } from './Modal.mock';

export default {
  title: 'components/Modal',
  component: Modal,
};

export const Default: React.FC = () => (
  <>
    <div>
      <Modal {...modalPropsMocked} />
    </div>
  </>
);
