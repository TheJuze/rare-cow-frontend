/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState, VFC } from 'react';

import cn from 'clsx';

import { useClipboard } from 'hooks';
import { CopyIcon } from 'assets/icons/icons/components/Copy';
import { Text } from 'components';
import { Input, InputProps } from 'components/Input';
import styles from './styles.module.scss';

export interface CopyButtonProps {
  className?: string;
  value: string;
}

const CopyButton: VFC<CopyButtonProps> = ({ className, value }) => {
  const { copyStatus, copy } = useClipboard(value);
  const [statusText, setStatusText] = useState('copied!');

  const handleCopy = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    copy();
  }, [copy]);

  useEffect(() => {
    if (copyStatus !== 0) setStatusText(copyStatus === 1 ? 'copied!' : 'fail to copy');
  }, [copyStatus]);
  return (
    <button
      disabled={copyStatus !== 0}
      className={cn(styles['clipboard-wrapper__btn'], className)}
      type="button"
      onClick={handleCopy}
    >
      <CopyIcon className={styles['clipboard-icon']} />
      <Text
        className={cn(styles['clipboard-wrapper__btn-status'], {
          [styles['copy-out']]: copyStatus === 0,
          [styles['copy-fail']]: copyStatus === 2,
          [styles['copy-success']]: copyStatus === 1,
        })}
      >
        {statusText}
      </Text>
    </button>
  );
};

const Clipboard: VFC<InputProps> = (props) => {
  const { value } = props;
  return (
    <Input
      {...props}
      className={styles.input}
      classNameBody={styles.inputBody}
      endAdornment={<CopyButton value={value} />}
    />
  );
};

export default Clipboard;
