/* eslint-disable max-len */
import React, {
  MouseEventHandler,
  MouseEvent,
  useCallback,
  useState,
  VFC,
  ChangeEvent,
  ReactElement,
} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'clsx';

import { Text } from 'components';

import './styles.scss';
import { TDropdownValue } from 'types';
import { Input } from 'components/Input';
import { ArrowHeadDownIcon, SearchIcon, TriangleDownIcon } from 'assets/icons/icons';
import { Loader } from 'components/Loader';

export interface DropdownProps {
  value: TDropdownValue;
  setValue: (str: TDropdownValue) => void;
  options: TDropdownValue[];
  name: string;
  variant?: 'outlined' | 'transparent';
  dropPosition?: 'relative' | 'absolute';
  underlined?: boolean;
  closeOnSelect?: boolean;
  className?: string;
  classNameHead?: string;
  label?: string | ReactElement;
  error?: string | ReactElement;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: MouseEvent) => void;
  withSearch?: boolean;
  searchValue?: string;
  setSearchValue?: (val: string) => void;
  isSearching?: boolean;
}

const iconMap = {
  outlined: <TriangleDownIcon />,
  transparent: <ArrowHeadDownIcon />,
};

/**
 * @param {TDropdownValue} value - the dropdown current value
 * @param {(str: TDropdownValue) => void} setValue - function which set current state of the dropdown
 * @param {TDropdownValue[]} options - list of options
 * @param {string} name - id of the dropdown
 * @param {('outlined' | 'transparent')} [variant = transparent] - color theme of the dropdown
 * * outlined
 * * transparent
 * @param {('relative' | 'absolute')} [dropPosition = relative] - position of the dropdown
 * * relative
 * * absolute
 * @param {boolean} [underlined = true] - add underline on the `'outlined'` dropdown option
 * @param {boolean} [closeOnSelect = false] - flag which change selection action
 * @param {string} [className] - the wrapper class name
 * @param {string} [classNameHead] - the head class name
 * @param {(string | ReactElement)} [label] - label of the dropdown
 * @param {(string | ReactElement)} [error] - error of the dropdown
 * @param {string} [placeholder] - value, which will be set if the current value isn't chosen
 * @param {boolean} [disabled] - disable the dropdown
 * @param {(e: MouseEvent) => void} [onBlur] - onBlur event handler
 * @param {boolean} [withSearch] - add search input to the dropdown
 * @param {string} [searchValue] - search input value
 * @param {(val: string) => void} [setSearchValue] - set the search input value
 * @param {boolean} [isSearching] - disable the search input and add loader
 */
export const Dropdown: VFC<DropdownProps> = ({
  value,
  setValue,
  options,
  variant = 'transparent',
  dropPosition = 'relative',
  className,
  classNameHead,
  closeOnSelect = false,
  underlined = false,
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
        <Text size="m" weight="medium" className={cn('dropdown-label')}>
          {label}
        </Text>
      )}
      <div
        className={cn(
          'dropdown-content',
          {
            active: visible && !disabled,
            invalid: error,
          },
          className,
        )}
        id={name}
      >
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cn(classNameHead, 'dropdown-content-head', variant, { disabled })}
          onClick={onHeadClick}
        >
          <div className={cn('dropdown-head-selection', { placeholder: placeholder && !value })}>
            {value ? value.content : placeholder}
          </div>
          <span className={cn('dropdown-head-icon', { 'dropdown-head-icon-active': visible })}>
            {iconMap[variant]}
          </span>
        </div>
        {error && (
          <Text color="error" className="error">
            {error}
          </Text>
        )}
        <div className={cn('dropdown-content-body', variant, dropPosition, { underlined })}>
          {withSearch && (
            <Input
              value={searchValue}
              name={`search_value_of_${name}`}
              startAdornment={<SearchIcon />}
              placeholder="Search..."
              size={variant === 'transparent' ? 'sm' : 'md'}
              onChange={setSearchingValue}
              endAdornment={isSearching ? <Loader size="extra-sm" variant="gray50" /> : <svg />}
              disabled={isSearching}
              className="dropdown-search-input"
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
