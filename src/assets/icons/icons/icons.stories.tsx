import React, { FC, ReactNode } from 'react';

import forEach from 'lodash/forEach';

import { Text } from '../../../components';
// import { IconProps } from './icons.types';

import * as allIcons from '.';

export default {
  title: 'theme/Icons',
};

interface IconVariantsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
}

const IconVariants: FC<IconVariantsProps> = ({ Icon }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <Text>{Icon.displayName}</Text>
    <div
      style={{
        display: 'flex',
        border: '1px solid lightgray',
        margin: 10,
        textAlign: 'center',
        padding: 5,
      }}
    >
      <Icon />
      <div>
        <Icon />
      </div>
    </div>
  </div>
);

export const Icons: FC = () => {
  const content: ReactNode[] = [];
  forEach(allIcons, (icon, index) => {
    content.push(<IconVariants key={index} Icon={icon} />);
  });
  return <div>{content}</div>;
};
