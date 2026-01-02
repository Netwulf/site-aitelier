import { cn } from "@/lib/utils";
import { SectionNumber } from "./SectionNumber";

interface SectionContainerProps {
  children: React.ReactNode;
  number?: number;
  className?: string;
  id?: string;
}

export const SectionContainer = ({
  children,
  number,
  className,
  id,
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative py-section px-4 md:px-8 max-w-container mx-auto",
        className
      )}
    >
      {number && (
        <div className="absolute left-4 top-8 hidden lg:block">
          <SectionNumber number={number} />
        </div>
      )}
      <div className="lg:pl-16">{children}</div>
    </section>
  );
};
