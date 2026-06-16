import type { Asset } from 'contentful';

export function imageUrl(asset: unknown): string | undefined {
  const url = (asset as Asset | undefined)?.fields?.file?.url;
  return typeof url === 'string' ? `https:${url}` : undefined;
}

export function imageDimensions(asset: unknown): { width: number | undefined; height: number | undefined } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const img = ((asset as Asset | undefined)?.fields?.file as any)?.details?.image;
  return {
    width: typeof img?.width === 'number' ? img.width : undefined,
    height: typeof img?.height === 'number' ? img.height : undefined,
  };
}
