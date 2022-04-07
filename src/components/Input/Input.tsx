import React, {
  VFC,
  ChangeEvent,
  useCallback,
  FocusEvent,
  createElement,
  ReactElement,
  useState,
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
  required?: boolean;
}

/**
 * @param {string} [id] - unique id for the component, if it isn't passed, **name** prop will be used
 * @param {('input' | 'textarea')} [component] - type of the component
 * * input
 * * textarea
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
  required,
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
