import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NavigationV2 } from "@/components/NavigationV2";
import { FooterV2 } from "@/components/FooterV2";
import { SectionContainer } from "@/components/SectionContainer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  staggerContainer,
  staggerItem,
} from "@/utils/motionVariantsV2";

interface EntryDoor {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  type: "link" | "form";
}

const entryDoors: EntryDoor[] = [
  {
    id: "estudos",
    title: "ESTUDOS",
    description: "Quero aprender a linguagem",
    cta: "Entrar na lista de espera",
    href: "#estudos-form",
    type: "form",
  },
  {
    id: "studio",
    title: "STUDIO",
    description: "Quero trabalhar com vocês",
    cta: "Iniciar conversa",
    href: "#studio-form",
    type: "form",
  },
  {
    id: "conselheiros",
    title: "CONSELHEIROS",
    description: "Quero acessar as mentes",
    cta: "Conhecer os conselheiros",
    href: "/atelier#conselheiros",
    type: "link",
  },
  {
    id: "newsletter",
    title: "APENAS ACOMPANHAR",
    description: "Quero receber os ensaios",
    cta: "Entrar para a newsletter",
    href: "#newsletter-form",
    type: "form",
  },
];

const EntryDoorCard = ({ door }: { door: EntryDoor }) => {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (door.type === "form") {
      document.querySelector(door.href)?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <motion.div
      variants={prefersReducedMotion ? {} : staggerItem}
      className="p-8 border border-[#666666]/20
                 hover:border-[#666666]/40 transition-colors
                 bg-stone-dark/30"
    >
      <h3 className="font-mono-v2 text-sm tracking-widest text-[#666666] mb-4">
        {door.title}
      </h3>

      <p className="text-lg text-ancestral-white mb-6">{door.description}</p>

      {door.type === "link" ? (
        <Link
          to={door.href}
          className="inline-block text-sm font-mono-v2 text-ancestral-amber
                     hover:text-ancestral-white transition-colors"
        >
          [{door.cta}] →
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className="text-sm font-mono-v2 text-ancestral-amber
                     hover:text-ancestral-white transition-colors"
        >
          [{door.cta}]
        </button>
      )}
    </motion.div>
  );
};

const ContactV2 = () => {
  useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-ancestral-black">
      <NavigationV2 />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-8 px-6">
          <div className="max-w-[1400px] mx-auto">
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              className="font-display text-display-1 text-ancestral-white mb-8"
            >
              Entrar no ai.telier
            </motion.h1>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { delay: 0.2 }}
              className="max-w-xl space-y-4 text-lg"
            >
              <p className="text-[#a0a0a0]">
                AI.TELIER não é para todo mundo.
                <br />E não deveria ser.
              </p>
              <p className="text-ancestral-white">
                Se você chegou até aqui,
                <br />
                uma dessas portas pode fazer sentido:
              </p>
            </motion.div>
          </div>
        </section>

        {/* Entry Doors */}
        <SectionContainer>
          <motion.div
            variants={prefersReducedMotion ? {} : staggerContainer}
            initial={prefersReducedMotion ? {} : "hidden"}
            animate={prefersReducedMotion ? {} : "visible"}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl"
          >
            {entryDoors.map((door) => (
              <EntryDoorCard key={door.id} door={door} />
            ))}
          </motion.div>
        </SectionContainer>

        {/* Forms */}
        <SectionContainer>
          {/* Studio Form */}
          <div id="studio-form" className="py-16 border-t border-[#666666]/20">
            <h3 className="font-mono-v2 text-sm text-[#666666] mb-8">STUDIO</h3>
            <div className="max-w-xl space-y-6">
              <p className="text-[#a0a0a0]">
                Envie uma mensagem contando sobre você e seu projeto.
              </p>
              <a
                href="mailto:studio@ai.telier?subject=Interesse%20no%20Studio"
                className="inline-block px-6 py-3 border border-ancestral-white
                         text-ancestral-white hover:bg-ancestral-white
                         hover:text-ancestral-black transition-all
                         font-mono-v2 text-sm"
              >
                [Enviar email]
              </a>
            </div>
          </div>

          {/* Estudos Form */}
          <div id="estudos-form" className="py-16 border-t border-[#666666]/20">
            <h3 className="font-mono-v2 text-sm text-[#666666] mb-8">
              ESTUDOS
            </h3>
            <div className="max-w-xl space-y-6">
              <p className="text-[#a0a0a0]">
                Entre na lista para ser avisado sobre próximas turmas.
              </p>
              <a
                href="mailto:estudos@ai.telier?subject=Lista%20de%20Espera%20-%20Estudos"
                className="inline-block px-6 py-3 border border-ancestral-white
                         text-ancestral-white hover:bg-ancestral-white
                         hover:text-ancestral-black transition-all
                         font-mono-v2 text-sm"
              >
                [Entrar na lista]
              </a>
            </div>
          </div>

          {/* Newsletter Form */}
          <div
            id="newsletter-form"
            className="py-16 border-t border-[#666666]/20"
          >
            <h3 className="font-mono-v2 text-sm text-[#666666] mb-8">
              NEWSLETTER
            </h3>
            <div className="max-w-xl space-y-6">
              <p className="text-[#a0a0a0]">
                Receba ensaios e pensamentos do ai.telier.
              </p>
              <a
                href="mailto:newsletter@ai.telier?subject=Inscrição%20na%20Newsletter"
                className="inline-block px-6 py-3 border border-ancestral-white
                         text-ancestral-white hover:bg-ancestral-white
                         hover:text-ancestral-black transition-all
                         font-mono-v2 text-sm"
              >
                [Assinar]
              </a>
            </div>
          </div>
        </SectionContainer>

        {/* Contact Info */}
        <SectionContainer className="py-16">
          <div
            className="flex flex-col md:flex-row gap-8 text-[#666666]
                          font-mono-v2 text-sm"
          >
            <a
              href="mailto:contato@ai.telier"
              className="hover:text-ancestral-white transition-colors"
            >
              contato@ai.telier
            </a>
            <a
              href="https://instagram.com/ai.telier"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ancestral-white transition-colors"
            >
              @ai.telier
            </a>
          </div>
        </SectionContainer>
      </main>

      <FooterV2 />
    </div>
  );
};

export default ContactV2;
