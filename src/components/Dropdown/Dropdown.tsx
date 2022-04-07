import { MouseEventHandler, MouseEvent, useCallback, useState, VFC, ChangeEvent } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'clsx';

import { Text } from 'components';

import iconArrowDown from 'assets/arrow-down.svg';
import './styles.scss';
import { TDropdownValue } from 'types';
import { Input } from 'components/Input';
import { SearchIcon } from 'assets/icons/icons';
import { Loader } from 'components/Loader';

export interface DropdownProps {
  value: TDropdownValue;
  setValue: (str: TDropdownValue) => void;
  options: TDropdownValue[];
  name: string;
  variant?: 'outlined' | 'transparent';
  dropPosition?: 'relative' | 'absolute';
  closeOnSelect?: boolean;
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: MouseEvent) => void;
  withSearch?: boolean;
  searchValue?: string;
  setSearchValue?: (val: string) => void;
  isSearching?: boolean;
}

export const Dropdown: VFC<DropdownProps> = ({
  value,
  setValue,
  options,
  variant = 'transparent',
  dropPosition = 'relative',
  className,
  closeOnSelect = false,
  name,
  label,
  placeholder,
  error,
  disabled = false,
  withSearch = false,
  searchValue = '',
  setSearchValue = (val: string) => {
    console.log(val);
  },
  isSearching = false,
  onBlur,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(
    (val: TDropdownValue) => {
      setValue(val);
      if (closeOnSelect) {
        setVisible(false);
      }
    },
    [closeOnSelect, setValue],
  );

  const onHeadClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
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
        onBlur?.(e);
      }
    },
    [onBlur, visible],
  );

  const setSearchingValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.currentTarget.value);
    },
    [setSearchValue],
  );

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      {label && (
        <Text size="m" weight="medium" className={cn('dropdown-label', className)}>
          {label}
        </Text>
      )}
      <div
        className={cn('dropdown-content', {
          active: visible,
          invalid: error,
        })}
        id={name}
      >
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cn('dropdown-content-head', variant, { disabled })}
          onClick={onHeadClick}
        >
          <div className={cn('dropdown-head-selection', { placeholder: placeholder && !value })}>
            {value ? value.content : placeholder}
          </div>

          <img alt="&darr;" src={iconArrowDown} className="dropdown-head-arrow" />
        </div>
        {error && (
          <Text color="error" className="error">
            {error}
          </Text>
        )}
        <div className={cn('dropdown-content-body', dropPosition)}>
          {withSearch && (
            <Input
              value={searchValue}
              name={`search_value_of_${name}`}
              startAdornment={<SearchIcon />}
              onChange={setSearchingValue}
              endAdornment={isSearching && <Loader size="sm" variant="gray50" />}
            />
          )}
          {options.map((option) => (
            <div
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
              className={cn('dropdown-content-body-option', {
                selected: option.id === value.id,
              })}
              onClick={() => handleClick(option)}
              key={`dropdown_option_${option.id}`}
            >
              {option.content}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};
