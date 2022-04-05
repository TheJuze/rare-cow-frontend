import React from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

export interface SwitchProps {
  id?: string;
  checked: boolean;
  variant?: 'default' | 'secondary';
  size?: 'lg' | 'sm';
  className?: string;
  onChange: () => void;
}

export const Switch = ({
  checked,
  variant = 'default',
  size = 'lg',
  className,
  id,
  onChange,
}: SwitchProps) => {
  return(
    <label
      className={cn(
        styles.switch,
        styles[variant],
        styles[size],
        className,
      )}
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={cn(styles.slider, styles[variant], styles[size])} />
    </label>
  );
};
