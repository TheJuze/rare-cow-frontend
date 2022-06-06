import React, { useCallback, useEffect, VFC } from 'react';

import cn from 'clsx';

import { useShallowSelector } from 'hooks';
import nftSelector from 'store/nfts/selectors';
import { useDispatch } from 'react-redux';
import { getPremium } from 'store/nfts/actions';
import { NftList } from 'components/NftList/NftList';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';

export interface PromotedTokensProps {
  className?: string;
}

export const PromotedTokens: VFC<PromotedTokensProps> = ({ className }) => {
  const dispatch = useDispatch();
  const nfts = useShallowSelector(nftSelector.getProp('premium'));
  const { [actionTypes.GET_PREMIUM]: getNftsRequestStatus } = useShallowSelector(uiSelector.getUI);

  const handleFetchPremium = useCallback(() => {
    dispatch(getPremium());
  }, [dispatch]);

  useEffect(() => {
    handleFetchPremium();
  }, [handleFetchPremium]);
  return (
    <div className={cn(styles.promotedTokens, className)}>
      <NftList
        nfts={nfts}
        currentPage={1}
        isLoading={getNftsRequestStatus === RequestStatus.REQUEST}
      />
    </div>
  );
};
