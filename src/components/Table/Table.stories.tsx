import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Table } from './Table';
import { simpleTablePropsMocked } from './Table.mock';

export default {
  title: 'basic-components/table/SimpleTable',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => (
  <>
    <Table {...args} />
  </>
);
export const Default = Template.bind({});

Default.args = simpleTablePropsMocked;
