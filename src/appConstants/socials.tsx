import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TwitterIcon,
} from 'assets/icons/icons';
import React, { ReactElement } from 'react';

type TSocials = {
  icon: ReactElement;
  src: string;
};

export const socials: TSocials[] = [
  {
    icon: <TelegramIcon />,
    src: 'https://telegram.org/',
  },
  {
    icon: <TwitterIcon />,
    src: 'https://twitter.com/',
  },
  {
    icon: <DiscordIcon />,
    src: 'https://discord.com/',
  },
  {
    icon: <FacebookIcon />,
    src: 'https://www.facebook.com/',
  },
  {
    icon: <InstagramIcon />,
    src: 'https://www.instagram.com/',
  },
];
