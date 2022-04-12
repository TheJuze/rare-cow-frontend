import React, {
  FC, useCallback, useEffect, useState,
} from 'react';

import { nullAvatar } from 'assets/img';

import './styles.scss';

interface IProps {
  src: string;
  errorSrc?: string;
  className?: string;
  withSkeleton?: boolean;
  skeletonStyles?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

// eslint-disable-next-line no-shadow
enum ImageState {
  loading,
  error,
  success,
}

/**
 *
 * @param {string} src - source link of the image
 * @param {string} [errorSrc] - source link of the spare image {NullAvatar}
 * @param {string} [className] - additional classes {undefined}
 * @param {boolean} [withSkeleton] - the statement which shows the skeleton or not {true}
 * @param {string} [skeletonStyles] - class name of the skeleton styles {'skeleton'}
 * @param {string} [alt] - alt prop for the image {''}
 * @param {number | string} [width] - width of the image {16}
 * @param {number | string} [height] - height of the image {16}
 * @returns Wrapped component with fallback src
 */

export const FallbackImage: FC<IProps> = ({
  src,
  errorSrc = nullAvatar,
  withSkeleton = true,
  className,
  skeletonStyles = 'skeleton',
  alt = '',
  width = 16,
  height = 16,
}) => {
  const [imgState, setImgState] = useState<ImageState>(ImageState.loading);
  const [imgSrc, setImageSrc] = useState<string>(!src ? errorSrc : src);

  const errorHandler = useCallback(() => {
    setImgState(ImageState.error);
    setImageSrc(errorSrc);
  }, [errorSrc]);

  const successHandler = useCallback(() => {
    setImgState(ImageState.success);
  }, []);

  useEffect(() => {
    setImageSrc(!src ? errorSrc : src);
    setImgState(ImageState.loading);
  }, [src, errorSrc]);

  return (
    <div className={`${className} wrapper`} style={{ width: `${width}px`, height: `${height}px` }}>
      {imgState === ImageState.loading && withSkeleton && (
        <div className={skeletonStyles} style={{ width: `${width}px`, height: `${height}px` }} />
      )}
      <img
        alt={alt}
        src={imgSrc}
        className={`${className} fallback-image`}
        onError={errorHandler}
        onLoad={successHandler}
      />
    </div>
  );
};
