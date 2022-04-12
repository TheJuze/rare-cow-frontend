import { FC, MouseEventHandler } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface CheckboxProps {
  className?: string;
  value: boolean;
  onChange?: MouseEventHandler<HTMLInputElement>;
  id?: string;
  disabled?: boolean;
}

/**
 * @param {boolean} value - set the status of the checkbox
 * @param {MouseEventHandler<HTMLInputElement>} [onChange] - the function which change state of the checkbox
 * @param {string} [id] - the unique name of the checkbox
 * @param {boolean} [disabled] - set *disabled* property of the checkbox
 * @param {string} [className] - the wrapper class name
 */
export const Checkbox: FC<CheckboxProps> = ({
  className,
  disabled,
  children,
  value,
  onChange,
  id = '',
}): JSX.Element => {
  return (
    <label htmlFor={`toggle-${id}`} className={cn('checkbox', className, { disabled })}>
      <input
        id={`toggle-${id}`}
        className="checkbox-input"
        type="checkbox"
        onClick={onChange}
        checked={value}
        disabled={disabled}
        tabIndex={0}
      />
      <span className="checkbox-inner">
        <span className="checkbox-tick" />
        <span className="checkbox-content">{children}</span>
      </span>
    </label>
  );
};
