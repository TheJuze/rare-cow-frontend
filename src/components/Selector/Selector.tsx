import React, { VFC } from 'react';

import cx from 'classnames';
import { Text } from 'components';

import styles from './styles.module.scss';

export interface SelectorProps {
  className?: string;
  value: boolean;
  setValue: (foo: boolean) => void;
  name?: string;
  optionLeft?: string;
  optionRight?: string;
}

export const Selector: VFC<SelectorProps> = ({
  className,
  value,
  setValue,
  name,
  optionLeft,
  optionRight,
}) => (
  <label htmlFor={name || 'toogle'} className={cx(styles.selector, className)}>
    <div
      className={styles.left}
      onClick={() => setValue(!value)}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
    >
      {optionLeft && (
        <Text
          size="xs"
          weight="medium"
          color="metal50"
          className={cx(styles.option, { [styles.optionActive]: value })}
        >
          {optionLeft}
        </Text>
      )}
    </div>
    <span className={cx(styles.toggle, { [styles.toggleActive]: value })} />
    <div
      className={styles.right}
      onClick={() => setValue(!value)}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
    >
      {optionRight && (
        <Text
          size="xs"
          weight="medium"
          color="metal50"
          className={cx(styles.option, { [styles.optionActive]: !value })}
        >
          {optionRight}
        </Text>
      )}
    </div>
  </label>
);
