import { FormEvent, ReactElement, useCallback, useEffect, useState, VFC } from 'react';

import cn from 'clsx';
// import { Input } from 'components';

import { AddIcon, RemoveIcon } from 'assets/icons/icons';
import styles from './styles.module.scss';

interface IQuantityOption {
  type: 'add' | 'remove';
  onClick: (e: FormEvent) => void;
  className: string;
}

const QuantityOption: VFC<IQuantityOption> = ({ type, onClick, className }) => {
  return (
    <button className={cn(styles['add-remove-button'], className)} type="button" onClick={onClick}>
      {type === 'add' ? (
        <AddIcon className={styles['add-remove-button-icon']} />
      ) : (
        <RemoveIcon className={styles['add-remove-button-icon']} />
      )}
    </button>
  );
};

export interface QuantityInputProps {
  name: string;
  value: string;
  setValue: (value: string) => void;
  maxAmount?: number | 'infinity';
  minAmount?: number;
  label?: string | ReactElement;
  error?: string;
  writeable?: boolean;
  placeholder?: string;
  inputClassName?: string;
  maxCounterWidth?: string;
  onBlur?: (e: FormEvent) => void;
}

export const QuantityInput: VFC<QuantityInputProps> = ({
  value,
  // name,
  // label,
  // error,
  // placeholder,
  setValue = () => {},
  // writeable = true,
  maxAmount = 'infinity',
  minAmount = 0,
  // inputClassName,
  // maxCounterWidth = '50%',
  onBlur,
}) => {
  const [formattedValue, setFormattedValue] = useState('01');
  const checkRange = useCallback(
    (val: number) => {
      if (maxAmount !== 'infinity') {
        if (val <= maxAmount && val >= minAmount) {
          return true;
        }
      } else if (val >= minAmount) {
        return true;
      }
      return false;
    },
    [maxAmount, minAmount],
  );

  // const onQuantityChanged = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     const val = e.target.value;
  //     if (writeable) {
  //       if (Number.isFinite(+val) && !val.includes('.')) {
  //         if (val.length !== 0) {
  //           if (checkRange(+val)) {
  //             setValue(String(+val));
  //           }
  //         } else {
  //           setValue(String(+val));
  //         }
  //       }
  //     }
  //   },
  //   [checkRange, setValue, writeable],
  // );

  const onAddHandler = useCallback(
    (e: FormEvent) => {
      const nValue = +value;
      if (checkRange(nValue + 1)) {
        onBlur?.(e);
        setValue(String(nValue + 1));
      }
    },
    [checkRange, onBlur, setValue, value],
  );

  const onRemoveHandler = useCallback(
    (e: FormEvent) => {
      const nValue = +value;
      if (checkRange(nValue - 1)) {
        onBlur?.(e);
        setValue(String(nValue - 1));
      }
    },
    [checkRange, onBlur, setValue, value],
  );

  useEffect(() => {
    if (value.length === 1) {
      setFormattedValue(`0${value}`);
      return;
    }
    setFormattedValue(value);
  }, [value]);

  return (
    <div className={styles.quantityInput}>
      <QuantityOption type="remove" onClick={onRemoveHandler} className={styles.remove} />
      <div className={styles.amount}>{formattedValue}</div>
      <QuantityOption type="add" onClick={onAddHandler} className={styles.add} />
    </div>
  );
};
