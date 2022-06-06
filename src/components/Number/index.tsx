import BigNumber from 'bignumber.js';
import React, { FC, useMemo } from 'react';

interface INumber{
  decimalPlaces?: number;
  children: string;
}

export const NumberText:FC<INumber> = ({ decimalPlaces = 5, children }) => {
  const editedNumber = useMemo(() => {
    let initialNumber = new BigNumber(children);
    if(decimalPlaces) {
      initialNumber = initialNumber.decimalPlaces(decimalPlaces);
    }
    return initialNumber.toString();
  }, [children, decimalPlaces]);
  return <>{editedNumber}</>;
};
