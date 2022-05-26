/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, { FC, useCallback, useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { getTopCollections } from 'store/collections/actions';
import { clearTopCollections } from 'store/collections/reducer';
import collectionsSelector from 'store/collections/selectors';

import cx from 'classnames';

import { Text, CollectionsList } from 'components';

import { useShallowSelector } from 'hooks';

import userSelector from 'store/user/selectors';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const TopCollections: FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));
  const collections = useShallowSelector(collectionsSelector.getProp('topCollections'));

  const withoutDefault = useMemo(
    () => collections.filter((c: any) => !c.collection.isDefault),
    [collections],
  );

  const handleFetchTopCollections = useCallback(() => {
    dispatch(getTopCollections({ network: chain }));
  }, [chain, dispatch]);

  useEffect(() => {
    handleFetchTopCollections();
  }, [handleFetchTopCollections]);

  useEffect(
    () => () => {
      dispatch(clearTopCollections());
    },
    [dispatch],
  );

  return (
    <div className={cx(styles.topCollections, className)}>
      <Text
        variant="heading-2"
        color="accent"
        weight="bold"
        className={styles.title}
        align="center"
      >
        Top collections
      </Text>
      {withoutDefault.length ? (
        <div className={styles.collections}>
          <CollectionsList collections={withoutDefault} columns={3} />
        </div>
      ) : (
        <Text className={styles.noItems}>There are no collections</Text>
      )}
    </div>
  );
};

export default TopCollections;
