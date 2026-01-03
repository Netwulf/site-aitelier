import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";
import { Check, ShieldCheck, Calendar, Users, Clock, ArrowRight } from "lucide-react";

export const CSCInvestment = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const included = [
    "6 meses de formação completa",
    "Módulos gravados + sessões ao vivo mensais",
    "3 obras produzidas com acompanhamento",
    "Comunidade exclusiva de diretores",
    "Acesso vitalício ao material",
    "Certificado de conclusão",
  ];

  const details = [
    { icon: Calendar, label: "INÍCIO", value: "Março 2025" },
    { icon: Clock, label: "DURAÇÃO", value: "6 meses" },
    { icon: Users, label: "VAGAS", value: "30-40 pessoas" },
  ];

  const scrollToProcess = () => {
    document.getElementById("candidatura")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="investimento"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: Transitioning to HOT - urgency building */}
      <div className="absolute inset-0 bg-gradient-to-b from-ancestral-black via-[#0a0808] to-[#0c0606]" />

      {/* Urgency glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-matrix-green/10 blur-[200px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="font-mono-v2 text-xs mb-4 text-matrix-green tracking-[0.3em] uppercase">
            Investimento
          </div>
        </motion.div>

        {/* Main Price Card */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-matrix-green/20 blur-3xl" />

          <div className="relative border-2 border-matrix-green p-8 md:p-12 bg-[#050805]">
            {/* Price */}
            <div className="text-center mb-10">
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                animate={inView && !prefersReducedMotion ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative inline-block"
              >
                {/* Glow behind price */}
                <div className="absolute inset-0 text-7xl md:text-8xl font-display font-black text-matrix-green/20 blur-xl">
                  R$ 8.000
                </div>
                <span className="relative text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-matrix-green via-matrix-green to-matrix-green/60">
                  R$ 8.000
                </span>
              </motion.div>

              <p className="text-text-muted font-mono-v2 mt-4">
                ou até <span className="text-ancestral-white font-semibold">10x sem juros</span>
              </p>
            </div>

            {/* What's included */}
            <div className="mb-10">
              <h4 className="text-lg font-bold text-ancestral-white mb-6 font-display text-center">
                O QUE ESTÁ INCLUSO
              </h4>
              <ul className="grid md:grid-cols-2 gap-4">
                {included.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                    animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-matrix-green flex-shrink-0 mt-0.5" />
                    <span className="text-text-muted">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={scrollToProcess}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full py-5 bg-matrix-green text-ancestral-black font-bold text-lg uppercase tracking-wider
                         hover:bg-matrix-green/90 transition-all duration-300
                         shadow-[0_0_40px_rgba(0,255,136,0.3)] hover:shadow-[0_0_60px_rgba(0,255,136,0.4)]
                         flex items-center justify-center gap-3 group"
            >
              <span>Quero me Candidatar</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div
                key={index}
                className="p-4 border border-text-muted/20 bg-ancestral-black/50 flex items-start gap-4"
              >
                <Icon className="w-5 h-5 text-matrix-green flex-shrink-0 mt-1" />
                <div>
                  <p className="text-matrix-green font-mono-v2 text-xs mb-1">{detail.label}</p>
                  <p className="text-ancestral-white text-sm font-semibold">{detail.value}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-tech-olive/10 blur-2xl" />

          <div className="relative p-6 md:p-8 border-2 border-tech-olive/50 bg-tech-olive/5 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-7 h-7 text-tech-olive" />
              <h4 className="text-xl font-bold text-tech-olive font-display">
                GARANTIA 30 DIAS
              </h4>
            </div>
            <p className="text-text-muted leading-relaxed max-w-xl mx-auto">
              Participe, crie, avalie. Se não fizer sentido para você,{" "}
              <span className="text-ancestral-white font-semibold">devolvo 100%</span>.
              <br />
              <span className="text-sm">Sem burocracia. Sem perguntas.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCInvestment;
