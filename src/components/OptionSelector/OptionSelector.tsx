import { VFC, useCallback } from 'react';

import cn from 'clsx';

import { TOption } from 'types';
import './styles.scss';

export interface OptionSelectorProps {
  name: string;
  options: TOption[];
  selected: TOption;
  setSelected: (val: TOption) => void;
  className?: string;
  dir?: 'vertical' | 'horizontal';
}

type OptionProps = TOption & {
  name: string;
  tabIndex: number;
  selected: boolean;
  onClick: (val: TOption) => void;
};

const Option: VFC<OptionProps> = ({
  name,
  value,
  tabIndex,
  content,
  disabled,
  selected,
  onClick,
}) => (
  <label htmlFor={`option-${name}-${value}`} className={cn('single-option', { disabled })}>
    <input
      type="radio"
      id={`option-${name}-${value}`}
      name={name}
      checked={selected}
      onChange={() => onClick({ value, content })}
      className="single-option-input"
      disabled={disabled}
      tabIndex={tabIndex}
    />
    <span className="single-option-radio" />
    <div>{content}</div>
  </label>
);

export const OptionSelector: VFC<OptionSelectorProps> = ({
  name,
  options,
  selected,
  setSelected,
  className,
  dir = 'vertical',
}) => {
  const onOptionClick = useCallback((val: TOption) => () => setSelected(val), [setSelected]);

  return (
    <section className={cn(dir, 'option-selector', className)}>
      {options.map((opt, idx) => (
        <Option
          tabIndex={idx}
          key={opt.value}
          {...opt}
          name={name}
          selected={selected.value === opt.value}
          onClick={onOptionClick}
        />
      ))}
    </section>
  );
};
