import { FormEvent, useCallback, useState, VFC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'clsx';

import { Text } from 'components';

import iconArrowDown from 'assets/arrow-down.svg';
import styles from './styles.scss';

export interface DropdownProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (str: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<any>;
  isWithImage?: boolean;
  isWritable?: boolean;
  name?: string;
  suffix?: string;
  headClassName?: string;
  bodyClassName?: string;
  returnBy?: string;
  drawBy?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: FormEvent<HTMLDivElement>) => void;
}

export const Dropdown: VFC<DropdownProps> = ({
  className,
  value,
  setValue,
  options,
  isWithImage,
  isWritable,
  name,
  suffix = '',
  headClassName,
  bodyClassName,
  returnBy = 'symbol',
  drawBy = 'symbol',
  label,
  placeholder,
  error,
  disabled,
  onBlur,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(
    (str: string) => {
      setValue(str);
      setVisible(false);
    },
    [setValue],
  );

  const onHeadClick = useCallback(
    (e: FormEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        const prev = visible;
        setVisible(!prev);
        if (prev) {
          onBlur?.(e);
        }
      }
    },
    [disabled, onBlur, visible],
  );

  const onOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (visible) {
        setVisible(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onBlur?.(e as any);
      }
    },
    [onBlur, visible],
  );

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      {label && (
        <Text size="m" weight="medium" className={cn(styles.label, className)}>
          {label}
        </Text>
      )}
      <div
        className={cn(styles.dropdown, {
          [styles.active]: visible,
          [styles.invalid]: error,
        })}
        id={name}
      >
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cn(styles.head, headClassName, { [styles.disabled]: disabled })}
          onClick={onHeadClick}
        >
          {isWritable ? (
            <input
              value={value ? value[drawBy] : ''}
              placeholder={placeholder}
              className={styles.input}
            />
          ) : (
            <div className={cn(styles.selection, { [styles.placeholder]: placeholder && !value })}>
              {value ? value[drawBy] : placeholder}
            </div>
          )}
          <img alt="open dropdown" src={iconArrowDown} className={styles.arrow} />
        </div>
        {error && (
          <Text color="error" className={styles.error}>
            {error}
          </Text>
        )}
        {!isWithImage ? (
          <div className={cn(styles.body, bodyClassName)}>
            {typeof options[0] === 'string'
              ? options.map((option: string) => (
                <div
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                  className={cn(
                    styles.option,
                    {
                      [styles.selectioned]: option === value,
                    },
                    option === value ? 'selected' : '',
                  )}
                  onClick={() => handleClick(option)}
                  key={`dropdown_option_${option}`}
                >
                  {option}
                  {suffix}
                </div>
              ))
              : options.map((option) => (
                <div
                  onKeyDown={() => {}}
                  tabIndex={0}
                  role="button"
                  className={cn(styles.option, {
                    [styles.selectioned]: option[drawBy] === value ? value[drawBy] : '',
                  })}
                  onClick={() => handleClick(option)}
                  key={`dropdown_option_${option[drawBy]}`}
                >
                  {option.icon}
                  <Text className={styles.text} tag="span">
                    {option[drawBy]}
                  </Text>
                </div>
              ))}
          </div>
        ) : (
          <div className={cn(styles.body, bodyClassName)}>
            {options.map((option) => (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn(
                  styles.option,
                  {
                    [styles.selectioned]: option?.symbol === value,
                  },
                  option.symbol === value ? 'text-gradient' : '',
                )}
                onClick={() => handleClick(option)}
                key={`dropdown_option_${option[returnBy]}`}
              >
                <img alt="" className={styles.image} src={option.image} />
                <Text className={styles.text} tag="span" align="left">
                  {option[drawBy]?.toUpperCase()}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
