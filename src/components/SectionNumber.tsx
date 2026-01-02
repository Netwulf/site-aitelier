import { cn } from "@/lib/utils";

interface SectionNumberProps {
  number: number;
  className?: string;
}

export const SectionNumber = ({ number, className }: SectionNumberProps) => {
  return (
    <span
      className={cn(
        "font-mono-v2 text-sm text-text-muted tracking-widest",
        className
      )}
    >
      {number.toString().padStart(2, "0")}
    </span>
  );
};
