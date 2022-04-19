/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { VFC } from 'react';

import cn from 'clsx';

import styles from './styles.module.scss';

export interface CheckboxButtonProps {
  className?: string;
  isChecked: boolean;
  onChange: () => void;
  content: any;
}

export const CheckboxButton: VFC<CheckboxButtonProps> = ({
  className,
  isChecked,
  onChange,
  content,
}) => {
  return (
    <button
      type="button"
      className={cn(styles.checkboxButton, className, { [styles.active]: isChecked })}
      onClick={() => onChange()}
    >
      {content}
    </button>
  );
};
