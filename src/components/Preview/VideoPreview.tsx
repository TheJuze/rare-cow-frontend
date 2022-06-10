import React, { VFC } from 'react';

import cn from 'classnames';

import s from './styles.module.scss';
import { ImagePreview } from './ImagePreview';

export type TVideoPreview = {
  previewSrc: string;
  mediaSrc: string;
  className?: string;
  title?: string;
  alt?: string;
  cover?: 'cover' | 'contain';
  preview?: boolean;
};

export const VideoPreview: VFC<TVideoPreview> = ({
  previewSrc,
  mediaSrc,
  className,
  title = '',
  alt = '',
  cover = 'cover',
  preview = false,
}) => (
  <div className={cn(s.videoContainer, className)}>
    {(!preview && previewSrc) &&
      <ImagePreview src={previewSrc} alt={alt} title={title} cover={cover} />}
    <video className={s.video} poster={preview ? previewSrc : ''} controls>
      <source src={mediaSrc} />
      <track kind="captions" />
    </video>
  </div>
);
