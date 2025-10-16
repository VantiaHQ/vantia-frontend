import data from './appImages.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
};

export const AppImages: ImagePlaceholder[] = data.appImages;
