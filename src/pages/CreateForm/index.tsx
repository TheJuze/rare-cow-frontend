import {
  createDynamicLink,
  currencies,
  getExtension,
  getFileGroup,
  routes,
  standardsMap,
  TAvailableExtensions,
  TStandards,
} from 'appConstants';
import BigNumber from 'bignumber.js';
import { Text } from 'components';
import { MATIC_ADDRESS } from 'config';
import { useShallowSelector } from 'hooks';
import React, {
  useCallback, useEffect, useMemo, VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWalletConnectorContext } from 'services';
import { createToken, getCategories, getFeeInfo } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';
import { getSelfCollections } from 'store/user/actions';
import userSelector from 'store/user/selectors';
import { ICreateForm } from 'types';
import cn from 'clsx';
import { CreateNFTForm } from './Form';

import styles from './styles.module.scss';

interface ICreatePage {
  createType: TStandards;
}

const CreatePage: VFC<ICreatePage> = ({ createType }) => {
  const collections = useShallowSelector(userSelector.getProp('collections'));

  const initialValues = useMemo<ICreateForm>(
    () => ({
      name: '',
      type: createType,
      description: '',
      category: null,
      properties: [],
      collection: {
        withCollection: false,
        collections: null,
      },
      media: null,
      preview: null,
      quantity: '1',
      listing: {
        listNow: false,
        price: '',
        listType: 'Price',
        timestamp: 0,
        currency: currencies[0],
        amount: '0',
      },
    }),
    [createType],
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chain = useShallowSelector(userSelector.getProp('chain'));
  const id = useShallowSelector(userSelector.getProp('id'));
  const { MATIC: userMaticBalance } = useShallowSelector(userSelector.getProp('balance'));
  const { amount: feeAmount } = useShallowSelector(nftSelector.getProp('fees'));
  const { walletService } = useWalletConnectorContext();

  useEffect(() => {
    dispatch(getFeeInfo({ web3Provider: walletService.Web3(), standard: createType }));
  }, [createType, dispatch, walletService]);

  const handleSubmit = useCallback(
    async (values: ICreateForm) => new Promise((resolve) => {
      const newTokenForm = new FormData();
      newTokenForm.append('name', values.name);
      newTokenForm.append('tags', String(values.category.id));
      newTokenForm.append('description', values.description);
      if (values.properties.length !== 0) {
        newTokenForm.append(
          'details',
          JSON.stringify(
            values.properties
              .filter((p) => p.name && p.type)
              .map((p, k) => ({
                display_type: 'properties',
                trait_type: `${p.name}.${k}`,
                value: p.type,
              })),
          ),
        );
      }
      if (values.media && values.media[0]) {
        newTokenForm.append('media', values.media[0]);
        newTokenForm.append(
          'format',
          getFileGroup(getExtension(values.media[0].name) as TAvailableExtensions) || 'image',
        );
      }
      if (values.preview && values.preview[0]) {
        newTokenForm.append('cover', values.preview[0]);
      }
      newTokenForm.append('total_supply', values.quantity);
      const defaultCollection = collections.find(
        (collection) => collection.isDefault && collection.standart === createType,
      );
      const selectedCollection = values.collection.collections?.[0];
      newTokenForm.append(
        'collection',
        selectedCollection ? selectedCollection.url : defaultCollection.url,
      );
      newTokenForm.append('fee_address', MATIC_ADDRESS);
      dispatch(
        createToken({
          token: newTokenForm,
          web3: walletService.Web3(),
          fee: +feeAmount,
          listingInfo: values.listing,
          onEnd: () => resolve(null),
          onSuccess:
          () => navigate(createDynamicLink(routes.nest.profile.nest.owned.path, { userId: id })),
        }),
      );
    }),
    [collections, createType, dispatch, feeAmount, id, navigate, walletService],
  );

  useEffect(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSelfCollections({ network: chain }));
  }, [chain, dispatch]);

  const canMint = useMemo(
    () => new BigNumber(userMaticBalance).gte(feeAmount),
    [feeAmount, userMaticBalance],
  );

  return (
    <section className={styles.create}>
      <div className={styles.createHeader}>
        <Text color="dark0" variant="subtitle-1">
          {standardsMap[createType]} NFT
        </Text>
        <div className={styles.createHeaderMintingFee}>
          <Text variant="body-2" color="accent" weight="semiBold">
            Minting fee is {feeAmount} MATIC
          </Text>
        </div>
      </div>
      <div className={cn(styles.form, { [styles.disabled]: !canMint })}>
        <CreateNFTForm
          type={createType}
          collections={collections}
          formValues={initialValues}
          handleSubmit={handleSubmit}
        />
        {!canMint && (
          <div className={styles.overlay}>
            <Text variant="heading-2" color="accent">
              You don&apos;t have enough MATIC for fee
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatePage;
