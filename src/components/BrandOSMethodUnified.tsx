import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { Sparkles, Cpu, Rocket } from "lucide-react";

// Color class lookup to avoid dynamic Tailwind class issues
const colorClasses = {
  "matrix-green": {
    text: "text-matrix-green",
    icon: "text-matrix-green",
  },
  "brutal-white": {
    text: "text-brutal-white",
    icon: "text-brutal-white",
  },
} as const;

type ColorKey = keyof typeof colorClasses;

const BrandOSMethodUnified = () => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  const stages = [
    {
      number: "01",
      icon: Sparkles,
      title: "IDENTIDADE",
      subtitle: "A ALMA",
      description: "De onde tudo começa",
      items: [
        "Mapeamento de história e valores",
        "Posicionamento e narrativa única",
        "Expressão visual e verbal autêntica"
      ],
      output: "Brand DNA Document",
      color: "matrix-green" as ColorKey
    },
    {
      number: "02",
      icon: Cpu,
      title: "SISTEMA",
      subtitle: "A TECNOLOGIA",
      description: "Como você escala",
      items: [
        "AI Labs (Visual, Music, Video, Storytelling)",
        "Automação e clonagem cognitiva",
        "Conteúdo escalável mantendo essência"
      ],
      output: "Brand OS System",
      color: "brutal-white" as ColorKey
    },
    {
      number: "03",
      icon: Rocket,
      title: "AUTONOMIA",
      subtitle: "O NEGÓCIO",
      description: "Liberdade real",
      items: [
        "Produtos e monetização",
        "Audiência qualificada",
        "Negócio rodando 24/7"
      ],
      output: "One Person Brand",
      color: "matrix-green" as ColorKey
    }
  ];

  return (
    <section id="metodo" className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden bg-brutal-black">
      {/* Background effects */}
      <div className="organic-glow" style={{ top: "40%", left: "10%" }} />
      <div className="mesh-gradient-1" />

      <motion.div
        ref={ref as any}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUpSimple} className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="code-text text-sm text-matrix-green">MÉTODO</span>
            <div className="h-px bg-concrete-border flex-1" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-brutal-white leading-none mb-8">
            BRAND OS METHOD
          </h2>
          <p className="text-xl text-concrete max-w-3xl">
            O sistema completo para transformar identidade em negócio escalável.
          </p>
        </motion.div>

        {/* 3 estágios verticais */}
        <div className="space-y-12">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.number}
              variants={fadeInUpSimple}
              className="relative"
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left: Icon + Title */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-4 mb-4">
                    <stage.icon className={`w-8 h-8 ${colorClasses[stage.color].icon}`} />
                    <span className="code-text text-xs text-concrete">{stage.number}</span>
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-bold ${colorClasses[stage.color].text} mb-2`}>
                    {stage.title}
                  </h3>
                  <p className="text-xl text-concrete italic mb-2">{stage.subtitle}</p>
                  <p className="text-base text-concrete/80">{stage.description}</p>
                </div>

                {/* Middle: Items */}
                <div className="md:col-span-5">
                  <ul className="space-y-3">
                    {stage.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-matrix-green mt-1">→</span>
                        <span className="text-base text-brutal-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Output */}
                <div className="md:col-span-3">
                  <div className="brutal-grid p-6 border border-concrete-border bg-brutal-black/50">
                    <span className="code-text text-xs text-matrix-green mb-2 block">OUTPUT</span>
                    <p className="text-sm font-bold text-brutal-white">{stage.output}</p>
                  </div>
                </div>
              </div>

              {/* Connector arrow (except last) */}
              {index < stages.length - 1 && (
                <div className="flex justify-center my-8">
                  <span className="text-4xl text-matrix-green">↓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* Subtle grid */}
      <div className="brutal-grid absolute inset-0 opacity-3" />
    </section>
  );
};

export default BrandOSMethodUnified;
