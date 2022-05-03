/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import BigNumber from 'bignumber.js';
import { Avatar, Button, TabBar, Text } from 'components';
import moment from 'moment';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { sliceString } from 'utils';

import styles from './styles.module.scss';

type Props = {
  owners: any;
  properties: any;
  history: any;
};

const NftOwners: FC<Props> = ({ owners, properties, history }) => {
  const options = useMemo(
    () => [
      {
        name: owners?.length > 1 ? 'Owners' : 'Owner',
        value: 'owner',
        redirect: false,
      },
      {
        name: 'Properties',
        value: 'properties',
        redirect: false,
      },
      {
        name: 'History',
        value: 'history',
        redirect: false,
      },
    ],
    [owners?.length],
  );
  const [activeTab, setActiveTab] = useState(options[0].value);

  const getMethod = useCallback((method: string) => {
    switch (method) {
      case 'Listing':
        return 'Listed';
      case 'Buy':
        return 'Bought';

      default:
        return `${method}ed`;
    }
  }, []);
  return (
    <div className={styles.nftOwners}>
      <TabBar
        options={options}
        activeTab={activeTab}
        onChange={setActiveTab}
        className={styles.tabs}
        tabClassName={styles.tab}
      />
      {activeTab === 'owner' ? (
        <div className={styles.owners}>
          {owners.map((owner) => (
            <div className={styles.owner}>
              <div className={styles.left}>
                <Avatar size={40} avatar={owner.avatar} id={owner.url} />
                <div className={styles.ownerInfo}>
                  <Text variant="body-2" color="dark" weight="semiBold">
                    {owner.display_name}
                  </Text>
                  <Text size="xs" color="metal400" tag="span">
                    {owner.quantity}/{owner.owned_tokens_count} on sale for{' '}
                    <Text size="xs" color="accent" weight="semiBold" tag="span">
                      {owner.price} {owner.currency.symbol}
                    </Text>{' '}
                    each
                  </Text>
                </div>
              </div>
              <Button size="sm">Buy</Button>
            </div>
          ))}
        </div>
      ) : null}
      {activeTab === 'properties' ? (
        <div className={styles.properties}>
          {properties.map((property) => (
            <div className={styles.property}>
              <Text variant="medium-body" weight="semiBold" color="light3">
                {property.trait_type}
              </Text>
              <Text size="xs" color="light1">
                {property.value}
              </Text>
            </div>
          ))}
        </div>
      ) : null}
      {activeTab === 'history' ? (
        <div className={styles.history}>
          {history.map((historyItem) => (
            <div className={styles.historyItem}>
              <Avatar
                size={40}
                avatar={historyItem.new_owner?.avatar || historyItem.old_owner?.avatar}
                id={historyItem.new_owner?.url || historyItem.old_owner?.url}
              />
              <div className={styles.historyItemInfo}>
                {historyItem.price ? (
                  <Text size="xs" color="light1">
                    {getMethod(historyItem.method)} for{' '}
                    <Text color="accent" size="xs" weight="semiBold" tag="span">
                      {new BigNumber(historyItem.price).toString()} {historyItem.currency.symbol}
                    </Text>
                  </Text>
                ) : (
                  <Text>{getMethod(historyItem.method)}</Text>
                )}
                <Text size="xs" color="light3">
                  by{' '}
                  <Text size="xs" color="light1" tag="span">
                    {sliceString(
                      historyItem.new_owner?.address || historyItem.old_owner?.address,
                      6,
                      4,
                    )}
                  </Text>{' '}
                  {moment().from(historyItem.date)}
                </Text>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default NftOwners;
