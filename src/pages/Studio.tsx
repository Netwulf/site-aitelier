import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { fadeInUpSimple, staggerContainer } from "@/utils/motionVariants";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import taynaPuri from "@/assets/tayna-portrait-real.jpg";

const Studio = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-brutal-black cursor-brutal relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="organic-glow" style={{ top: "20%", left: "30%" }} />
        <div className="mesh-gradient-1" />
      </div>

      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container mx-auto max-w-5xl"
          >
            {/* Header */}
            <motion.div variants={fadeInUpSimple} className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="code-text text-sm text-matrix-green terminal-flicker">
                  STUDIO
                </span>
                <div className="h-px bg-concrete-border flex-1" />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brutal-white uppercase tracking-tighter leading-none">
                AI.TELIER
              </h1>
            </motion.div>

            {/* Statement */}
            <motion.div variants={fadeInUpSimple} className="mb-24">
              <p className="poetic-text text-2xl md:text-3xl lg:text-4xl text-brutal-white/90 leading-relaxed max-w-4xl">
                Somos um studio de storytelling e identidade. Trabalhamos com pessoas que
                passaram anos construindo expertise e ainda não sabem se apresentar
                publicamente.
              </p>
              <p className="poetic-text text-xl md:text-2xl text-matrix-green mt-8">
                Criamos identidades que duram.
              </p>
            </motion.div>

            {/* Separator */}
            <motion.div variants={fadeInUpSimple}>
              <div className="w-32 h-px bg-matrix-green matrix-glow mb-24" />
            </motion.div>

            {/* Founder Section */}
            <motion.div variants={fadeInUpSimple} className="grid md:grid-cols-2 gap-12 items-start">
              {/* Founder Photo */}
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden border-2 border-concrete-border hover:border-matrix-green transition-colors duration-500">
                  <img
                    src={taynaPuri}
                    alt="Taynã Puri - Founder AI.TELIER"
                    className="w-full h-full object-cover object-top filter saturate-[0.85] contrast-[1.1] brightness-[0.95]"
                  />
                  {/* Subtle green overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brutal-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-matrix-green/5 mix-blend-screen" />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-matrix-green" />
              </div>

              {/* Bio */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-brutal-white uppercase tracking-tighter mb-2">
                    Taynã Puri
                  </h2>
                  <p className="code-text text-sm text-matrix-green">FOUNDER</p>
                </div>

                <p className="text-brutal-white/80 leading-relaxed">
                  Estrategista de marca e storyteller. Fundou o AI.TELIER para ajudar
                  especialistas a traduzir sua complexidade interna em presença pública
                  autêntica.
                </p>

                <p className="text-brutal-white/60 leading-relaxed">
                  Com background em branding, cinema e tecnologia, desenvolveu uma
                  metodologia que une identidade humana, inteligência artificial e
                  autonomia criativa.
                </p>

                <div className="pt-4">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-concrete">Florianópolis · Curitiba · Brasília · SJC</span>
                    <span className="text-matrix-green">•</span>
                    <a
                      href="https://instagram.com/aitelier.studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-matrix-green hover:text-brutal-white transition-colors"
                    >
                      @aitelier.studio
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Subtle grid */}
          <div className="brutal-grid absolute inset-0 opacity-5" />
        </section>

        {/* Philosophy Section */}
        <section className="relative py-24 px-4 md:px-8 bg-concrete/5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="container mx-auto max-w-4xl text-center"
          >
            <motion.div variants={fadeInUpSimple}>
              <div className="w-24 h-px bg-matrix-green mx-auto mb-12 matrix-glow" />

              <p className="poetic-text text-xl md:text-2xl text-brutal-white/80 leading-relaxed mb-8">
                "Não construímos marcas para parecerem algo.
                <br />
                Construímos marcas para serem o que já são —
                <br />
                só que visíveis."
              </p>

              <div className="w-24 h-px bg-matrix-green mx-auto mt-12 matrix-glow" />
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Studio;
