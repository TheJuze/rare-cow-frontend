import React, { VFC, useState, useCallback } from 'react';

import cn from 'classnames';

import { Switch } from 'components/Switch';
import { Text } from 'components/Typography';
import s from './styles.module.scss';
import { ImagePreview } from './ImagePreview';

export type TThreePreview = {
  previewSrc: string;
  mediaSrc: string;
  className?: string;
  title?: string;
  alt?: string;
  cover?: 'cover' | 'contain';
  withSwitch?: boolean;
};

export const ThreePreview: VFC<TThreePreview> = ({
  previewSrc,
  mediaSrc,
  className,
  title = '',
  alt = '',
  cover = 'cover',
  withSwitch = false,
}) => {
  const [switchState, setSwitchState] = useState(false);

  const onSwitchClickHandler = useCallback(() => {
    setSwitchState((prev) => !prev);
  }, []);

  return (
    <div className={cn(s.threeContainer, className)}>
      {withSwitch && previewSrc && mediaSrc && (
        <div>
          <Text>NFT</Text>
          <Switch checked={switchState} onChange={onSwitchClickHandler} />
          <Text>Preview</Text>
        </div>
      )}
      {withSwitch && switchState ? (
        <ImagePreview src={previewSrc} alt={alt} title={title} cover={cover} />
      ) : (
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
        >
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar" />
          </div>
        </model-viewer>
      )}
    </div>
  );
};
