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
          target: '_blank',
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
