// Typed access to the migrated-asset manifest (data/original-assets.json).
// Components use this for gallery images and any image that needs intrinsic
// dimensions (to drive masonry layout and avoid layout shift).
import manifest from "@/data/original-assets.json";

export type AssetRecord = {
  title: string;
  type: string;
  sourceUrl: string;
  localPath: string;
  localFilename: string;
  page: string;
  altText: string;
  width: number | null;
  height: number | null;
  bytes: number | null;
  note?: string;
};

export const assets = manifest as AssetRecord[];

export const galleryImages: AssetRecord[] = assets.filter(
  (a) => a.page === "gallery"
);

export const aboutPhotos: AssetRecord[] = assets.filter(
  (a) => a.page === "about"
);

export function getAsset(localFilename: string): AssetRecord | undefined {
  return assets.find((a) => a.localFilename === localFilename);
}
