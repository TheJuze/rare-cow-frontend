import { fees } from 'appConstants';
import { Text, FileUploader } from 'components';
import React, { VFC } from 'react';
import { useParams } from 'react-router-dom';

import styles from './styles.module.scss';

const CreatePage: VFC = () => {
  const { create_type: createType } = useParams();
  return (
    <section className={styles.create}>
      <div className={styles.createHeader}>
        <Text variant="subtitle-1">{createType} NFT</Text>
        <div className={styles.createHeaderMintingFee}>Minting fee is {fees.minting} %</div>
      </div>
      <div>
        <FileUploader />
      </div>
    </section>
  );
};

export default CreatePage;
