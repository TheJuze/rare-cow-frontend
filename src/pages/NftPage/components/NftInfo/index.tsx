/* eslint-disable object-curly-newline */
/* eslint-disable arrow-body-style */
import React, { FC, useCallback, useMemo, useState } from 'react';
import { BurnModal, Button, LikeButton, Text } from 'components';

import { Dots, LightningIcon } from 'assets/icons/icons';
import { sliceString } from 'utils';
import { BurnButton } from 'components/BurnButton';
import { useModals } from 'hooks';
import { Modals } from 'types';
import { useDispatch } from 'react-redux';
import { burn } from 'store/nfts/actions';
import { useWalletConnectorContext } from 'services';
import { setModalProps } from 'store/modals/reducer';
import { Promotion } from 'types/api';
import styles from './styles.module.scss';
import { PromotionStatusBar } from './components';

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
  promotionInfo: Promotion;
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
  promotionInfo,
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
      dispatch(
        setModalProps({
          onSendAgain: () => onBurnHandler(amount),
          onTryAgain: () => onBurnHandler(amount),
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
        <div className={styles.nftInfoTopName}>
          <Text className={styles.nftInfoTopNameTitle} variant="subtitle-1" color="dark">
            {name}
          </Text>
          <Text variant="body-2" color="metal800">
            Id: {id}
          </Text>
        </div>
        <div className={styles.actionButtons}>
          {isOwner && canBurn && (
            <div className={styles.actionItem}>
              <BurnButton onBurn={onBurnButtonClickHandler} />
            </div>
          )}
          <div className={styles.actionItem}>
            <LikeButton nftId={String(id)} likesCount={likeCount} isLiked={isLiked} />
          </div>
          {isOwner && (
            <div className={styles.actionItem}>
              <Button
                className={styles.promote}
                startAdornment={<LightningIcon />}
                onClick={onPromoteClickHandler}
              >
                Promote
              </Button>
            </div>
          )}
        </div>
      </div>
      <PromotionStatusBar promotionInfo={promotionInfo} />
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
