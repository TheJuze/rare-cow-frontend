import { createDynamicLink, routes } from 'appConstants';
import { CollectionSVG, MultipleSVG, SingleSVG } from 'assets/icons/icons';
import React, { ReactElement, useMemo, VFC } from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from 'components';
import cn from 'classnames';
import styles from './styles.module.scss';

interface ICreateLinkCard {
  icon: ReactElement;
  title: string;
  link: string;
  withAnimation?: boolean;
}

const CreateLinkCard: VFC<ICreateLinkCard> = ({
  icon, title, link, withAnimation = true,
}) => (
  <div className={styles.createCardContainer}>
    <NavLink
      className={cn(styles.createCardWrapper, { [styles.withAnimation]: withAnimation })}
      to={link}
    >
      <div className={styles.createCardWrapperIcon}>{icon}</div>
      <Text className={styles.createCardWrapperTitle}>{title}</Text>
    </NavLink>
  </div>
);

const Create: VFC = () => {
  const createOptions = useMemo(
    () => [
      {
        icon: <SingleSVG />,
        title: 'Single NFT',
        link: routes.nest.create.nest.single.path,
      },
      {
        icon: <MultipleSVG />,
        title: 'Multiple NFT',
        link: routes.nest.create.nest.multiple.path,
      },
      {
        icon: <CollectionSVG />,
        title: 'Collection NFT',
        link: createDynamicLink(routes.nest.create.nest.collection.path, { type: 'single' }),
      },
    ],
    [],
  );
  return (
    <div className={styles.wrapper}>
      <Text className={styles.title} variant="subtitle-1" color="dark0">
        Create Nft
      </Text>
      <div className={styles.body}>
        {createOptions.map((card) => (
          <CreateLinkCard {...card} />
        ))}
      </div>
    </div>
  );
};

export default Create;
