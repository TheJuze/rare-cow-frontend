/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Coming from 'assets/img/categoriesComing.png';

// import nftsSelector from 'store/nfts/selectors';

import cx from 'classnames';

import { Text } from 'components';

// import { routes } from 'appConstants';
// import { useShallowSelector } from 'hooks';

import styles from './styles.module.scss';
import { categories } from '../Trending';

type Props = {
  className?: string;
};

const Categories: FC<Props> = ({ className }) => {
  // const tags = useShallowSelector(nftsSelector.getProp('categories'));
  const tags = useMemo(() => {
    let copy = [...categories];
    while (copy.length < 8) {
      copy = [
        ...copy,
        {
          id: copy.length,
          name: '',
          image: Coming,
          tags: [],
        },
      ];
    }
    return copy;
  }, []);
  return (
    <div className={cx(styles.categories, className)}>
      <div className={styles.title}>
        <Text variant="heading-2" weight="bold" align="center" color="accent">
          Categories
        </Text>
      </div>
      <div className={styles.box}>
        {tags?.length ? (
          tags.map((tag: any) => {
            return tag.name ? (
              <Link className={styles.tag} to="/">
                <img alt="category" className={styles.image} src={tag.image} />
                <Text color="dark0" className={styles.text}>
                  {tag.name}
                </Text>
              </Link>
            ) : (
              <div className={styles.coming}>
                <div className={styles.comingImage}>
                  <img alt="category" className={styles.image} src={tag.image} />
                  <Text color="dark1" weight="semiBold" className={styles.comingText}>
                    Coming soon
                  </Text>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Categories;
