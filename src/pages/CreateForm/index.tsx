import { fees, standardsMap, TStandards } from 'appConstants';
import { Text, FileUploader } from 'components';
import React, { VFC } from 'react';

import styles from './styles.module.scss';

interface ICreatePage {
  createType: TStandards;
}

const CreatePage: VFC<ICreatePage> = ({ createType }) => (
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

export default CreatePage;
