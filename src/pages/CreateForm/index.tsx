import { fees, standardsMap, TStandards } from 'appConstants';
import { Text, FileUploader } from 'components';
import React, { useMemo, VFC } from 'react';
import { TProperty } from 'types';
import { Category } from 'types/api/Category';
import { Collection } from 'types/api/Collection';

import styles from './styles.module.scss';

interface ICreatePage {
  createType: TStandards;
}

export interface ICreateForm {
  type: TStandards;
  name: string;
  description: string;
  category: Category | null;
  properties: TProperty[];
  withCollection: boolean;
  collections: Collection[];
  media: File[] | null;
  preview: File[] | null;
  quantity: string;
}

const CreatePage: VFC<ICreatePage> = ({ createType }) => {
  const initialValues = useMemo(() => ({
    name: '',
  }), []);

  console.log(initialValues);
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
        <FileUploader />
      </div>
    </section>
  );
};

export default CreatePage;
