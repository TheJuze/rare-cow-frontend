import { OptionSelectorProps } from './OptionSelector';

export const optionSelectorPropsMocked: OptionSelectorProps = {
  options: [
    { value: '1', content: 'selected' },
    { value: '2', content: 'disabled', disabled: true },
    { value: '3', content: 'default' },
  ],
  selected: { value: '1', content: 'selected' },
  name: 'selector-group',
  setSelected: () => {},
  dir: 'vertical',
};
