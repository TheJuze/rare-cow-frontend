/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FormEvent, useCallback, useEffect, useRef, useState, VFC,
} from 'react';

import cn from 'classnames';

import { Button, ImagePreview, Text } from 'components';
import { byteSize } from 'utils';

import {
  getExtension, imagesFormats, maxAvatarSize, TMaxSize,
} from 'appConstants';

import { ImageIconSVG, TrashIcon } from 'assets/icons/icons';
import styles from './styles.module.scss';

// eslint-disable-next-line no-shadow
enum ErrorList {
  emptyLoad, // there is no files in input
  largeFile, // file is more than required
  noneType,
}

type TImagesFormats = typeof imagesFormats[number];
interface IUploadAvatar {
  fileURL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoadStarts?: (...args: any) => void;
  onLoadEnd?: (fileUrl: string | null, file: File | null) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onLoadError?: (error: any) => void;
  extensions?: TImagesFormats[];
  reqMaxSize?: TMaxSize;
  className?: string;
  onBlur?: (e: FormEvent) => void;
}

const UploadAvatar: VFC<IUploadAvatar> = ({
  fileURL,
  onLoadStarts,
  onLoadEnd,
  onLoadError,
  extensions = imagesFormats,
  reqMaxSize = maxAvatarSize,
  className,
  onBlur,
}) => {
  const [idx] = useState(String(Date.now() * Math.random()));
  const [filesOver, setFilesOver] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const areaRef = useRef<HTMLLabelElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const readFileAsUrl = useCallback(
    (f: File) => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        const readResult = reader.result as string;
        resolve(readResult);
      };
      reader.onerror = function () {
        resolve('null');
      };
      reader.readAsDataURL(f);
    }),
    [],
  );

  const filesWorker = useCallback(
    // nf -> newFile
    async (nF: File) => {
      const nullFunc = () => {};
      const onError = onLoadError || nullFunc;
      const onStart = onLoadStarts || nullFunc;
      const onEnd = onLoadEnd || nullFunc;
      onStart();
      if (nF) {
        if (nF.size <= byteSize(reqMaxSize)) {
          const format = getExtension(nF.name) as any;
          if (extensions.includes(format)) {
            const nfURL = await readFileAsUrl(nF);
            setFailed(false);
            onEnd(nfURL, nF);
          } else {
            onError({
              msg: `format of file is ${format}. Required are ${extensions.join(', ')}`,
              type: ErrorList.noneType,
            });
            setFailed(true);
          }
        } else {
          onError({
            msg: `size of file is ${nF.size} bits. Required ${byteSize(reqMaxSize)} bits!`,
            numbers: [nF.size, byteSize(reqMaxSize)],
            type: ErrorList.largeFile,
          });
          setFailed(true);
        }
      } else {
        onError({
          msg: 'Empty files',
          numbers: [],
          type: ErrorList.emptyLoad,
        });
        setFailed(true);
      }
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [extensions, onLoadEnd, onLoadError, onLoadStarts, readFileAsUrl, reqMaxSize],
  );

  useEffect(() => {
    const highlight = () => {
      setFilesOver(true);
    };
    const unHighlight = () => {
      setFilesOver(false);
    };
    const preventAll = (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      const dt = e.dataTransfer;
      const f = Array.from(dt?.files || [])[0];
      filesWorker(f);
    };
    const dropArea = areaRef.current || null;
    if (dropArea) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: any) => {
        dropArea.addEventListener(eventName, preventAll, false);
      });

      ['dragenter', 'dragover'].forEach((eventName: any) => {
        dropArea.addEventListener(eventName, highlight, false);
      });

      ['dragleave', 'drop'].forEach((eventName: any) => {
        dropArea.addEventListener(eventName, unHighlight, false);
      });

      dropArea.addEventListener('drop', handleDrop, false);
    }

    return () => {
      if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: any) => {
          dropArea.removeEventListener(eventName, preventAll, false);
        });

        ['dragenter', 'dragover'].forEach((eventName: any) => {
          dropArea.removeEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach((eventName: any) => {
          dropArea.removeEventListener(eventName, unHighlight, false);
        });

        dropArea.removeEventListener('drop', handleDrop, false);
      }
    };
  }, [filesWorker]);

  const onDragOrSelect = useCallback(
    async (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const f = Array.from(e.currentTarget.files || [])[0];
      await filesWorker(f);
    },
    [filesWorker],
  );

  const onDelete = useCallback((e: FormEvent) => {
    onLoadEnd?.(null, null);
    onBlur?.(e);
  }, [onBlur, onLoadEnd]);

  return (
    <div className={styles['upload-avatar']}>
      <section
        className={cn(styles['upload-avatar__wrapper'], className, {
          [styles['failed-load']]: failed,
          [styles['over-active']]: filesOver,
        })}
      >
        <label ref={areaRef} htmlFor={idx} className={styles['upload-avatar__wrapper__body']}>
          <input
            type="file"
            accept={extensions.map((e) => `.${e}`).join(',')}
            onChange={onDragOrSelect}
            id={idx}
            className={styles['upload-avatar__wrapper__body__hidden-input']}
            ref={inputRef}
            onBlur={onBlur}
          />
          <div
            className={cn(styles['upload-avatar__wrapper__body-icon'], {
              [styles.invisible]: fileURL,
            })}
          >
            <ImageIconSVG />
          </div>
          <div
            className={cn(styles['upload-avatar__wrapper__body-title'], {
              [styles.invisible]: fileURL,
            })}
          >
            <Text color="dark" weight="medium">
              Upload file
            </Text>
          </div>
        </label>
        <div
          className={cn(styles['upload-avatar__wrapper__image-preview'], {
            [styles['avatar-active']]: fileURL,
          })}
        >
          <ImagePreview cover="cover" src={fileURL || ''} alt="" />
        </div>
      </section>
      <div
        className={cn(styles['upload-avatar__wrapper__image-delete'], {
          [styles['with-delete']]: fileURL,
        })}
      >
        <Button onClick={onDelete} variant="text" icon={<TrashIcon />} />
      </div>
    </div>
  );
};

export default UploadAvatar;
