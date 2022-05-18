import React, { FC, useCallback, useEffect } from 'react';

import { Layout, RouteManager as Router } from 'containers';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/index.scss';
import { useDispatch } from 'react-redux';
import { getCategories } from 'store/nfts/actions';
// import { WalletConnectContext } from 'services';

const App: FC = () => {
  const dispatch = useDispatch();

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);
  return (
    <>
      <ToastContainer autoClose={4000} hideProgressBar position="top-right" closeButton={false} />
      <Layout>
        <Router />
      </Layout>
    </>
  );
};
export default App;
