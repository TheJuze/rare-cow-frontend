/* eslint-disable react/jsx-props-no-spreading,
@typescript-eslint/no-explicit-any,
react/destructuring-assignment */
import React, { FC, ReactElement, useCallback, useMemo } from 'react';
import cn from 'clsx';
import { ChevronDown } from 'assets/icons/icons';
import RSelect, {
  components as component,
  ControlProps,
  OptionProps,
  PlaceholderProps,
  MenuListProps,
  MenuProps,
  IndicatorsContainerProps,
  Props as ReactSelectProps,
} from 'react-select';
import { Text } from '..';
import styles from './styles.module.scss';
import { CustomStyles, OptionType } from './Select.types';

const ROOT = document.querySelector('body');

export interface SelectProps extends ReactSelectProps {
  label?: string;
  customLabel?: ReactElement;
  error?: string;
  value?: OptionType;
  withErrorText?: boolean;
  disabled?: boolean;
  customStyles?: CustomStyles;
  isMulti?: boolean;
  classNameSelect?: string;
  classNameControl?: string;
  classNameOption?: string;
  classNameOptionText?: string;
  classNamePlaceholder?: string;
  classNameMenuList?: string;
  classNameMenu?: string;
  classNameIndicatorsContainer?: string;
  classNameDropdownIndicator?: string;
  classNameValueContainer?: string;
  classNameSingleValue?: string;
  classNameLabel?: string;
  classNameSelectWithErrorWrap?: string;
  withPortal?: boolean;
}

