/* eslint-disable no-return-assign */
/* eslint-disable no-confusing-arrow */
import { maxSizeUnit, TMaxSize } from 'appConstants';

const byteSize = (maxSize: TMaxSize): number => {
  const { unit, size } = maxSize;
  const units = maxSizeUnit;
  const unitIdx = units.findIndex((u) => u === unit);
  return units.slice(1, unitIdx).reduce((a) => (a * 1024), size);
};

export default byteSize;
