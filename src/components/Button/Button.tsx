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
  variant?: 'filled' | 'outlined' | 'outlined-secondary' | 'text';
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: CSSProperties;
  href?: string;
  btnRef?: RefObject<HTMLButtonElement>;
  to?: string;
  className?: string;
  startAdorment?: ReactElement | string;
  endAdorment?: ReactElement | string;
  icon?: ReactElement;
  onClick?: (event: never) => void;
  onMouseLeave?: (event: never) => void;
  onMouseOver?: (event: SyntheticEvent) => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  variant = 'outlined',
  size = 'lg',
  className,
  type = 'button',
  disabled,
  href,
  btnRef,
  to,
  startAdorment,
  endAdorment,
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
        props: {
          to,
        },
      };
    }

    if (href) {
      return {
        tag: 'a',
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
        ref: btnRef,
        onClick,
        onMouseLeave,
        onMouseOver,
      },
    };
  }, [to, href, type, btnRef, onClick, onMouseLeave, onMouseOver]);

  return (
    createElement(
      creationData.tag,
      {
        ...creationData.props,
        className: cn(
          icon ? styles.icon : styles.button,
          styles[variant],
          styles[size],
          { [styles.disabled]: disabled },
          { [styles.startAdormentPadding]: startAdorment },
          { [styles.endAdormentPadding]: endAdorment },
          { [styles.bothAdormentsPadding]: endAdorment && startAdorment },
          className,
        ),
      },
      icon || [
        startAdorment && <span className={styles.startAdorment}>{startAdorment}</span>,
        children,
        endAdorment && <span className={styles.endAdorment}>{endAdorment}</span>,
      ],
    )
  );
};