export const Select: FC<SelectProps> = ({
  name,
  options,
  value,
  placeholder = 'Select value',
  onChange = () => {},
  label = '',
  customLabel = undefined,
  error = '',
  withErrorText = true,
  disabled,
  closeMenuOnSelect,
  hideSelectedOptions,
  controlShouldRenderValue,
  isClearable = false,
  isSearchable = false,
  isMulti = false,
  customStyles = {},
  classNameSelect = '',
  classNameControl = '',
  classNameOption = '',
  classNameOptionText = '',
  classNamePlaceholder = '',
  classNameMenuList = '',
  classNameMenu = '',
  classNameIndicatorsContainer = '',
  classNameDropdownIndicator = '',
  classNameValueContainer = '',
  classNameSingleValue = '',
  classNameLabel = '',
  classNameSelectWithErrorWrap = '',
  className,
  onMenuOpen,
  onMenuClose,
  withPortal = false,
  menuPortalTarget,
  components,
}) => {
  const Control = useCallback((props: ControlProps<OptionType, boolean>) => (
    <component.Control
      {...props}
      className={cn(
        styles.control,
        props.isFocused && styles.focused,
        props.menuIsOpen && styles.open,
        error && styles.errorControl,
        classNameControl,
      )}
    />
  ), [classNameControl, error]);

  const Option = useCallback((props: OptionProps<OptionType, boolean>) => (
    <component.Option
      {...props}
      className={cn(
        styles.option,
        props.isSelected && styles.selected,
        props.isFocused && styles.focused,
        classNameOption,
      )}
    >
      {props.data.icon && <img src={props.data.icon} alt="icon" className={styles.iconOption} />}
      <Text
        {...props}
        tag="span"
        weight="medium"
        className={cn(
          styles.optionText,
          classNameOptionText,
        )}
      />
    </component.Option>
  ), [classNameOption, classNameOptionText]);

  const Placeholder = useCallback((props: PlaceholderProps<OptionType, boolean>) => (
    <component.Placeholder
      {...props}
      // tag="span"
      isFocused={props.isFocused}
      className={cn(
        styles.placeholder,
        classNamePlaceholder,
      )}
    />
  ), [classNamePlaceholder]);

  const MenuList = useCallback((props: MenuListProps<OptionType, boolean>) => (
    <component.MenuList
      {...props}
      maxHeight={props.maxHeight}
      className={cn(
        styles.menuList,
        classNameMenuList,
      )}
    />
  ), [classNameMenuList]);

  const Menu = useCallback((props: MenuProps) => (
    <component.Menu
      {...props}
      className={cn(
        styles.menu,
        classNameMenu,
      )}
    />
  ), [classNameMenu]);

  const ValueContainer = useCallback((props) => (
    <component.ValueContainer
      {...props}
      className={cn(
        styles.valueContainer,
        classNameValueContainer,
      )}
    >
      <component.Placeholder
        {...props}
        isFocused={props.isFocused}
        className={cn(
          styles.placeholder,
          classNamePlaceholder,
        )}
      >
        {props.selectProps.placeholder}
      </component.Placeholder>
      {React.Children.map(props.children, (child) => (child && child.type !== Placeholder ? child : null))}
    </component.ValueContainer>
  ), [Placeholder, classNamePlaceholder, classNameValueContainer]);

  const SingleValue = useCallback((props: any) => (
    <component.SingleValue
      {...props}
      className={cn(styles.singleValue, classNameSingleValue)}
    >
      {props.data.icon && <img src={props.data.icon} alt="icon" className={styles.iconOption} />}
      {props.children}
    </component.SingleValue>
  ), [classNameSingleValue]);

  const IndicatorsContainer = useCallback((props: IndicatorsContainerProps<OptionType, boolean>) => (
    <component.IndicatorsContainer
      {...props}
      className={cn(
        styles.indicatorsContainer,
        classNameIndicatorsContainer,
      )}
    />
  ), [classNameIndicatorsContainer]);

  const DropdownIndicator = useCallback((props: any) => (
    <ChevronDown
      className={cn(
        styles.dropdownIndicator,
        props.selectProps.menuIsOpen && styles.open,
        classNameDropdownIndicator,
      )}
    />
  ), [classNameDropdownIndicator]);

  const NoOptionsMessage = useCallback(() => (
    <Text
      className={styles.noOptionsMessage}
      align="center"
    >
      Nothing found
    </Text>
  ), []);

  const menuPortalTargetInfo = withPortal
    ? menuPortalTarget || ROOT
    : null;

  const filterOptions = useMemo(() => options?.filter(({ value: optionValue }) => optionValue !== value?.value), [options, value]);

  return (
    <div className={cn(styles.selectWrap, className)}>
      {customLabel}
      {(label && !customLabel) && (
        <Text
          className={cn(
            styles.label,
            disabled && styles.disabled,
            classNameLabel,
          )}
          tag="span"
          weight="medium"
        >
          {label}
        </Text>
      )}
      <div className={cn(styles.selectWithErrorWrap, classNameSelectWithErrorWrap)}>
        <RSelect
          components={{
            Option: components?.Option || Option,
            Control: components?.Control || Control,
            IndicatorSeparator: components?.IndicatorSeparator || null,
            IndicatorsContainer: components?.IndicatorsContainer || IndicatorsContainer,
            Placeholder: components?.Placeholder || Placeholder,
            Menu: components?.Menu || Menu,
            ValueContainer: components?.ValueContainer || ValueContainer,
            MenuList: components?.MenuList || MenuList,
            DropdownIndicator: components?.DropdownIndicator || DropdownIndicator,
            SingleValue: components?.SingleValue || SingleValue,
            NoOptionsMessage,
          }}
          isDisabled={disabled}
          options={filterOptions}
          closeMenuOnSelect={closeMenuOnSelect}
          hideSelectedOptions={hideSelectedOptions}
          controlShouldRenderValue={controlShouldRenderValue}
          value={value}
          name={name}
          placeholder={placeholder}
          className={cn(
            styles.select,
            error && styles.error,
            disabled && styles.disabled,
            classNameSelect,
          )}
          isOptionSelected={() => true}
          onChange={onChange}
          styles={{
            ...customStyles,
            placeholder: (provided, state) => ({
              ...provided,
              position: 'absolute',
              top: state.hasValue || state.selectProps.inputValue ? 5 : '30%',
              left: 24,
              transition: 'top 0.1s, font-size 0.1s',
              fontSize: `${(state.hasValue || state.selectProps.inputValue) ? '12px ' : '16px '} !important`,
            }),
          }}
          menuPortalTarget={menuPortalTargetInfo}
          onMenuOpen={onMenuOpen}
          onMenuClose={onMenuClose}
          isMulti={isMulti}
          isClearable={isClearable}
          isSearchable={isSearchable}
        />
        {error && withErrorText && (
          <Text
            size="s"
            color="error"
            align="left"
            className={styles.errorText}
          >
            {error}
          </Text>
        )}
      </div>
    </div>
  );
};
