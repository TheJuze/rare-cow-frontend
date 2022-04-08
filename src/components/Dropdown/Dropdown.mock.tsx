import { TDropdownValue } from 'types';
import { DropdownProps } from './Dropdown';

const options: TDropdownValue[] = [
  { id: '1', content: 'Text1' },
  { id: '2', content: 'Text2' },
  { id: '3', content: 'Text3' },
];

export const dropdownPropsMocked: DropdownProps = {
  options,
  value: options[0],
  setValue: () => {},
  closeOnSelect: false,
  name: 'dropdown',
  variant: 'transparent',
  dropPosition: 'relative',
  disabled: false,
  withSearch: false,
  isSearching: false,
};
