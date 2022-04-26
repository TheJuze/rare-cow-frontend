import { fees, standardsMap, TStandards } from 'appConstants';
import { Text } from 'components';
import React, { useCallback, useMemo, VFC } from 'react';
import { ICreateForm } from 'types';
import { CreateNFTForm } from './Form';

import styles from './styles.module.scss';

interface ICreatePage {
  createType: TStandards;
}

const CreatePage: VFC<ICreatePage> = ({ createType }) => {
  const initialValues = useMemo<ICreateForm>(
    () => ({
      name: '',
      type: createType,
      description: '',
      category: null,
      properties: [],
      collections: {
        withCollection: false,
        collections: null,
      },
      media: null,
      preview: null,
      quantity: '1',
      listing: {
        listNow: false,
        price: '',
        listType: 0,
        timestamp: 0,
      },
    }),
    [createType],
  );

  const handleSubmit = useCallback((values: ICreateForm) => {
    console.log(values);
  }, []);

  return (
    <section className={styles.create}>
      <div className={styles.createHeader}>
        <Text color="dark0" variant="subtitle-1">
          {standardsMap[createType]} NFT
        </Text>
        <div className={styles.createHeaderMintingFee}>
          <Text variant="body-2" color="accent">
            Minting fee is {fees.minting} %
          </Text>
        </div>
      </div>
      <div>
        <CreateNFTForm formValues={initialValues} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default CreatePage;
