/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { VFC } from 'react';
import { Button, Text } from 'components';

import { routes } from 'appConstants';
import styles from './styles.module.scss';

interface INotFoundProps {}

const NotFound: VFC<INotFoundProps> = () => {
  return (
    <div className={styles.notFound}>
      <Text align="center" color="accent" weight="bold" className={styles.title}>
        404
      </Text>
      <Text align="center" weight="bold" color="darkDefault" className={styles.subtitle}>
        Page not found.
      </Text>
      <Text align="center" variant="body-2" className={styles.text}>
        Our apologies, this is almost certainly not the page you were looking for.
      </Text>
      <Button className={styles.button} to={routes.path}>
        <Text variant="body-2" color="light">
          Go to home page
        </Text>
      </Button>
    </div>
  );
};

export default NotFound;
