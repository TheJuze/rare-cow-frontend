import {
  routes, standards, standardsMap,
} from 'appConstants';
import React, { useCallback, useMemo, VFC } from 'react';

import { Text } from 'components';
import { ICreateCollection } from 'types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userSelector from 'store/user/selectors';
import { useShallowSelector } from 'hooks';
import { createCollection } from 'store/collections/actions';
import { useWalletConnectorContext } from 'services';
import nftSelector from 'store/nfts/selectors';
import { CreateCollectionForm } from './Form';
import styles from './styles.module.scss';

const CreateCollection: VFC = () => {
  const { type } = useParams();

  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));
  const { amount: feeAmount } = useShallowSelector(nftSelector.getProp('fees'));
  const { walletService } = useWalletConnectorContext();
  const navigator = useNavigate();

  const initialValues = useMemo<ICreateCollection>(
    () => ({
      name: '',
      description: '',
      media: null,
      mediaURL: null,
      type:
        (Object.entries(standardsMap).filter(
          ([, value]) => value.toLowerCase() === type,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        )?.[0][0] as any) || standards[0],
      symbol: '',
    }),
    [type],
  );

  const handleSubmit = useCallback(
    async (values: ICreateCollection) => new Promise((resolve) => {
      const newCollectionForm = new FormData();
      newCollectionForm.append('standart', values.type);
      newCollectionForm.append('name', values.name);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let avatar: any = '';
      if (values.media) {
        avatar = values.media;
      }
      newCollectionForm.append('avatar', avatar);
      newCollectionForm.append('description', values.description);
      newCollectionForm.append('symbol', values.symbol);
      dispatch(
        createCollection({
          collection: newCollectionForm,
          network: chain,
          web3Provider: walletService.Web3(),
          onEnd: () => resolve(null),
          onSuccess: () => navigator(routes.nest.create
            .nest[standardsMap[values.type].toLowerCase()]
            .path),
        }),
      );
    }),
    [chain, dispatch, navigator, walletService],
  );

  return (
    <section className={styles.create}>
      <div className={styles.createHeader}>
        <Text color="dark0" variant="subtitle-1">
          Create a collection
        </Text>
        <div className={styles.createHeaderMintingFee}>
          <Text variant="body-2" color="accent">
            Minting fee is {feeAmount} %
          </Text>
        </div>
        <div>
          <CreateCollectionForm formValues={initialValues} handleSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  );
};

export default CreateCollection;
