import React, { useCallback, VFC } from 'react';
import { useDropzone } from 'react-dropzone';

export interface FileUploaderProps {
  className?: string;
}

export const FileUploader: VFC<FileUploaderProps> = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? 'drop' : 'files'}
    </div>
  );
};
