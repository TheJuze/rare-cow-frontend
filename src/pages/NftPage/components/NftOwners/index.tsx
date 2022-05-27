/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import { TabBar, Text } from 'components';
import React, { FC, useMemo, useState } from 'react';
import { Currency, Ownership, Property, TokenHistory } from 'types/api';
import { OwnerSeller, PropertyCard } from './components';
import { HistoryCard } from './components/HistoryCard';

import styles from './styles.module.scss';

type Props = {
  owners: Ownership[];
  properties: Property[];
  history: TokenHistory[];
  userId: string;
  nftId: string;
  currency: Currency;
  normalPrice: string;
};

const NftOwners: FC<Props> = ({
  owners,
  properties,
  history,
  userId,
  nftId,
  currency,
  normalPrice,
}) => {
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

  const { sellingOwners, notSellingOwners } = useMemo(() => {
    const selling = [];
    const notSelling = [];
    owners.forEach((owner) => {
      const isSelling = +owner.sellingQuantity > 0;
      const notUsers = userId !== String(owner.url);
      if (isSelling && notUsers) {
        selling.push(owner);
      } else {
        notSelling.push(owner);
      }
    });
    return { sellingOwners: selling, notSellingOwners: notSelling };
  }, [owners, userId]);

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
          {owners.length > 0 ? (
            <>
              {sellingOwners.map((owner) => (
                <OwnerSeller
                  normalPrice={normalPrice}
                  nftId={nftId}
                  currency={currency}
                  owner={owner}
                  isSelling
                />
              ))}
              {notSellingOwners.map((owner) => (
                <OwnerSeller
                  normalPrice={normalPrice}
                  nftId={nftId}
                  currency={currency}
                  owner={owner}
                />
              ))}
            </>
          ) : (
            <Text size="xs" color="light1">
              Nobody has this NFT
            </Text>
          )}
        </div>
      ) : null}
      {activeTab === 'properties' ? (
        <div className={styles.properties}>
          {properties?.length > 0 ? (
            properties.map((property) => <PropertyCard property={property} />)
          ) : (
            <Text size="xs" color="light1">
              NFT has no properties
            </Text>
          )}
        </div>
      ) : null}
      {activeTab === 'history' ? (
        <div className={styles.history}>
          {history.length > 0 ? (
            history.map((historyItem) => <HistoryCard historyItem={historyItem} />)
          ) : (
            <Text size="xs" color="light1">
              There is no history
            </Text>
          )}
        </div>
      ) : null}
    </div>
  );
};
export default NftOwners;
