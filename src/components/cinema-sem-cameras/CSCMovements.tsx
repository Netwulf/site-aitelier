import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";
import { Film, BookOpen, Cpu, Briefcase, Play, Users } from "lucide-react";

export const CSCMovements = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const movements = [
    {
      number: "01",
      icon: Film,
      title: "Direção Cinematográfica",
      subtitle: "Linguagem, plano, ritmo, decisão estética.",
      insight: "Como transformar referência em vocabulário próprio.",
    },
    {
      number: "02",
      icon: BookOpen,
      title: "Narrativa Audiovisual",
      subtitle: "Tensão, estrutura e sentido em formatos curtos.",
      insight: "Como organizar vídeos que prendem do início ao fim.",
    },
    {
      number: "03",
      icon: Cpu,
      title: "Operação Solo com IA",
      subtitle: "Pipeline mínimo, direção de máquina, continuidade.",
      insight: "Como criar sozinho com padrão de equipe.",
    },
    {
      number: "04",
      icon: Briefcase,
      title: "Mercado & Portfólio",
      subtitle: "Precificação, apresentação e sustentabilidade.",
      insight: "Como vender direção e cobrar bem.",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: WARM - narrative journey */}
      <div className="absolute inset-0 bg-gradient-to-b from-ancestral-black via-[#0a0812] to-[#0c0814]" />

      {/* Atmospheric elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[200px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-matrix-green/5 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="font-mono-v2 text-xs mb-4 text-matrix-green tracking-[0.3em] uppercase">
            Os 4 movimentos
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-ancestral-white leading-[1.1]">
              A jornada de
              <br />
              <span className="text-tech-olive">6 meses.</span>
            </h2>

            {/* Duration badge */}
            <div className="flex items-center gap-4">
              <div className="text-6xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-matrix-green/40 to-matrix-green/10">
                6
              </div>
              <div className="text-sm font-mono-v2 text-text-muted">
                MESES DE
                <br />
                FORMAÇÃO
              </div>
            </div>
          </div>
        </motion.div>

        {/* Movements Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] md:left-[35px] top-0 bottom-0 w-px bg-gradient-to-b from-matrix-green/50 via-tech-olive/30 to-transparent" />

          <div className="space-y-6">
            {movements.map((movement, index) => {
              const Icon = movement.icon;
              return (
                <motion.div
                  key={movement.number}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
                  animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                  className="relative pl-16 md:pl-24"
                >
                  {/* Number node */}
                  <div className="absolute left-0 top-0 w-14 h-14 md:w-[70px] md:h-[70px] border-2 border-matrix-green/50 bg-ancestral-black flex items-center justify-center">
                    <span className="text-xl md:text-2xl font-mono-v2 font-bold text-matrix-green">
                      {movement.number}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="p-6 md:p-8 border border-text-muted/20 bg-[#0a0812]/80 hover:border-matrix-green/30 transition-colors group">
                    <div className="flex items-start gap-4 mb-4">
                      <Icon className="w-6 h-6 text-matrix-green/70 group-hover:text-matrix-green transition-colors flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-ancestral-white group-hover:text-matrix-green transition-colors font-display">
                          {movement.title}
                        </h3>
                        <p className="text-ancestral-white/70 mt-1">{movement.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted italic pl-10">
                      {movement.insight}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Delivery Model */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="font-mono-v2 text-xs mb-6 text-text-muted tracking-[0.2em] uppercase">
            Modelo de entrega
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Async */}
            <div className="p-6 border border-matrix-green/30 bg-matrix-green/5">
              <div className="flex items-center gap-4 mb-4">
                <Play className="w-5 h-5 text-matrix-green" />
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-matrix-green font-mono-v2">80%</span>
                  <span className="text-lg text-ancestral-white font-display">Assíncrono</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>• Módulos gravados (direção, narrativa, estética)</li>
                <li>• Workflows e pipelines práticos</li>
                <li>• Banco de referências curadas</li>
                <li>• Rubricas claras de avaliação</li>
              </ul>
            </div>

            {/* Live */}
            <div className="p-6 border border-tech-olive/30 bg-tech-olive/5">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-5 h-5 text-tech-olive" />
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-tech-olive font-mono-v2">20%</span>
                  <span className="text-lg text-ancestral-white font-display">Ao Vivo</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>• 1 sessão mensal de crítica coletiva (3h)</li>
                <li>• 1 sessão mensal de office hours (2h)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Closing statement */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center p-8 border-2 border-matrix-green/50 bg-matrix-green/5"
        >
          <p className="text-lg text-text-muted mb-2">Você não vira professor.</p>
          <p className="text-2xl md:text-3xl text-ancestral-white font-bold font-display">
            Você vira <span className="text-matrix-green">diretor de diretores.</span>
          </p>
          <p className="text-sm text-text-muted mt-4 font-mono-v2">
            3 obras ao longo da formação • Portfólio profissional • Network de diretores
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCMovements;
