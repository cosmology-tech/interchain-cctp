import * as React from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends ImageProps {
  fallback?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallback = '/icons/img-fallback.svg',
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = React.useState<string>(fallback || (src as string));
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const image = new window.Image();
    image.src = src as string;

    const handleLoad = () => {
      setIsLoading(false);
      setImgSrc(src as string);
    };

    const handleError = () => {
      setIsLoading(false);
      setImgSrc(fallback as string);
    };

    image.onload = handleLoad;
    image.onerror = handleError;

    // Clean up event listeners on component unmount
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src, fallback]);

  return (
    <Image
      src={imgSrc}
      alt={alt || 'image'}
      {...props}
      style={{
        color: 'inherit',
        ...props.style
      }}
    />
  );
};
