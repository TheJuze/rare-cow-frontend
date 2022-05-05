import {
  availableExtensions, maxSize, TAvailableExtensions, TMaxSize,
} from 'appConstants';
import React, { ReactElement, useCallback, VFC } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Text } from 'components';
import byteSize from 'utils/byteSize';
import { ImageIconSVG } from 'assets/icons/icons';

import styles from './styles.module.scss';

export interface FileUploaderProps {
  className?: string;
  availableFiles?: TAvailableExtensions[];
  title?: (isDragActive: boolean) => string | ReactElement;
  reqMaxSize?: TMaxSize;
  onUpload?: (files: File[]) => void;
  onErrorUpload?: (files: FileRejection[]) => void;
  disabled?: boolean;
}

export const FileUploader: VFC<FileUploaderProps> = ({
  availableFiles = availableExtensions,
  title = (isDragActive) => (
    <div>
      <Text weight="normal" variant="body-2" color="base900" align="center">
        Upload preview
      </Text>
      <Text weight="normal" variant="body-2" color="base900" align="center">
        {isDragActive ? 'Drop' : 'Drag or choose'} your file to upload
      </Text>
    </div>
  ),
  reqMaxSize = maxSize,
  onUpload,
  onErrorUpload,
  disabled = false,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length) {
        onUpload?.(acceptedFiles);
      }
      if (rejectedFiles.length) {
        onErrorUpload?.(rejectedFiles);
      }
    },
    [onErrorUpload, onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: availableFiles.map((f) => `.${f}`),
    multiple: false,
    maxSize: byteSize(reqMaxSize),
    disabled,
  });

  return (
    <div
      {...getRootProps({
        className: styles.fileUploader,
      })}
    >
      <input {...getInputProps()} />
      <div className={styles.content}>
        <div className={styles.icon}>
          <ImageIconSVG />
        </div>
        <div className={styles.title}>{title(isDragActive)}</div>
        <Text align="center" weight="normal" size="xs" color="base900" className={styles.information}>
          ({availableFiles.map((e) => e.toUpperCase()).join(', ')}. Max {maxSize.size}{' '}
          {maxSize.unit}
          .)
        </Text>
      </div>
    </div>
  );
};
