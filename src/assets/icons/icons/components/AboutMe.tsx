import React from 'react';

import { IconProps } from '../icons.types';

import { BaseSVGIcon } from './BaseSVGIcon';

export const AboutMe: React.FC<IconProps> = (props) => (
  <BaseSVGIcon width="20" height="20" fill="transparent" viewBox="0 0 20 20" {...props}>
    <path
      d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12C4.81933 12 2.13414 14.1214 1.28208 17.0264C0.971198 18.0863 1.89543 19 3 19H13C14.1046 19 15.0288 18.0863 14.7179 17.0264C13.8659 14.1214 11.1807 12 8 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseSVGIcon>
);
