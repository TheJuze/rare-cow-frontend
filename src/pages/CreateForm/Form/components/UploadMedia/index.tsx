import {
  availableExtensions, getExtension, getFileGroup, imagesFormats,
} from 'appConstants';
import { TrashIcon } from 'assets/icons/icons';
import {
  Button, FileUploader, getPreviewer, Text,
} from 'components';
import { TAudioPreview } from 'components/Preview/AudioPreview';
import { TImagePreview } from 'components/Preview/ImagePreview';
import { TThreePreview } from 'components/Preview/ThreePreview';
import { TVideoPreview } from 'components/Preview/VideoPreview';
import React, {
  useState, VFC, useCallback, useMemo, useEffect,
} from 'react';
import { readFileAsUrl } from 'utils';

import styles from './styles.module.scss';

interface IUploadMedia {
  onChange?: (previewFile: File | null, mediaFile: File | null) => void;
}

const UploadMedia: VFC<IUploadMedia> = ({ onChange }) => {
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const [readingFile, setReadingFile] = useState(false);

  const onPreviewDelete = useCallback(() => {
    setPreviewFile(null);
    setPreviewUrl(null);
  }, []);

  const onMediaDelete = useCallback(() => {
    setMediaFile(null);
    setMediaUrl(null);
    onPreviewDelete();
  }, [onPreviewDelete]);

  const availableExtensionsList = useMemo(
    () => (mediaFile ? [...imagesFormats] : [...availableExtensions]),
    [mediaFile],
  );

  const shouldUploaderRender = useMemo(() => {
    const isImageMedia = mediaFile
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getFileGroup(getExtension(mediaFile.name) as any) === 'image'
      : false;
    return (isImageMedia && !mediaFile) || (!isImageMedia && (!mediaFile || !previewFile));
  }, [mediaFile, previewFile]);

  const previewerProps = useMemo(() => {
    const audio: TAudioPreview = {
      previewSrc: previewUrl,
      mediaSrc: mediaUrl,
    };
    const image: TImagePreview = {
      src: mediaUrl,
    };
    const video: TVideoPreview = {
      previewSrc: previewUrl,
      mediaSrc: mediaUrl,
    };
    const threeD: TThreePreview = {
      previewSrc: previewUrl,
      mediaSrc: mediaUrl,
      withSwitch: true,
    };

    return {
      audio,
      image,
      video,
      threeD,
    };
  }, [mediaUrl, previewUrl]);

  const { previewComponent } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mediaFormat = mediaFile ? getFileGroup(getExtension(mediaFile.name) as any) : '';
    return getPreviewer(previewerProps, mediaFormat);
  }, [mediaFile, previewerProps]);

  const getUploaderTitle = useCallback((isDragActive: boolean) => {
    if (mediaFile) {
      return (
        <div>
          <Text weight="normal" variant="body-2" color="base900" align="center">
            Upload preview
          </Text>
          <Text weight="normal" variant="body-2" color="base900" align="center">
            {isDragActive ? 'Drop' : 'Drag or choose'} your file to upload
          </Text>
        </div>
      );
    }
    return (
      <div>
        <Text weight="normal" variant="body-2" color="base900" align="center">
          Upload file
        </Text>
        <Text weight="normal" variant="body-2" color="base900" align="center">
          {isDragActive ? 'Drop' : 'Drag or choose'} your file to upload
        </Text>
      </div>
    );
  }, [mediaFile]);

  const onUploadHandler = useCallback(
    (files: File[]) => {
      if (mediaFile) {
        setPreviewFile(files[0]);
      } else {
        setMediaFile(files[0]);
      }
    },
    [mediaFile],
  );

  const generateMediaUrl = useCallback(async () => {
    if (mediaFile) {
      setReadingFile(true);
      const rawMediaUrl = await readFileAsUrl(mediaFile);
      if (rawMediaUrl) {
        setMediaUrl(rawMediaUrl);
      }
      setReadingFile(false);
    }
  }, [mediaFile]);

  const generatePreviewUrl = useCallback(async () => {
    if (previewFile) {
      setReadingFile(true);
      const rawPreviewUrl = await readFileAsUrl(previewFile);
      if (rawPreviewUrl) {
        setPreviewUrl(rawPreviewUrl);
      }
      setReadingFile(false);
    }
  }, [previewFile]);

  useEffect(() => {
    generateMediaUrl();
  }, [generateMediaUrl]);

  useEffect(() => {
    generatePreviewUrl();
  }, [generatePreviewUrl]);

  useEffect(() => {
    onChange?.(previewFile, mediaFile);
  }, [mediaFile, previewFile]);

  return (
    <div>
      {shouldUploaderRender && (
        <div>
          <FileUploader
            onUpload={onUploadHandler}
            availableFiles={availableExtensionsList}
            disabled={readingFile}
            title={getUploaderTitle}
          />
        </div>
      )}
      {(mediaFile || previewFile) && (
        <div className={styles.deleteArea}>
          {mediaFile && (
            <div className={styles.delete}>
              <Button variant="text" icon={<TrashIcon />} onClick={onMediaDelete} />
              <Text>Delete all files</Text>
            </div>
          )}
          {previewFile && (
            <div className={styles.delete}>
              <Button variant="text" icon={<TrashIcon />} onClick={onPreviewDelete} />
              <Text>Delete preview file</Text>
            </div>
          )}
        </div>
      )}
      {previewComponent && <div>{previewComponent}</div>}
    </div>
  );
};

export default UploadMedia;
