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

/**
 * @param {boolean} checked - set the state of the input
 * @param {() => void} onChange - the function which change the state of the input
 * @param {string} [id] - unique id of the input
 * @param {( 'default' | 'secondary')} [variant] - the color scheme of the component `initial = default`
 * * default
 * * secondary
 * @param {('lg' | 'sm')} [size] - the size of the switch
 * * lg 56x32
 * * sm 32x20
 * @param {string} [className] - the wrapper class name
 */
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
