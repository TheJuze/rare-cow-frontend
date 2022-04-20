/* eslint-disable max-len */
import React, {
  // CSSProperties,
  FC,
  PropsWithChildren,
  RefObject,
  SyntheticEvent,
  createElement,
  useMemo,
  ReactElement,
} from 'react';

import cn from 'clsx';

import './styles.scss';

export interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'common' | 'primary' | 'secondary' | 'tertiary';
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit';
  disabled?: boolean;
  active?: boolean;
  // style?: CSSProperties;
  href?: string;
  btnRef?: RefObject<HTMLButtonElement>;
  to?: string;
  className?: string;
  startAdornment?: ReactElement | string;
  endAdornment?: ReactElement | string;
  icon?: ReactElement;
  onClick?: (event: never) => void;
  onMouseLeave?: (event: never) => void;
  onMouseOver?: (event: SyntheticEvent) => void;
}

/**
 * @param {('filled' | 'outlined' | 'text')} [variant] - the scheme type of the button `initial = filled`
 * * filled
 * * outlined
 * * text
 * @param {('common' | 'primary' | 'secondary' | 'tertiary')} [color] - the color scheme of the button `initial = common`
 * * common
 * * primary
 * * secondary
 * * tertiary
 * @param {('lg' | 'md' | 'sm')} [size] - the size of the button `initial = md`
 * * lg
 * * md
 * * sm
 * @param {('button' | 'submit')} [type] - the type of the button `initial = button`
 * * button
 * * submit
 * @param {boolean} [disabled] - set button *disabled* prop
 * @param {boolean} [active] - apply active styles to the button
 * @param {CSSProperties} [style] - the object of optional styles
 * @param {string} [href] - the href to the another site
 * @param {RefObject<HTMLButtonElement>}  [btnRef] - reference to the button object
 * @param {string} [to] - the route which will redirect to the another page
 * @param {string} [className] - the wrapper class name
 * @param {ReactElement | string} [startAdornment] - add the element at the start of the component
 * @param {ReactElement | string} [endAdornment] - add the element at the end of the component
 * @param {ReactElement} [icon] - set the icon as the content of the component
 * @param {(event: never) => void} [onClick] - on click event
 * @param {(event: never) => void} [onMouseLeave] - on mouse leave event
 * @param {(event: SyntheticEvent) => void} [onMouseOver] - on mouse over event
 */
export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant = 'filled',
  size = 'md',
  color = 'common',
  className,
  type = 'button',
  disabled,
  active,
  href,
  btnRef,
  to,
  startAdornment,
  endAdornment,
  icon,
  onClick = () => {},
  onMouseLeave,
  onMouseOver = () => {},
  children,
}) => {
  const creationData = useMemo(() => {
    if (to) {
      return {
        tag: 'a',
        tabIndex: disabled ? -1 : 0,
        props: {
          to,
        },
      };
    }

    if (href) {
      return {
        tag: 'a',
        tabIndex: disabled ? -1 : 0,
        props: {
          target: '_self',
          rel: 'noopener noreferrer',
          href,
        },
      };
    }

    return {
      tag: 'button',
      props: {
        type,
        disabled,
        ref: btnRef,
        onClick,
        onMouseLeave,
        onMouseOver,
      },
    };
  }, [to, href, type, disabled, btnRef, onClick, onMouseLeave, onMouseOver]);

  return createElement(
    creationData.tag,
    {
      ...creationData.props,
      className: cn(
        icon ? 'icon' : 'button',
        `${variant}-${color}`,
        `${size}`,
        { disabled },
        { startAdornmentPadding: startAdornment },
        { endAdornmentPadding: endAdornment },
        { bothAdornmentsPadding: endAdornment && startAdornment },
        { active },
        className,
      ),
    },
    icon || [
      startAdornment && <span className="startAdornment">{startAdornment}</span>,
      children,
      endAdornment && <span className="endAdornment">{endAdornment}</span>,
    ],
  );
};
