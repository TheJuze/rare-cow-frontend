import React, { VFC } from 'react';

import cn from 'classnames';

import s from './styles.module.scss';

export type TImagePreview = {
  src: string;
  className?: string;
  title?: string;
  alt?: string;
  cover?: 'cover' | 'contain';
};

export const ImagePreview: VFC<TImagePreview> = ({
  src,
  className,
  title = '',
  alt = '',
  cover = 'cover',
}) => (
  <div className={cn(s.imageContainer, className)}>
    <img
      src={src}
      className={cn(s.image, s[cover])}
      alt={alt || 'preview'}
      title={title}
    />
  </div>
);
