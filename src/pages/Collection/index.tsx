/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { useShallowSelector } from 'hooks';
import React, {
  useCallback, useEffect, useState, VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import actionTypes from 'store/nfts/actionTypes';
import nftSelector from 'store/nfts/selectors';
import collectionsSelector from 'store/collections/selectors';
import uiSelector from 'store/ui/selectors';

import userSelector from 'store/user/selectors';
import { GetSingleCollectionReq } from 'types/requests';
import { searchSingleCollection } from 'store/collections/actions';
import { searchNfts } from 'store/nfts/actions';
import { clearCollections } from 'store/collections/reducer';
import { clearNfts } from 'store/nfts/reducer';
import { RequestStatus } from 'types';
import collectionsActionTypes from 'store/collections/actionTypes';
import { Body, Header } from './components';
import styles from './styles.module.scss';

const Collection: VFC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const nfts = useShallowSelector(nftSelector.getProp('nfts'));
  const totalPages = useShallowSelector(nftSelector.getProp('totalPages'));
  const {
    [actionTypes.SEARCH_NFTS]: fetchingNfts,
    [collectionsActionTypes.SEARCH_SINGLE_COLLECTION]: fetchingCollection,
  } = useShallowSelector(uiSelector.getUI);
  const collection = useShallowSelector(collectionsSelector.getProp('singleCollection'));
  const chain = useShallowSelector(userSelector.getProp('chain'));

  const handleSearchCollection = useCallback(() => {
    const requestData: GetSingleCollectionReq = { id: String(id), network: chain };
    dispatch(searchSingleCollection(requestData));
  }, [chain, id, dispatch]);

  const fetchNfts = useCallback(
    (page: number, shouldConcat = false) => {
      dispatch(
        searchNfts({
          requestData: { type: 'items', page, collections: String(id) },
          shouldConcat,
        }),
      );
    },
    [id, dispatch],
  );

  useEffect(() => {
    handleSearchCollection();
    setCurrentPage(1);
    fetchNfts(1);
  }, [dispatch, fetchNfts, handleSearchCollection]);

  const onLoadMoreClick = useCallback(
    (page: number | number) => {
      fetchNfts(page, true);
      setCurrentPage(page);
    },
    [fetchNfts],
  );

  useEffect(
    () => () => {
      dispatch(clearCollections());
    },
    [dispatch],
  );

  useEffect(
    () => () => {
      dispatch(clearNfts());
    },
    [dispatch],
  );

  return (
    <div className={styles.collection}>
      <Header collection={collection} isLoading={fetchingCollection === RequestStatus.REQUEST} id={id} />
      <Body
        nfts={nfts}
        currentPage={currentPage}
        totalPages={totalPages}
        isNftsLoading={fetchingNfts === RequestStatus.REQUEST}
        onLoadMoreClick={onLoadMoreClick}
      />
    </div>
  );
};

export default Collection;
