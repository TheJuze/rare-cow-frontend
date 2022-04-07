import { DropdownProps } from './Dropdown';

const options = [
  { value: 'Text input', symbol: 'text' },
  { value: 'Text input2', symbol: 'text2' },
  { value: 'Text input3', symbol: 'text3' },
];

export const dropdownPropsMocked: DropdownProps = {
  options,
  value: options[0].symbol,
  setValue: () => {},
};
