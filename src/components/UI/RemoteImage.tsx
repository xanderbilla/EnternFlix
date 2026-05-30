"use client";

import Image, { type ImageProps } from "next/image";

type RemoteImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string | null | undefined;
  alt: string;
  fallbackText?: string;
  fallbackClassName?: string;
};

const DEFAULT_FALLBACK_CLASS =
  "w-full h-full flex items-center justify-center text-gray-400 text-sm bg-zinc-800/40 rounded-md";

export default function RemoteImage({
  src,
  alt,
  fallbackText = "Image not available",
  fallbackClassName = DEFAULT_FALLBACK_CLASS,
  ...imageProps
}: RemoteImageProps) {
  if (!src) {
    return <div className={fallbackClassName}>{fallbackText}</div>;
  }
  return <Image src={src} alt={alt} {...imageProps} />;
}
