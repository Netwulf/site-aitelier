import { cn } from "@/lib/utils";

interface TextBlockProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const TextBlock = ({
  children,
  size = "md",
  className,
}: TextBlockProps) => {
  const sizeClasses = {
    sm: "text-sm leading-relaxed",
    md: "text-base leading-relaxed",
    lg: "text-lg md:text-xl leading-relaxed",
  };

  return (
    <div
      className={cn(
        "text-text-secondary space-y-4",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};
