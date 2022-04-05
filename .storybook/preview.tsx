import React, { CSSProperties } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { addDecorator } from '@storybook/react';

const MainDecorator = (story) => {
  const styles: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={styles}>
      <Router>{story()}</Router>
    </div>
  );
};

addDecorator(MainDecorator);

export const parameters = { layout: 'fullscreen' };
