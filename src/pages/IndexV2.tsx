import { NavigationV2 } from "@/components/NavigationV2";
import { HeroV2 } from "@/components/HeroV2";
import { RuptureSection } from "@/components/RuptureSection";
import { SectionContainer } from "@/components/SectionContainer";
import { Triptych } from "@/components/Triptych";
import { FuturoAncestralSection } from "@/components/FuturoAncestralSection";
import { ArchivePreview } from "@/components/ArchivePreview";
import { EntrySection } from "@/components/EntrySection";
import { FooterV2 } from "@/components/FooterV2";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";

const triptychItems = [
  {
    title: "ESCOLA",
    subtitle: "Onde se forma a linguagem",
    href: "/escola",
  },
  {
    title: "STUDIO",
    subtitle: "Onde o atelier encontra o mundo",
    href: "/studio",
  },
  {
    title: "GALERIA",
    subtitle: "Onde o trabalho permanece",
    href: "/galeria",
  },
];

const IndexV2 = () => {
  useSmoothScroll();
  useScrollOptimization();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero - "O futuro é ancestral." */}
        <HeroV2 variant="A" />

        {/* Section 1: The Rupture */}
        <RuptureSection />

        {/* Section 2: The Triptych */}
        <SectionContainer number={2}>
          <div className="mb-8">
            <h2 className="font-mono-v2 text-sm tracking-widest text-[#666666] mb-2">
              O ATELIER
            </h2>
          </div>
          <Triptych items={triptychItems} />
        </SectionContainer>

        {/* Section 3: Futuro Ancestral */}
        <FuturoAncestralSection />

        {/* Section 4: Visual Archive Preview */}
        <ArchivePreview />

        {/* Section 5: Entry */}
        <EntrySection />
      </main>

      <FooterV2 />
    </div>
  );
};

export default IndexV2;
