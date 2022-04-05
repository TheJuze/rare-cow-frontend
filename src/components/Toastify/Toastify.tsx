import { FC } from 'react';
import clsx from 'clsx';
import s from './styles.module.scss';

export type ToastifyProps = {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  className?: string;
};

export const Toastify: FC<ToastifyProps> = ({ type, message, className }) => {
  return (
    <div className={clsx(s.toastify, s[type], className)}>
      <div className={s[`${type}Text`]}>{message}</div>
      <div className={clsx(s.closeBtnContainer, s[`icon${type}`])}>{/* <span>closeIcon</span> */}</div>
    </div>
  );
};
