import React, { VFC } from 'react';

import cn from 'clsx';

import { Text } from 'components';

import { NavLink } from 'react-router-dom';
import { socials } from 'appConstants';
import { Logo } from 'assets/icons';
import s from './styles.module.scss';

export interface FooterProps {
  className?: string;
}

const mockedRoutes = [
  {
    link: '/privacy',
    name: 'Privacy Policy',
  },
  {
    link: '/terms',
    name: 'Terms of Service',
  },
];

export const Footer: VFC<FooterProps> = ({ className }) => (
  <footer className={cn(s.footer, className)}>
    <section className={s.container}>
      <hr className={s.line} />
      <div className={s.generalInfo}>
        <Logo className={s.logo} />
        <Text className={s.info} size="xs" color="darkDefault">
          We are happy to work with people who are inspired, curious and motivated to build the
          future with us! Join RareCow, we will help your creation stand out!
        </Text>
      </div>
      <div className={s.socials}>
        <a href="#id" target="_blank" referrerPolicy="no-referrer">
          <Text className={s.documents} color="accent">
            Documents
          </Text>
        </a>
        <div className={s.socialsItems}>
          {socials.map((social) => (
            <a href={social.src} referrerPolicy="no-referrer" className={s.socialsItem}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <hr className={s.line} />
      <div className={s.copyright}>
        <Text size="xs" color="darkDefault">
          Copyright © {new Date().getFullYear()} LLC. All rights reserved
        </Text>
        <div className={s.privacy}>
          {mockedRoutes.map((route) => (
            <NavLink to={route.link}>
              <Text size="xs" color="darkDefault">
                {route.name}
              </Text>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  </footer>
);
