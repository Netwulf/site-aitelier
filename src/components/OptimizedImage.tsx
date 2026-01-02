import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className, 
  priority = false 
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("high-quality-image", className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
};
