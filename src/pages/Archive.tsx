import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { SectionContainer } from "@/components/SectionContainer";
import { VisualArchiveGrid } from "@/components/VisualArchiveGrid";
import { JournalList } from "@/components/JournalList";
import { ObrasSection } from "@/components/ObrasSection";
import { InstagramDiagnostic } from "@/components/InstagramDiagnostic";
import PlaygroundTools from "@/components/PlaygroundTools";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type ArchiveTab = "visual" | "journal" | "obras" | "ferramentas";

const TabButton = ({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-4 font-mono-v2 text-sm tracking-wide transition-colors",
        "border-b-2 -mb-[2px]",
        active
          ? "text-ancestral-white border-ancestral-amber"
          : "text-[#666666] border-transparent hover:text-[#a0a0a0]"
      )}
    >
      {children}
    </button>
  );
};

const Archive = () => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("obras");
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-8 px-6">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono-v2 text-sm text-ancestral-amber mb-4 tracking-widest">
                EXPERIMENTOS_PÚBLICOS
              </p>
              <h1 className="font-display text-hero text-ancestral-white mb-6">
                Playground
              </h1>
              <p className="text-xl text-text-secondary max-w-xl leading-relaxed">
                Onde experimentamos em público.
                <br />
                <span className="text-ancestral-white">Obras, ferramentas, processos.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="px-6 border-b border-[#666666]/20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex gap-8">
              <TabButton
                active={activeTab === "obras"}
                onClick={() => setActiveTab("obras")}
              >
                Obras
              </TabButton>
              <TabButton
                active={activeTab === "journal"}
                onClick={() => setActiveTab("journal")}
              >
                Journal
              </TabButton>
              <TabButton
                active={activeTab === "visual"}
                onClick={() => setActiveTab("visual")}
              >
                Visual
              </TabButton>
              <TabButton
                active={activeTab === "ferramentas"}
                onClick={() => setActiveTab("ferramentas")}
              >
                Ferramentas
              </TabButton>
            </div>
          </div>
        </section>

        {/* Content with smooth transitions */}
        <SectionContainer>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {activeTab === "visual" && <VisualArchiveGrid />}
              {activeTab === "journal" && <JournalList />}
              {activeTab === "obras" && <ObrasSection />}
              {activeTab === "ferramentas" && <PlaygroundTools />}
            </motion.div>
          </AnimatePresence>
        </SectionContainer>
      </main>

      <FooterV2 />
    </div>
  );
};

export default Archive;
