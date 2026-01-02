import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Service {
  title: string;
  tagline: string;
  image: string;
}

interface Movement {
  number: string;
  title: string;
  subtitle: string;
  services: Service[];
}

const movements: Movement[] = [
  {
    number: "01",
    title: "OBRA",
    subtitle: "Impacto",
    services: [
      {
        title: "Filme-Manifesto",
        tagline: "História como cinema.",
        image: "/hero-options/hero-darkroom-reveal.png",
      },
      {
        title: "Ensaio Arquetípico",
        tagline: "Retrato profundo.",
        image: "/tayna-portraits/tayna-studio-contemplative.png",
      },
    ],
  },
  {
    number: "02",
    title: "LINGUAGEM",
    subtitle: "Essência",
    services: [
      {
        title: "Storytelling & Narrativa",
        tagline: "História organizada.",
        image: "/hero-options/hero-weaver-threads.png",
      },
      {
        title: "Direção Criativa",
        tagline: "Olhar externo com profundidade.",
        image: "/hero-options/hero-atelier-workspace.png",
      },
    ],
  },
  {
    number: "03",
    title: "SISTEMA",
    subtitle: "Continuidade",
    services: [
      {
        title: "Brand OS",
        tagline: "Sistema operacional da marca.",
        image: "/hero-options-v2/hero-brutalist-tunnel.png",
      },
      {
        title: "Plataformas & Sites",
        tagline: "Presença digital narrativa.",
        image: "/hero-options/hero-atelier-workspace.png",
      },
    ],
  },
];

export const StudioServices = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 px-6 bg-ancestral-black">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-mono-v2 text-sm text-text-muted tracking-widest mb-4">
            O QUE FAZEMOS
          </p>
          <h2 className="text-3xl md:text-4xl text-ancestral-white leading-tight max-w-2xl mb-6">
            Cada história pede uma forma.
            <br />
            <span className="text-ancestral-amber">Estas são as nossas.</span>
          </h2>
          <p className="font-mono-v2 text-sm text-ancestral-amber/70">
            // Aqui a entrega não é "branding". É direção + obra + sistema.
          </p>
        </div>

        {/* Movements - 3 grouped sections */}
        <div className="space-y-16">
          {movements.map((movement, movementIndex) => (
            <motion.div
              key={movement.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: movementIndex * 0.1 }}
            >
              {/* Movement Header */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono-v2 text-4xl md:text-5xl font-bold text-ancestral-amber/30">
                  {movement.number}
                </span>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-ancestral-white">
                    {movement.title}
                  </h3>
                  <p className="font-mono-v2 text-sm text-ancestral-amber">
                    {movement.subtitle}
                  </p>
                </div>
                <div className="h-px bg-ancestral-amber/20 flex-1" />
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {movement.services.map((service, serviceIndex) => (
                  <div key={service.title} className="group">
                    <div className="relative h-[280px] md:h-[320px] overflow-hidden border border-text-muted/20 group-hover:border-ancestral-amber/50 transition-colors duration-500">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ancestral-black via-ancestral-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-xl md:text-2xl font-display text-ancestral-white mb-2">
                          {service.title}
                        </h4>
                        <p className="text-base text-ancestral-amber">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note with canonical phrase */}
        <motion.div
          className="mt-16 pt-8 border-t border-text-muted/20"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-text-muted text-sm max-w-xl mb-4">
            Nem todo projeto usa tudo. Alguns pedem só um filme. Outros pedem o sistema inteiro.
            <br />
            <span className="text-ancestral-white">Conversamos antes.</span>
          </p>
          <p className="font-mono-v2 text-sm text-ancestral-amber/70">
            // Conteúdo passa. Obra fica.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StudioServices;
