import React, { FC } from 'react';

import { Layout, RouteManager as Router } from 'containers';
import { ToastContainer } from 'react-toastify';
import { BreakpointsProvider } from 'hooks/useBreakpoints';

import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/index.scss';
import { WalletConnectContext } from 'services';

const App: FC = () => (
  <BreakpointsProvider>
    <WalletConnectContext>
      <ToastContainer autoClose={4000} hideProgressBar position="top-right" closeButton={false} />
      <Layout>
        <Router />
      </Layout>
    </WalletConnectContext>
  </BreakpointsProvider>
);
export default App;
