import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { addDecorator } from '@storybook/react';
import { BreakpointsProvider } from '../src/hooks/useBreakpoints';

import './main.scss';

const Decorator = (story) => (
  // <Provider store={store.store}>
  //   <Connector>
  <Router>
    <BreakpointsProvider>{story()}</BreakpointsProvider>
  </Router>
  //   </Connector>
  // </Provider>
);

addDecorator(Decorator);

export const parameters = { layout: 'fullscreen' };
