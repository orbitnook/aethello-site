import Image from "next/image";
import type { CSSProperties } from "react";

type ProductCropProps = {
  alt: string;
  aspectRatio: string;
  className?: string;
  focusX?: number;
  focusY?: number;
  height: number;
  mobileFocusX?: number;
  mobileFocusY?: number;
  mobileScale?: number;
  priority?: boolean;
  scale?: number;
  sizes?: string;
  src: string;
  width: number;
};

type CropStyle = CSSProperties & {
  "--crop-aspect": string;
  "--crop-scale": number;
  "--crop-x": string;
  "--crop-y": string;
  "--mobile-crop-scale": number;
  "--mobile-crop-x": string;
  "--mobile-crop-y": string;
};

export function ProductCrop({
  alt,
  aspectRatio,
  className = "",
  focusX = 0,
  focusY = 0,
  height,
  mobileFocusX = focusX,
  mobileFocusY = focusY,
  mobileScale = 1,
  priority = false,
  scale = 1,
  sizes = "(max-width: 640px) calc(100vw - 28px), (max-width: 1120px) calc(100vw - 48px), 920px",
  src,
  width,
}: ProductCropProps) {
  const style: CropStyle = {
    "--crop-aspect": aspectRatio,
    "--crop-scale": scale,
    "--crop-x": `${focusX / scale}%`,
    "--crop-y": `${focusY / scale}%`,
    "--mobile-crop-scale": mobileScale,
    "--mobile-crop-x": `${mobileFocusX / mobileScale}%`,
    "--mobile-crop-y": `${mobileFocusY / mobileScale}%`,
  };

  return (
    <figure className={`product-crop ${className}`.trim()} style={style}>
      <Image
        alt={alt}
        className="product-crop__image"
        height={height}
        preload={priority}
        sizes={sizes}
        src={src}
        unoptimized
        width={width}
      />
    </figure>
  );
}
