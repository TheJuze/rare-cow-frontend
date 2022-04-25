import React, { VFC } from 'react';

import cn from 'clsx';

import { Text } from 'components';

import { NavLink } from 'react-router-dom';
import { socials } from 'appConstants';
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
        <Text color="dark" tag="span" size="m" weight="bold">
          Rare
          <Text tag="span" size="m" weight="bold" color="accent">
            Cow
          </Text>
        </Text>
        <Text className={s.info} size="xs" color="dark">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book.
        </Text>
      </div>
      <div className={s.socials}>
        <a href="#id" target="_blank" referrerPolicy="no-referrer">
          <Text className={s.documents} color="dark">Documents</Text>
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
        <Text size="xs" color="dark">
          Copyright © {new Date().getFullYear()} LLC. All rights reserved
        </Text>
        <div className={s.privacy}>
          {mockedRoutes.map((route) => (
            <NavLink to={route.link}>
              <Text size="xs" color="dark">
                {route.name}
              </Text>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  </footer>
);
