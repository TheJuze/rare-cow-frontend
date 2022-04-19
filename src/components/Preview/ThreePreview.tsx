import React, { VFC } from 'react';

import cn from 'classnames';

import s from './styles.module.scss';
import { ImagePreview } from './ImagePreview';

type TThreePreview = {
  previewSrc: string;
  mediaSrc: string;
  className?: string;
  title?: string;
  alt?: string;
  cover?: 'cover' | 'contain';
};

export const VideoPreview: VFC<TThreePreview> = ({
  previewSrc,
  mediaSrc,
  className,
  title = '',
  alt = '',
  cover = 'cover',
}) => (
  <div className={cn(s.videoContainer, className)}>
    <ImagePreview src={previewSrc} alt={alt} title={title} cover={cover} />
    <model-viewer
      bounds="tight"
      enable-pan
      src={mediaSrc}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      shadow-intensity="1"
      exposure="1"
      shadow-softness="1"
      environment-image="spruit_sunrise_1k_HDR.hdr"
    >
      <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar" />
      </div>
    </model-viewer>
  </div>
);
