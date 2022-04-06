import { ChangeEventHandler, FC } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface CheckboxProps {
  className?: string;
  value: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  disabled?: boolean;
}

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
        onChange={onChange}
        checked={value}
        disabled={disabled}
      />
      <span className="checkbox-inner">
        <span className="checkbox-tick" />
        <span className="checkbox-content">{children}</span>
      </span>
    </label>
  );
};
