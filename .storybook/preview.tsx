import React, { CSSProperties, useCallback, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { addDecorator } from '@storybook/react';
import clsx from 'clsx';
// @ts-ignore
import styles from './styles.module.scss';

const MainDecorator = (story) => {
  const [islight, setIsLight] = useState(false);

  const handleSwitchTheme = useCallback(() => {
    setIsLight(!islight);
  }, [islight]);

  return (
    <>
      <button onClick={handleSwitchTheme}>Change theme</button>
      <div className={clsx(styles.app, { [styles.light]: islight })}>
        <Router>{story()}</Router>
      </div>
    </>
  );
};

addDecorator(MainDecorator);

export const parameters = { layout: 'fullscreen' };
