import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Manifesto = () => {
  useSmoothScroll();
  useScrollOptimization();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-brutal-black cursor-brutal relative">
      {/* Background Effects Layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="organic-glow" style={{ top: "10%", left: "20%" }} />
        <div className="mesh-gradient-1" />
        <div className="mesh-gradient-2" />
      </div>

      <Navigation />

      <main className="pt-24">
        {/* Hero do Manifesto */}
        <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUpSimple} className="mb-8">
                <span className="code-text text-sm text-matrix-green terminal-flicker">
                  MANIFESTO.TXT
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUpSimple}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-brutal-white uppercase tracking-tighter leading-none mb-8"
              >
                O que<br />
                <span className="text-matrix-green">acreditamos</span>
              </motion.h1>

              <motion.div variants={fadeInUpSimple}>
                <div className="w-32 h-px bg-matrix-green matrix-glow" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* O Problema */}
        <Section title="O PROBLEMA" code="01">
          <p className="text-2xl md:text-4xl font-bold text-brutal-white leading-tight mb-8">
            A maioria das pessoas competentes hoje{" "}
            <span className="text-matrix-green">vive abaixo da própria complexidade.</span>
          </p>
          <div className="space-y-6 text-lg md:text-xl text-brutal-white/80 leading-relaxed">
            <p>
              Não por falta de talento. Mas porque os modelos disponíveis exigem simplificação, personagem e conformidade.
            </p>
            <p>
              Você até consegue jogar o jogo. Mas sente que algo está errado.
            </p>
            <p className="text-matrix-green font-medium">
              Fingir ser normal cansa. Fingir ser genérico mata.
            </p>
            <p>
              Enquanto isso, a inteligência artificial avança e torna irrelevante tudo que é repetitivo, raso ou copiável.
            </p>
            <p>
              O que sobra é o insubstituível — mas quase ninguém sabe como expressar isso publicamente.
            </p>
          </div>
        </Section>

        {/* A Visão */}
        <Section title="A VISÃO" code="02">
          <p className="text-2xl md:text-4xl font-bold text-brutal-white leading-tight mb-8">
            Se a IA faz igual,{" "}
            <span className="text-matrix-green">não é o seu trabalho.</span>
          </p>
          <div className="space-y-6 text-lg md:text-xl text-brutal-white/80 leading-relaxed">
            <p>
              O trabalho humano agora é: <span className="text-matrix-green">pensamento, visão, síntese, linguagem, presença.</span>
            </p>
            <p>
              Isso não se resolve com mais conteúdo. Se resolve com mais clareza sobre quem você é.
            </p>
          </div>
        </Section>

        {/* O Que Somos */}
        <Section title="O QUE SOMOS" code="03">
          <p className="text-2xl md:text-4xl font-bold text-brutal-white leading-tight mb-8">
            AI.TELIER é um studio onde marcas pessoais são tratadas como{" "}
            <span className="text-matrix-green">obras vivas.</span>
          </p>
          <div className="space-y-6 text-lg md:text-xl text-brutal-white/80 leading-relaxed">
            <p>
              Trabalhamos com fundadores, experts e criadores que já têm densidade interna, mas não conseguem traduzir isso em presença pública, linguagem e negócio.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="border-l-2 border-matrix-green pl-6">
              <p className="text-brutal-white font-bold">Não criamos personagens.</p>
            </div>
            <div className="border-l-2 border-matrix-green pl-6">
              <p className="text-brutal-white font-bold">Não seguimos tendências.</p>
            </div>
            <div className="border-l-2 border-matrix-green pl-6">
              <p className="text-brutal-white font-bold">Não vendemos fórmulas.</p>
            </div>
          </div>
          <div className="mt-12">
            <p className="poetic-text text-xl md:text-2xl text-brutal-white/70">
              Organizamos identidades complexas em arquiteturas claras de expressão, narrativa e negócio.
            </p>
            <p className="text-lg text-matrix-green mt-6 font-medium">
              Usamos inteligência artificial como extensão criativa. Nunca como atalho.
            </p>
          </div>
        </Section>

        {/* Como Trabalhamos - Brand OS */}
        <Section title="COMO TRABALHAMOS" code="04">
          <p className="text-2xl md:text-3xl font-bold text-matrix-green uppercase tracking-tight mb-12">
            BRAND OS
          </p>
          <p className="text-lg md:text-xl text-brutal-white/70 mb-12">
            O sistema operacional da sua identidade.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8">
              <span className="code-text text-sm text-matrix-green">01</span>
              <h3 className="text-xl font-bold text-brutal-white uppercase mt-4 mb-4">Mapeamento</h3>
              <p className="text-brutal-white/70">
                Entendemos a pessoa antes da marca. Visão, contradições, limites, potência e verdade.
              </p>
            </div>
            <div className="glass p-8">
              <span className="code-text text-sm text-matrix-green">02</span>
              <h3 className="text-xl font-bold text-brutal-white uppercase mt-4 mb-4">Direção</h3>
              <p className="text-brutal-white/70">
                Transformamos identidade em narrativa, linguagem e posicionamento público.
              </p>
            </div>
            <div className="glass p-8">
              <span className="code-text text-sm text-matrix-green">03</span>
              <h3 className="text-xl font-bold text-brutal-white uppercase mt-4 mb-4">Manifestação</h3>
              <p className="text-brutal-white/70">
                Marca, imagem, estética e expressão visual coerente. Do rascunho ao frame final.
              </p>
            </div>
            <div className="glass p-8">
              <span className="code-text text-sm text-matrix-green">04</span>
              <h3 className="text-xl font-bold text-brutal-white uppercase mt-4 mb-4">Sustentação</h3>
              <p className="text-brutal-white/70">
                Um sistema vivo que gera conteúdo a partir do código-fonte. Sempre coerente. Sempre evoluindo.
              </p>
            </div>
          </div>
        </Section>

        {/* A Infraestrutura */}
        <Section title="A INFRAESTRUTURA" code="05">
          <p className="text-2xl md:text-4xl font-bold text-brutal-white leading-tight mb-8">
            Não operamos como{" "}
            <span className="text-matrix-green">agência tradicional.</span>
          </p>
          <div className="space-y-6 text-lg md:text-xl text-brutal-white/80 leading-relaxed">
            <p>
              Sem equipe grande. Sem ruído. Sem burocracia.
            </p>
            <p>
              Criamos um sistema enxuto que funciona como antiagência: você recebe direção criativa, conteúdo estruturado e presença contínua — sem depender de inspiração, sem terceirizar pensamento.
            </p>
            <p className="text-matrix-green font-medium">
              O motor roda. A essência permanece.
            </p>
          </div>
        </Section>

        {/* Para Quem É */}
        <Section title="PARA QUEM É" code="06">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="code-text text-sm text-matrix-green mb-6">É PARA QUEM</p>
              <ul className="space-y-4 text-lg text-brutal-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-matrix-green text-xl">→</span>
                  <span>Tem profundidade mas ela não aparece</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-matrix-green text-xl">→</span>
                  <span>Quer se diferenciar sem virar personagem</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-matrix-green text-xl">→</span>
                  <span>Busca algo que dure</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="code-text text-sm text-brutal-white/50 mb-6">NÃO É PARA QUEM</p>
              <ul className="space-y-4 text-lg text-brutal-white/50">
                <li className="flex items-start gap-3">
                  <span className="text-brutal-white/30 text-xl">×</span>
                  <span>Quer fórmula pronta</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brutal-white/30 text-xl">×</span>
                  <span>Quer viralizar rápido</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brutal-white/30 text-xl">×</span>
                  <span>Quer "postar mais"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brutal-white/30 text-xl">×</span>
                  <span>Terceiriza pensamento</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* CTA Final */}
        <section className="relative py-32 md:py-48 px-4 md:px-8 overflow-hidden">
          <div className="organic-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          <div className="container mx-auto max-w-3xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="poetic-text text-2xl md:text-3xl lg:text-4xl text-brutal-white/90 leading-relaxed mb-12">
                Se você sente que sua marca não expressa quem você é de verdade,
                <br />
                <span className="text-matrix-green">talvez a gente deva conversar.</span>
              </p>
              <a
                href="/contact"
                className="btn-primary inline-flex items-center gap-3"
              >
                <span>Iniciar conversa</span>
              </a>
            </motion.div>

            {/* Quotes flutuantes */}
            <div className="mt-24 space-y-8">
              <p className="code-text text-sm text-brutal-white/40">
                "Extraímos o código-fonte. O sistema faz ele ecoar."
              </p>
              <p className="code-text text-sm text-brutal-white/40">
                "Onde a narrativa vira infraestrutura."
              </p>
              <p className="code-text text-sm text-matrix-green/60">
                "Tech + Ancestral."
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Section Component
const Section = ({
  title,
  code,
  children
}: {
  title: string;
  code: string;
  children: React.ReactNode;
}) => {
  const { ref, isInView } = useInViewOptimized({ once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden border-t border-concrete-border">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto max-w-4xl relative z-10"
      >
        <motion.div variants={fadeInUpSimple} className="flex items-center gap-4 mb-12">
          <span className="code-text text-sm text-matrix-green">{code}</span>
          <div className="h-px bg-concrete-border flex-1" />
          <span className="text-sm text-brutal-white/50 uppercase tracking-widest">{title}</span>
        </motion.div>

        <motion.div variants={fadeInUpSimple}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Manifesto;
