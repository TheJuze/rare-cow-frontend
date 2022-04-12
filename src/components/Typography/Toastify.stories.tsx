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
    <Text variant="display-1">Display 1</Text>
    <Text variant="heading-1">Heading 1</Text>
    <Text variant="heading-2">Heading 2</Text>
    <Text variant="subtitle-1">Subtitle 1</Text>
    <Text variant="body-1">Body 1</Text>
    <Text variant="body-2">Body 2</Text>
    <Text variant="medium-body">Medium body</Text>
    <Text size="l">L</Text>
    <Text size="m">M</Text>
    <Text size="s">S</Text>
    <Text size="xs">XS</Text>

    <H1>H1 Headline</H1>
    <H2>H2 Headline</H2>
    <H3>H3 Headline</H3>
  </>
);
