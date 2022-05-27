import React, { VFC } from 'react';

import { Modal } from 'components';

import { Currency, Ownership } from 'types/api';

import styles from './styles.module.scss';
import { SellerCard } from './components';

type ISellersModal = {
  visible: boolean;
  onClose: () => void;
  sellers?: Ownership[];
  handleChooseSeller: (seller: Ownership, amount: string) => void;
  isMultiple?: boolean;
  currency: Currency;
};

const SellersModal: VFC<ISellersModal> = ({
  visible,
  onClose,
  sellers,
  handleChooseSeller,
  currency,
}) => (
  <Modal visible={visible} onClose={onClose} title={`Sellers (${sellers?.length})`}>
    <div className={styles.sellers}>
      {sellers?.length &&
          sellers.map((seller: Ownership) => (
            <SellerCard
              handleChooseSeller={handleChooseSeller}
              seller={seller}
              isMultiple={+seller.sellingQuantity > 1}
              currency={currency}
            />
          ))}
    </div>
  </Modal>
);

export default SellersModal;
