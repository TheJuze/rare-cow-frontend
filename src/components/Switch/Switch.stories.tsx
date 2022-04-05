import { useState } from '@storybook/addons';
import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { noop } from 'lodash';

import { Switch } from './Switch';
import { switchPropsMocked } from './Switch.mock';

export default {
  title: 'basic-components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Switch checked={checked} onChange={() => setChecked(!checked)} />
      {/* <Switch size="sm" checked={checked} onChange={() => setChecked(!checked)} />
      <Switch variant="secondary" checked={checked} onChange={() => setChecked(!checked)} />
      <Switch variant="secondary" size="sm" checked={checked} onChange={() => setChecked(!checked)} /> */}
    </>
  );
};
export const Default = Template.bind({});

Default.args = switchPropsMocked;
