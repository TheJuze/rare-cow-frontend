import React, { useMemo, VFC } from 'react';
import { Property } from 'types/api';
import { Text } from 'components';
import styles from '../styles.module.scss';

interface IPropertyCard{
  property: Property
}

export const PropertyCard: VFC<IPropertyCard> = ({ property }) => {
  const normalizeTraitType = useMemo(() => property?.traitType?.split('.')[0], [property]);
  return(
    <div className={styles.property}>
      <Text variant="medium-body" weight="semiBold" color="light3">
        {normalizeTraitType}
      </Text>
      <Text size="xs" color="light1">
        {property.value}
      </Text>
    </div>
  );
};
