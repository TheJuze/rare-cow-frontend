import React from 'react';
import { TAudioPreview } from './AudioPreview';
import { TImagePreview } from './ImagePreview';
import { TThreePreview } from './ThreePreview';
import { TVideoPreview } from './VideoPreview';
import {
  AudioPreview, ImagePreview, ThreePreview, VideoPreview,
} from '.';

export type TProps = {
  audio: TAudioPreview;
  video: TVideoPreview;
  image: TImagePreview;
  threeD: TThreePreview;
};

const getPreviewer = (props: TProps, format: string) => {
  const previewType = format;
  if (previewType) {
    switch (previewType) {
      case 'audio':
        return {
          previewComponent: <AudioPreview {...props[previewType]} />,
          previewType,
        };
      case 'image':
        return {
          previewComponent: <ImagePreview {...props[previewType]} />,
          previewType,
        };
      case 'threeD':
        return {
          previewComponent: <ThreePreview {...props[previewType]} />,
          previewType,
        };
      case 'video':
        return {
          previewComponent: <VideoPreview {...props[previewType]} />,
          previewType,
        };
      default:
        return { previewComponent: null, previewType: null };
    }
  }
  return { previewComponent: null, previewType: null };
};

export default getPreviewer;
