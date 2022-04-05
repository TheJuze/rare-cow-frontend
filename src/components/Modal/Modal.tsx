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
  const { customTitle = ' ', open, className, children, onClose, size = 'md' } = props;

  const jsxTitle = useMemo(() => (typeof customTitle === 'string' ? <div className={clsx(s.title, 'l')}>{customTitle}</div> : customTitle), [customTitle]);
  return (
    <DialogWrap
      transitionDuration={{
        enter: 200,
        exit: 0,
      }}
      open={open}
      onClose={onClose}
      {...omit({ ...props }, 'customTitle')}
      classes={{
        root: className,
        paper: clsx(s.root, s[size]),
      }}
    >
      <div className={s.modalTitle}>{customTitle && jsxTitle}</div>
      {children}
    </DialogWrap>
  );
};
