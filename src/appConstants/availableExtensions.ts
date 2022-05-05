export const audioFormats = ['mp3', 'ogg', 'wav'] as const;
export const threeDFormats = ['glb', 'glf'] as const;
export const imagesFormats = ['png', 'gif', 'webp', 'jpeg', 'jpg', 'svg'] as const;
export const videosFormats = ['mp4', 'webm'] as const;

export type TFilesGroup = 'audio' | 'threeD' | 'image' | 'video';

export const availableExtensions = [
  ...audioFormats,
  ...threeDFormats,
  ...imagesFormats,
  ...videosFormats,
] as const;
export type TAvailableExtensions = typeof availableExtensions[number];

export const maxSizeUnit = ['bits', 'bytes', 'Kb', 'Mb', 'Gb'] as const;
export type TMaxSizeUnit = typeof maxSizeUnit[number];

export type TMaxSize = {
  size: number;
  unit: TMaxSizeUnit;
};

export const maxSize: TMaxSize = {
  size: 15,
  unit: 'Mb',
};

export const maxAvatarSize: TMaxSize = {
  size: 30,
  unit: 'Mb',
};

export const getFileGroup = (extension: TAvailableExtensions): TFilesGroup | null => {
  if (audioFormats.includes(extension as typeof audioFormats[number])) {
    return 'audio';
  }
  if (videosFormats.includes(extension as typeof videosFormats[number])) {
    return 'video';
  }
  if (imagesFormats.includes(extension as typeof imagesFormats[number])) {
    return 'image';
  }
  if (threeDFormats.includes(extension as typeof threeDFormats[number])) {
    return 'threeD';
  }
  return null;
};

export const getExtension = (filePath: string) => filePath.slice(filePath.lastIndexOf('.') + 1);
