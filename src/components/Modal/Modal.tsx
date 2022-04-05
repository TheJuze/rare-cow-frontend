import { FC, ReactNode, useMemo } from 'react';

import clsx from 'clsx';
import { omit } from 'lodash';
import DialogWrap, { DialogProps } from 'rc-dialog';
import s from './styles.module.scss';

export interface ModalProps extends DialogProps {
  customTitle?: string | ReactNode;
  size?: 'sm' | 'md' | 'lg';
  open: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal: FC<ModalProps> = (props) => {
  const { customTitle = ' ', open, children, onClose } = props;

  const jsxTitle = useMemo(() => (typeof customTitle === 'string' ? <div className={clsx(s.title, 'l')}>{customTitle}</div> : customTitle), [customTitle]);
  return (
    <DialogWrap
      open={open}
      onClose={onClose}
      {...omit({ ...props }, 'customTitle')}
    >
      <div className={s.modalTitle}>{customTitle && jsxTitle}</div>
      {children}
    </DialogWrap>
  );
};
