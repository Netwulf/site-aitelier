import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Users, Star, Lock, Zap } from "lucide-react";

export const CSCTurmaFundadora = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const benefits = [
    {
      icon: Star,
      title: "Acesso Vitalício",
      description: "Todas as atualizações futuras do programa, para sempre.",
    },
    {
      icon: Lock,
      title: "Exclusividade",
      description: "Apenas 12 pessoas. Atenção individual garantida.",
    },
    {
      icon: Zap,
      title: "Prioridade",
      description: "Primeiro acesso a novas ferramentas e recursos do ai.telier.",
    },
    {
      icon: Users,
      title: "Comunidade Fundadora",
      description: "Rede de contato com os primeiros cineastas IA do Brasil.",
    },
  ];

  return (
    <section
      id="turma-fundadora"
      ref={ref}
      className="relative py-24 md:py-32 bg-stone-dark overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-olive/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-tech-olive/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono-v2 text-text-muted tracking-widest block mb-4">
            {">"} TURMA_FUNDADORA.exclusive
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ancestral-white mb-6">
            A Primeira{" "}
            <span className="text-tech-olive">Turma</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            12 pessoas que vão inaugurar um novo movimento no cinema brasileiro.
          </p>
        </motion.div>

        {/* Big number visual */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-display font-black
                           text-tech-olive/10 blur-3xl">
              12
            </div>
            <span className="relative text-[12rem] md:text-[16rem] font-display font-black
                           text-transparent bg-clip-text bg-gradient-to-b
                           from-tech-olive via-tech-olive/80 to-tech-olive/40">
              12
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-display text-ancestral-white mt-4">
            vagas na turma fundadora
          </p>
          <p className="text-text-muted mt-2">
            6 meses de formação intensiva • 3h por semana ao vivo
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-ancestral-black/50 border border-text-muted/20"
              >
                <div className="p-3 bg-tech-olive/10 border border-tech-olive/30">
                  <Icon className="w-5 h-5 text-tech-olive" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-ancestral-white mb-1 normal-case">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-text-muted">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process note */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-8 border border-tech-olive/30 bg-tech-olive/5"
        >
          <h4 className="text-xl font-display font-bold text-ancestral-white mb-3 normal-case">
            Processo Seletivo
          </h4>
          <p className="text-text-secondary max-w-xl mx-auto">
            Não é sobre dinheiro. É sobre fit.
            <br />
            Buscamos pessoas com visão própria, disposição para experimentar,
            <br />
            e vontade real de criar cinema de um jeito novo.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCTurmaFundadora;
