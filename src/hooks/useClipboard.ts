/* eslint-disable no-shadow */
import { useCallback, useEffect, useState } from 'react';

enum ClipStatus {
  'inactive',
  'copied',
  'failed',
}

const useClipboard = (
  text: string,
  notifyTimeout = 1000,
): { copyStatus: ClipStatus; copy: (
  ) => void } => {
  const [copyStatus, setCopyStatus] = useState(ClipStatus.inactive);
  // eslint-disable-next-line consistent-return
  const copy = useCallback(() => {
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      navigator.clipboard.writeText(text).then(
        () => setCopyStatus(ClipStatus.copied),
        () => setCopyStatus(ClipStatus.failed),
      );
    } else {
      // text area method
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise<void>(() => {
        // here the magic happens
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        document.execCommand('copy')
          ? setCopyStatus(ClipStatus.copied)
          : setCopyStatus(ClipStatus.failed);
        textArea.remove();
      });
    }
    // if (!navigator?.clipboard) {
    //   alert(text);
    // } else {
    //   navigator.clipboard.writeText(text).then(
    //     () => setCopyStatus(ClipStatus.copied),
    //     () => setCopyStatus(ClipStatus.failed),
    //   );
    // }
  }, [text]);

  useEffect(() => {
    switch (copyStatus) {
      case ClipStatus.copied: {
        console.log('Copied', 'success');
        break;
      }
      case ClipStatus.failed: {
        console.log('Error', 'error');
        break;
      }
      default: {
        break;
      }
    }
  }, [copyStatus]);

  useEffect(() => {
    if (copyStatus === ClipStatus.inactive) {
      return;
    }

    const timeoutId = setTimeout(() => setCopyStatus(ClipStatus.inactive), notifyTimeout);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyStatus, notifyTimeout]);

  return { copyStatus, copy };
};

export default useClipboard;
