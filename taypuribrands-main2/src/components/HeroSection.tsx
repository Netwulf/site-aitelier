import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useApplicationModal } from "../contexts/ApplicationModalContext";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useApplicationModal();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("formulario-aplicacao");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen md:min-h-screen min-h-[85vh] flex flex-col overflow-hidden pt-2 px-4">
      {/* Background with Taynã's image and golden filter */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black-950 via-black-900 to-black-800" />
        <img
          src="/lovable-uploads/hero-tayna-tech.jpg"
          alt="Taynã Puri"
          className="w-full h-full object-cover opacity-50 md:opacity-40 md:object-center object-[85%_20%]"
        />
        {/* Subtle gradient overlay - no color filter */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-900/60 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl flex flex-col h-full">
        {/* Logo section - positioned at the very top */}
        <div
          className={`flex justify-start pt-2 md:pt-4 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-left">
            <img src="/lovable-uploads/logo-aitelier-v2.png" alt="Aitelier" className="h-10 md:h-24 object-contain" />
          </div>
        </div>

        {/* Main content - positioned differently on mobile vs desktop */}
        <div className="flex-1 flex flex-col justify-end md:justify-center items-start pb-16 md:pb-0 pt-[40vh] md:pt-24">
          <div className="text-left space-y-1 md:space-y-4 max-w-4xl w-full">
            {/* Main Title */}
            <div
              className={`transition-all duration-1200 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-3 md:mb-6 leading-tight">
                <span className="text-white">12 DIVERGENTES. 12 MARCAS. 12 NEGÓCIOS.</span>
              </h1>
            </div>

            {/* Main Headline */}
            <div
              className={`transition-all duration-1200 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight text-white/90 mb-3 md:mb-4">
                Eu construo sua marca e seu negócio <span className="text-gradient">COM você</span>.
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed">
                Em 90 dias, você sai com narrativa, Brand OS™, IA configurada e oferta rodando.
              </p>
            </div>

            {/* Benefits List */}
            <div
              className={`text-xs sm:text-sm md:text-base text-white/70 leading-relaxed space-y-1 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p>✔ Identidade + narrativa única</p>
              <p>✔ Sistema Operacional (Brand OS™) configurado</p>
              <p>✔ Oferta + funil + conteúdo rodando</p>
              <p className="text-emerald-400 font-semibold mt-2">
                One Person Brand. Sem equipe. Sem agência. Sem drama.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`flex justify-start pt-2 md:pt-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
            >
              <button
                onClick={scrollToForm}
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-6 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-glow-green-strong hover:from-emerald-400 hover:to-teal-500 magnetic"
              >
                {/* Content */}
                <span className="relative z-10 flex items-center justify-center text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-extrabold">
                  PREENCHER APLICAÇÃO
                  <ArrowRight className="ml-2 md:ml-4 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 transition-transform group-hover:translate-x-2" />
                </span>

                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping rounded-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-black-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
