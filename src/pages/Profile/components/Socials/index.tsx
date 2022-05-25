import React, { VFC } from 'react';
import { Text } from 'components';
import {
  GlobeOutlinedIcon,
  InstagramOutlinedIcon,
  MailOutlinedIcon,
  TwitterOutlinedIcon,
} from 'assets/icons/icons';
import styles from './styles.module.scss';

interface ISocialsProps {
  hasSocials: boolean;
  email?: string;
  site?: string;
  twitter?: string;
  instagram?: string;
}

const Socials: VFC<ISocialsProps> = ({
  hasSocials,
  email,
  site,
  twitter,
  instagram,
}) => (hasSocials ?
  (
    <div className={styles.socials}>
      {email ? (
        <div className={styles.socialsItem}>
          <div className={styles.socialsIcon}>
            <MailOutlinedIcon />
          </div>
          <Text variant="body-2" color="base900">
            {email}
          </Text>
        </div>
      ) : null}
      {site ? (
        <div className={styles.socialsItem}>
          <div className={styles.socialsIcon}>
            <GlobeOutlinedIcon />
          </div>
          <Text variant="body-2" color="base900">
            {site}
          </Text>
        </div>
      ) : null}
      {twitter ? (
        <div className={styles.socialsItem}>
          <div className={styles.socialsIcon}>
            <TwitterOutlinedIcon />
          </div>
          <Text variant="body-2" color="base900">
            {twitter}
          </Text>
        </div>
      ) : null}
      {instagram ? (
        <div className={styles.socialsItem}>
          <div className={styles.socialsIcon}>
            <InstagramOutlinedIcon />
          </div>
          <Text variant="body-2" color="base900">
            {instagram}
          </Text>
        </div>
      ) : null}
    </div>
  ) : null);

export default Socials;
