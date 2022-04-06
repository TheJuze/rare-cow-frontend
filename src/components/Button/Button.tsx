import {
  CSSProperties,
  FC,
  PropsWithChildren,
  RefObject,
  SyntheticEvent,
  createElement,
  useMemo,
  ReactElement,
} from 'react';

import cn from 'clsx';

import styles from './styles.module.scss';

export interface ButtonProps {
  variant?: 'filled' | 'outlined' | 'text';
  color?: 'common' | 'primary' | 'secondary';
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit';
  disabled?: boolean;
  active?: boolean;
  style?: CSSProperties;
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
  variant = 'outlined',
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

  return (
    createElement(
      creationData.tag,
      {
        ...creationData.props,
        className: cn(
          icon ? styles.icon : styles.button,
          styles[`${variant}-${color}`],
          styles[size],
          { [styles.disabled]: disabled },
          { [styles.startAdornmentPadding]: startAdornment },
          { [styles.endAdornmentPadding]: endAdornment },
          { [styles.bothAdornmentsPadding]: endAdornment && startAdornment },
          { [styles.active]: active },
          className,
        ),
      },
      icon || [
        startAdornment && <span className={styles.startAdornment}>{startAdornment}</span>,
        children,
        endAdornment && <span className={styles.endAdornment}>{endAdornment}</span>,
      ],
    )
  );
};
