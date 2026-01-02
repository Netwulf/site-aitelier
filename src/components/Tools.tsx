import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// V3 Brutalista: Unica cor de accent
const TECH_OLIVE = "#8dc75e";

const Tools = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const tools = [
    { name: "Midjourney", category: "IMAGEM", screenshot: "/placeholder.svg" },
    { name: "ElevenLabs", category: "ÁUDIO", screenshot: "/placeholder.svg" },
    { name: "ChatGPT", category: "TEXTO", screenshot: "/placeholder.svg" },
    { name: "Runway", category: "VÍDEO", screenshot: "/placeholder.svg" },
    { name: "Claude", category: "TEXTO", screenshot: "/placeholder.svg" },
    { name: "Stable Diffusion", category: "IMAGEM", screenshot: "/placeholder.svg" },
  ];

  return (
    <section className="py-20 md:py-32 bg-brutal-black relative overflow-hidden" ref={ref as any}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="code-text text-xs mb-4">&gt; TOOLS_STACK</div>
          <h2 className="text-brutal-white mb-6">
            FERRAMENTAS<br />QUE VOCÊ VAI DOMINAR
          </h2>
          <p className="poetic-text text-lg text-brutal-white/70 max-w-2xl">
            As melhores IAs de cada categoria. Você aprende não só a usar, mas quando e por quê usar cada uma.
          </p>
        </motion.div>

        {/* Bento grid assimétrico */}
        <div className="bento-grid">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              className={`
                col-span-12 
                ${i === 0 ? 'md:col-span-8' : ''}
                ${i === 1 ? 'md:col-span-4' : ''}
                ${i > 1 ? 'md:col-span-4' : ''}
                group
              `}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={prefersReducedMotion ? {} : fadeInUpSimple}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden border-2 border-white/10 group-hover:border-matrix-green transition-colors duration-500">
                {/* Screenshot */}
                <img
                  src={tool.screenshot}
                  alt={tool.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* V3: Overlay com tech-olive */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${TECH_OLIVE}cc, transparent)`
                  }}
                >
                  <div className="absolute bottom-6 left-6">
                    <span className="text-xs text-white/80 uppercase tracking-wider">{tool.category}</span>
                    <h4 className="text-white text-2xl font-bold mt-1">{tool.name}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
