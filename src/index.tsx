import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { combineProviders } from 'utils';
import { WalletConnectContext } from 'services';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/configureStore';

const CombinedProviders = combineProviders([
  WalletConnectContext,
  BrowserRouter,
  [PersistGate, { loading: null, persistor: store.persistor }],
  [Provider, { store: store.store }],
]);

const root = document.getElementById('root');
const app = (
  <CombinedProviders>
    <App />
  </CombinedProviders>
);

ReactDOM.render(app, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
