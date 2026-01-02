import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useCheckoutModal } from "@/contexts/CheckoutModalContext";

const WorkshopHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openCheckoutModal } = useCheckoutModal();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen md:min-h-screen min-h-[85vh] flex flex-col overflow-hidden pt-2 px-4">
      {/* Background with Taynã's image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black-950 via-black-900 to-black-800" />
        <img
          src="/lovable-uploads/hero-tayna-tech.jpg"
          alt="Taynã Puri"
          className="w-full h-full object-cover opacity-50 md:opacity-40 md:object-center object-[85%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-950 via-black-900/60 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl flex flex-col h-full">
        {/* Logo */}
        <div
          className={`flex justify-start pt-2 md:pt-4 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-left">
            <img src="/lovable-uploads/logo-aitelier-v2.png" alt="Aitelier" className="h-10 md:h-24 object-contain" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-end md:justify-center items-start pb-16 md:pb-0 pt-[40vh] md:pt-24">
          <div className="text-left space-y-3 md:space-y-6 max-w-4xl w-full">
            {/* Main Title */}
            <div
              className={`transition-all duration-1200 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 md:mb-6 leading-tight">
                <span className="text-gradient">NEGÓCIO SOLO 2.0</span>
              </h1>
            </div>

            {/* Headline - 2 powerful lines */}
            <div
              className={`transition-all duration-1200 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed text-white space-y-2 md:space-y-3">
                <p>Como Construir Um Negócio de Alto Valor</p>
                <p className="text-emerald-400">Sendo Só Você + IA</p>
              </h2>
            </div>

            {/* Subheadline - smaller explanatory text */}
            <div
              className={`transition-all duration-1200 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
                Alto valor, leveza e sistema — sem equipe, sem agência, sem caos.
              </p>
            </div>

            {/* Info badges */}
            <div
              className={`flex flex-wrap gap-3 text-xs sm:text-sm transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-emerald-400 font-semibold">📅 Sábado 20 e Domingo 21 de Dezembro</span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-white/90">⏰ 14h-20h (horário de Brasília)</span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-white/90">👥 30 vagas</span>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`flex justify-start pt-4 md:pt-6 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
            >
              <button
                onClick={openCheckoutModal}
                className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 text-black-950 font-bold px-8 py-4 text-base sm:text-lg md:text-xl rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-glow-green-strong w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  GARANTIR MINHA VAGA
                  <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopHeroSection;
