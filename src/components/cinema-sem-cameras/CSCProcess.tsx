import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, FileText, MessageSquare, CheckCircle, Mail } from "lucide-react";

export const CSCProcess = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const steps = [
    { icon: FileText, title: "Candidatura", description: "Preencha o formulário rápido" },
    { icon: MessageSquare, title: "Alinhamento", description: "Conversa de expectativas" },
    { icon: CheckCircle, title: "Confirmação", description: "Vaga garantida" },
  ];

  const closingPoints = [
    "Criando conteúdo sem clareza",
    "Tentando vender sem narrativa visual",
    "Se sentindo genérico",
    "Cobrando menos do que vale",
  ];

  return (
    <section
      ref={ref}
      id="candidatura"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Temperature: HOT - maximum urgency */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0606] via-[#0a0505] to-[#050303]" />

      {/* Urgency glow - warm/hot tones */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-900/10 blur-[250px] rounded-full" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-matrix-green/10 blur-[200px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="font-mono-v2 text-xs mb-4 text-matrix-green tracking-[0.3em] uppercase">
            Como entrar
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-ancestral-white leading-[1.1] mb-4">
            Processo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-matrix-green to-tech-olive">
              Seletivo
            </span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="relative p-6 border border-text-muted/20 bg-[#0a0808]/80 text-center group hover:border-matrix-green/50 transition-colors"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-ancestral-black border border-matrix-green/50 font-mono-v2 text-xs text-matrix-green">
                  0{index + 1}
                </div>

                <div className="w-14 h-14 mx-auto mb-4 bg-matrix-green/10 border border-matrix-green/30 flex items-center justify-center group-hover:bg-matrix-green/20 transition-colors">
                  <Icon className="w-7 h-7 text-matrix-green" />
                </div>

                <h4 className="text-lg font-bold text-ancestral-white mb-2 font-display">
                  {step.title}
                </h4>
                <p className="text-sm text-text-muted">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-16"
        >
          <a
            href="https://forms.gle/PLACEHOLDER"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-4 px-14 py-6
                       bg-matrix-green text-ancestral-black font-bold text-xl uppercase tracking-wider
                       hover:bg-matrix-green/90 transition-all duration-300
                       shadow-[0_0_60px_rgba(0,255,136,0.3)] hover:shadow-[0_0_80px_rgba(0,255,136,0.4)]"
          >
            <span>Quero me Candidatar</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>

          <p className="text-sm text-text-muted mt-6 font-mono-v2">
            Próxima turma:{" "}
            <span className="text-tech-olive font-semibold">Setembro 2025</span>
          </p>
        </motion.div>

        {/* Divider */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-matrix-green/50 to-transparent mx-auto mb-16" />

        {/* Final Statement - "Última Coisa" */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="font-mono-v2 text-xs mb-6 text-text-muted/70 tracking-[0.2em] uppercase text-center">
            Última coisa
          </div>

          <div className="p-8 border border-text-muted/20 bg-[#080505]/80 mb-8">
            <p className="text-xl text-ancestral-white font-display mb-6 text-center">
              Você pode continuar:
            </p>

            <ul className="space-y-3 mb-8 max-w-lg mx-auto">
              {closingPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={inView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-orange-400/50">—</span>
                  <span className="text-text-muted/70">{point}</span>
                </motion.li>
              ))}
            </ul>

            <p className="text-xl text-ancestral-white font-display text-center">
              Ou pode investir 6 meses para estruturar isso{" "}
              <span className="text-matrix-green font-bold">de forma definitiva.</span>
            </p>
          </div>
        </motion.div>

        {/* Final Statement Block */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-matrix-green/10 blur-3xl" />

          <div className="relative text-center p-10 border-2 border-matrix-green bg-matrix-green/5">
            <p className="text-lg text-text-muted mb-3">Não é cinema com IA.</p>

            <p className="text-xl md:text-2xl text-ancestral-white font-display mb-2">
              É como operar um estúdio de alto nível sem equipe.
            </p>

            <p className="text-xl md:text-2xl text-ancestral-white font-display mb-2">
              É transformar direção em superpoder de mercado.
            </p>

            <p className="text-2xl md:text-3xl text-matrix-green font-bold font-display">
              É criar obra que existe no mundo — e te paga por isso.
            </p>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={inView && !prefersReducedMotion ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 text-center"
        >
          <p className="text-text-muted/70 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Mail className="w-4 h-4" />
            <span>Dúvidas?</span>
            <a
              href="https://instagram.com/taypuri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-matrix-green hover:text-matrix-green/80 transition-colors font-semibold underline underline-offset-4"
            >
              @taypuri
            </a>
            <span>ou</span>
            <a
              href="mailto:taypuri@aitelier.com.br"
              className="text-matrix-green hover:text-matrix-green/80 transition-colors font-semibold underline underline-offset-4"
            >
              taypuri@aitelier.com.br
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CSCProcess;
