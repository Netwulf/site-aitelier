import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import { useCheckoutModal } from "@/contexts/CheckoutModalContext";

const FinalCTASection = () => {
  const { openCheckoutModal } = useCheckoutModal();

  const scrollToInvestment = () => {
    const element = document.getElementById("investimento");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-4 section-light">
      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="accent-bar-lg mx-auto" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-neutral-0">ÚLTIMA COISA</span>
          </h2>
        </div>

        {/* The choice */}
        <div className="card-brutal-light mb-10">
          <p className="text-xl md:text-2xl font-bold text-neutral-0 mb-6 text-center">
            Você pode continuar:
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "Criando conteúdo sem clareza",
              "Tentando vender sem narrativa",
              "Se sentindo genérico",
              "Travando na hora de explicar o que faz",
              "Cobrando menos do que vale"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-neutral-300 mt-2 flex-shrink-0" />
                <span className="text-neutral-400">{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-xl md:text-2xl font-bold text-neutral-0 text-center mb-4">
            Ou pode investir 2 dias pra estruturar isso de forma definitiva.
          </p>

          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-olive">
              Implementação real.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={openCheckoutModal}
            className="btn-brutal text-base md:text-lg"
          >
            <span className="flex items-center justify-center">
              QUERO MINHA VAGA
              <ArrowRight className="ml-3 w-5 h-5" />
            </span>
          </button>

          <button
            onClick={scrollToInvestment}
            className="btn-brutal-outline border-neutral-0 text-neutral-0 hover:bg-neutral-0 hover:text-neutral-800 text-base md:text-lg"
          >
            <span className="flex items-center justify-center">
              VER OPÇÕES
            </span>
          </button>
        </div>

        {/* Contact */}
        <div className="border-2 border-neutral-0 p-6 text-center">
          <p className="text-neutral-0 flex flex-wrap items-center justify-center gap-2">
            <Mail className="w-5 h-5" />
            <span>Dúvidas?</span>
            <a
              href="https://instagram.com/taypuri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-olive hover:text-olive-600 transition-colors font-semibold underline underline-offset-4"
            >
              @taypuri
            </a>
            <span>ou</span>
            <a
              href="mailto:taypuri@aitelier.com.br"
              className="text-olive hover:text-olive-600 transition-colors font-semibold underline underline-offset-4"
            >
              taypuri@aitelier.com.br
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
