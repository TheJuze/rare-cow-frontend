import React, { VFC } from 'react';

import cn from 'classnames';

import s from './styles.module.scss';
import { ImagePreview } from './ImagePreview';

export type TAudioPreview = {
  previewSrc: string;
  mediaSrc: string;
  className?: string;
  title?: string;
  alt?: string;
  cover?: 'cover' | 'contain';
};

export const AudioPreview: VFC<TAudioPreview> = ({
  previewSrc,
  mediaSrc,
  className,
  title = '',
  alt = '',
  cover = 'cover',
}) => (
  <div className={cn(s.audioContainer, className)}>
    <ImagePreview src={previewSrc} alt={alt} title={title} cover={cover} />
    <audio className={s.audio} controls>
      <source src={mediaSrc} />
      <track kind="captions" />
    </audio>
  </div>
);
