import React from 'react';
import { H1, H2, H3 } from './Headings';
import Text from './Text';

export default {
  title: 'basic-components/Typography',
  component: Text,
  subcomponents: { H1, H2, H3 },
};

export const Default: React.FC = () => (
  <>
    <H1>H1 Headline 64 px | inter</H1>
    <H2>H2 Headline 32 px | inter</H2>
    <H3>H3 Headline 20 px | inter</H3>
    <Text size="l">Body L 18 px | inter</Text>
    <Text size="m">Body M 16 px | inter</Text>
    <Text size="s">Body S 14 px | inter</Text>
    <Text size="xs">Caption 12 px | inter</Text>
  </>
);
