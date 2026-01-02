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
    <section className="relative min-h-screen md:min-h-screen min-h-[85vh] flex flex-col overflow-hidden pt-2 px-4 bg-neutral-0">
      {/* Background with Taynã's image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-neutral-0" />
        <img
          src="/lovable-uploads/hero-tayna-tech.jpg"
          alt="Taynã Puri"
          className="w-full h-full object-cover opacity-40 md:opacity-35 md:object-center object-[85%_20%] grayscale"
        />
        {/* Hard gradient overlay - brutalista */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-0 via-neutral-0/80 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl flex flex-col h-full">
        {/* Logo section */}
        <div
          className={`flex justify-start pt-2 md:pt-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="text-left">
            <img src="/lovable-uploads/logo-aitelier-v2.png" alt="Aitelier" className="h-10 md:h-24 object-contain" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-end md:justify-center items-start pb-16 md:pb-0 pt-[40vh] md:pt-24">
          <div className="text-left space-y-1 md:space-y-4 max-w-4xl w-full">
            {/* Badge */}
            <div
              className={`transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="badge-brutal">ONE PERSON BRAND™</span>
            </div>

            {/* Main Title */}
            <div
              className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mt-4">
                <span className="text-white">Posicionamento estratégico para founders</span>
              </h1>
            </div>

            {/* Subheadline */}
            <div
              className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl leading-tight text-neutral-400 mb-3 md:mb-4">
                Ser reconhecido pelo que sabe, não só pelo que vende.
              </h2>
            </div>

            {/* Accent text */}
            <div
              className={`transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p className="text-neutral-500 text-sm md:text-base">
                Você já construiu o negócio.
              </p>
              <p className="text-olive font-bold text-base sm:text-lg md:text-xl mt-1">
                Agora falta construir sua autoridade.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`flex justify-start pt-4 md:pt-8 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <button
                onClick={openModal}
                className="btn-brutal text-base sm:text-lg md:text-xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center">
                  QUERO APLICAR
                  <ArrowRight className="ml-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom hard line - brutalista */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
    </section>
  );
};

export default HeroSection;
