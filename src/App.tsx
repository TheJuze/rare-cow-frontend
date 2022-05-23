import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';

import { Layout, Modals, RouteManager as Router } from 'containers';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/index.scss';
import { useDispatch } from 'react-redux';
import { getCategories } from 'store/nfts/actions';
import { getRates } from 'store/rates/actions';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { Chains } from 'types';

const pollDelay = 60 * 1000;

const App: FC = () => {
  const pollingTimer = useRef<NodeJS.Timer | null>(null);
  const dispatch = useDispatch();

  const userNetwork = useShallowSelector(userSelector.getProp('chain'));

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  const handleGetRates = useCallback(() => {
    dispatch(getRates({ network: userNetwork || Chains.polygon }));
  }, [dispatch, userNetwork]);

  const pollingRequests = useCallback(() => {
    handleGetRates();
  }, [handleGetRates]);

  useEffect(() => {
    handleGetCategories();
    if(!pollingTimer.current) {
      pollingTimer.current = setInterval(() => pollingRequests(), pollDelay);
    }
    return () => {
      if(pollingTimer.current) {
        clearInterval(pollingTimer.current);
        pollingTimer.current = null;
      }
    };
  }, [handleGetCategories, pollingRequests]);
  return (
    <>
      <ToastContainer autoClose={4000} hideProgressBar position="top-right" closeButton={false} />
      <Layout>
        <Router />
        <Modals />
      </Layout>
    </>
  );
};
export default App;
