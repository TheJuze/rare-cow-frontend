import { Text } from 'components';
import { TooltipProps } from './Tooltip';

export const tooltipPropsMocked: TooltipProps = {
  name: 'tooptip',
  target: <Text tag="span">Text with tooltip</Text>,
  content: <Text>tooltip</Text>,
  place: 'left',
};
