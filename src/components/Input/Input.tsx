import React, {
  VFC,
  ChangeEvent,
  useCallback,
  FocusEvent,
  createElement,
  ReactElement,
  useState,
  MutableRefObject,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react';
import cn from 'clsx';
import { Text } from 'components';
import './styles.scss';
import { EInputStatus, TInputCaption } from 'types';

export interface InputProps {
  id?: string;
  component?: 'input' | 'textarea';
  type?: 'text' | 'number' | 'password';
  size?: 'sm' | 'md';
  label?: string | ReactElement;
  name: string;
  value?: string;
  placeholder?: string;
  className?: string;
  caption?: TInputCaption;
  startAdornment?: ReactElement | string;
  endAdornment?: ReactElement | string;
  disabled?: boolean;
  isCorrect?: boolean | '';
  autoComplete?: 'off' | 'on';
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyPress?: KeyboardEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  required?: boolean;
  inputRef?: MutableRefObject<HTMLElement>;
}

/**
 * @param {string} name - the unique name of the component
 * @param {string} [id] - unique id for the component, if it isn't passed, *name* property will be used
 * @param {('input' | 'textarea')} [component] - type of the component `initial = text`
 * * input
 * * textarea
 * @param {('text' | 'number' | 'password')} [type] - set type of the input `initial = text`
 * @param {('sm' | 'md')} [size] - set the size of the input `initial = md`
 * @param {(string | ReactElement)} [label] - set the label of the component
 * @param {string} [placeholder] - the *placeholder* property
 * @param {string} [className] - the wrapper class name
 * @param {TInputCaption} [caption] - the info under the input `initial = { status: EInputStatus.COMMON, caption: '' }`
 * @param {ReactElement | string} [startAdornment] - add the element at the start of the component
 * @param {ReactElement | string} [endAdornment] - add the element at the end of the component
 * @param {boolean} [disabled] - set *disabled* property `initial = false`
 * @param {boolean} [isCorrect] - the correction of the input `initial = false`
 * @param {('off' | 'on')} [autoComplete] - set the *autocomplete* property `initial = off`
 * * off
 * * on
 * @param {(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onChange] - change event handler
 * @param {(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onFocus] - focus event handler
 * @param {(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void} [onBlur] - blur event handler
 * @param {KeyboardEventHandler<HTMLDivElement>} [onKeyPress] - on key press event handler
 * @param {MouseEventHandler<HTMLDivElement>} [onClick] - on click event handler
 * @param {boolean} [required] - set the required styles
 * @param { MutableRefObject<HTMLElement>} [inputRef] - the reference on the input
 */
export const Input: VFC<InputProps> = ({
  id,
  type = 'text',
  component = 'input',
  size = 'md',
  label,
  name,
  value,
  className,
  placeholder,
  startAdornment,
  endAdornment,
  disabled = false,
  isCorrect = false,
  autoComplete = 'off',
  caption = { status: EInputStatus.COMMON, caption: '' },
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyPress = () => {},
  onClick = () => {},
  required,
  inputRef,
}) => {
  const [inFocus, setInFocus] = useState(false);

  const onFocusHandler = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInFocus(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const onBlurHandler = useCallback(
    (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInFocus(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <div
      className={cn('input-wrapper', `input-${size}`, {
        'input-in-focus': inFocus,
        'input-disabled': disabled,
        'input-success': caption.status === EInputStatus.SUCCESS,
        'input-error': caption.status === EInputStatus.ERROR,
      })}
      onKeyDown={onKeyPress}
      onClick={onClick}
    >
      <label htmlFor={id || name} className={cn('input-label', className)}>
        {label && (
          <Text size="m" weight="medium" className={cn('input-label-text')}>
            {label}
          </Text>
        )}
        <div
          className={cn('input-body', { 'textarea-body': component === 'textarea' }, { required })}
        >
          {startAdornment && component !== 'textarea' && (
            <span className="input-startAdornment">{startAdornment}</span>
          )}
          {createElement(component, {
            id: id || name,
            type,
            name,
            tabIndex: 0,
            value,
            placeholder,
            autoComplete,
            disabled,
            className: cn(component, { bigRightPadding: isCorrect }),
            ref: inputRef,
            onChange,
            onFocus: onFocusHandler,
            onBlur: onBlurHandler,
          })}
          {endAdornment && component !== 'textarea' && (
            <span className="input-endAdornment">{endAdornment}</span>
          )}
        </div>
        {caption.caption && <span className="input-caption">{caption.caption}</span>}
      </label>
    </div>
  );
};
