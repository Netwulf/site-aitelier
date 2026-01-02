import { motion } from "framer-motion";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { SectionContainer } from "@/components/SectionContainer";
import { ManifestoV2 } from "@/components/ManifestoV2";
import { FuturoAncestralDeep } from "@/components/FuturoAncestralDeep";
import { Conselheiros } from "@/components/Conselheiros";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Campo = () => {
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-[1400px] mx-auto">
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              className="font-display text-display-1 text-ancestral-white"
            >
              ai.telier
            </motion.h1>
          </div>
        </section>

        {/* Manifesto */}
        <SectionContainer number={1}>
          <ManifestoV2 />
        </SectionContainer>

        {/* Futuro Ancestral Deep */}
        <SectionContainer number={2}>
          <FuturoAncestralDeep />
        </SectionContainer>

        {/* Os Conselheiros */}
        <SectionContainer number={3}>
          <Conselheiros />
        </SectionContainer>
      </main>

      <FooterV2 />
    </div>
  );
};

export default Campo;
