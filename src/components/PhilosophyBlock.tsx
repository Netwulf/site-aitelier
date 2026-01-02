import { cn } from "@/lib/utils";

interface PhilosophyBlockProps {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}

export const PhilosophyBlock = ({
  title,
  children,
  accent = false,
}: PhilosophyBlockProps) => {
  return (
    <div
      className={cn(
        "py-section px-4 md:px-8",
        accent && "bg-stone-dark"
      )}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono-v2 text-sm tracking-widest text-ancestral-amber mb-8">
          {title}
        </h2>
        <div
          className="space-y-6 text-xl md:text-2xl leading-relaxed
                        text-ancestral-white font-display"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
