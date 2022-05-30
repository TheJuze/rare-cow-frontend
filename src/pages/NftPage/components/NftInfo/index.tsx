/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC, useCallback, useMemo, useState } from 'react';
import { BurnModal, Button, LikeButton, Text } from 'components';

import { Dots } from 'assets/icons/icons';
import { sliceString } from 'utils';
import { BurnButton } from 'components/BurnButton';
import { useModals } from 'hooks';
import { Modals } from 'types';
import { useDispatch } from 'react-redux';
import { burn } from 'store/nfts/actions';
import { useWalletConnectorContext } from 'services';
import styles from './styles.module.scss';

type Props = {
  name: string;
  id: string | number;
  description: string;
  likeCount: number;
  isLiked: boolean;
  isOwner: boolean;
  isMultiple: boolean;
  maxBurnAmount: number;
  canBurn: boolean;
};
const NftInfo: FC<Props> = ({
  name,
  id,
  description,
  likeCount,
  isLiked,
  isOwner,
  isMultiple,
  maxBurnAmount,
  canBurn,
}) => {
  const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
  const { modalType, closeModals, changeModalType } = useModals();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const isShowDots = useMemo(
    () => description.length > 120 && !isDescriptionOpened,
    [description.length, isDescriptionOpened],
  );
  const handleOpenDescription = useCallback(() => {
    setIsDescriptionOpened(!isDescriptionOpened);
  }, [isDescriptionOpened]);

  const onBurnHandler = useCallback(
    (amount: number | string) => {
      dispatch(
        burn({
          id,
          amount,
          web3Provider: walletService.Web3(),
        }),
      );
    },
    [dispatch, id, walletService],
  );

  const onBurnButtonClickHandler = useCallback(() => {
    changeModalType(Modals.Burn);
  }, [changeModalType]);

  const onPromoteClickHandler = useCallback(() => {
    changeModalType(Modals.Promote);
  }, [changeModalType]);

  return (
    <div className={styles.nftInfo}>
      <BurnModal
        visible={modalType === Modals.Burn}
        isMultiple={isMultiple}
        onClose={closeModals}
        onBurn={onBurnHandler}
        maxBurnAmount={maxBurnAmount}
      />
      <div className={styles.nftInfoTop}>
        <Text variant="subtitle-1" color="dark">
          {name}
        </Text>
        <div className={styles.actionButtons}>
          {isOwner && canBurn && (
            <div className={styles.actionItem}>
              <BurnButton onBurn={onBurnButtonClickHandler} />
            </div>
          )}
          <div className={styles.actionItem}>
            <LikeButton nftId={String(id)} likesCount={likeCount} isLiked={isLiked} />
          </div>
          {isOwner && <Button onClick={onPromoteClickHandler}>Promote</Button>}
        </div>
      </div>
      <Text variant="body-2" color="metal800">
        Id: {id}
      </Text>
      {description.length > 0 && (
        <div className={styles.nftInfoDescription}>
          <Text variant="body-2" color="metal800">
            {isDescriptionOpened ? description : sliceString(description, 120, 0)}
          </Text>
          {isShowDots && (
            <div className={styles.dots} onClick={handleOpenDescription}>
              <Dots />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default NftInfo;
