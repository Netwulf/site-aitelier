import React, { useEffect, useRef, useState } from "react";
const ProfileSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      },
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-black-950 via-black-900 to-black-800"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              QUEM <span className="text-gradient">ENSINA</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              <div className="relative">
                {/* Main Image */}
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
                  {/* Glow Effect Behind Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-teal-400/20 to-transparent z-10" />

                  <img
                    src="/lovable-uploads/tayna-profile-new.jpg"
                    alt="Taynã Puri"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-2">TAYNÃ PURI</h3>
                <p className="text-emerald-400 font-semibold text-lg mb-6">
                  Indígena Puri + Tech + Ancestral + Fundador AI.TELIER
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                <p>
                  7 anos construindo negócios nos bastidores.
                  <br />
                  Zero presença online. Zero marketing.
                </p>

                <p>Como?</p>
                <p>
                  Eu não vendia consultoria.
                  <br />
                  Vendia algo que não existe no mercado:
                  <br />
                  <span className="text-white font-semibold">perspectiva única.</span>
                </p>
                <p>
                  Passei no ITA aos 15.
                  <br />
                  Fui fazer cinema.
                  <br />
                  CEO aos 25. Burnout aos 27.
                </p>
                <p>Reconstruí do zero.</p>
                <p>
                  Múltiplos negócios de 6 dígitos. Zero funcionários. 4 horas por dia.
                  <br />
                </p>
                <p>
                  Não porque tenho método mágico.
                  <br />
                  Porque descobri uma verdade:
                </p>
                <p className="text-white font-medium">
                  Seu negócio solo não precisa de mais técnica.
                  <br />
                  Precisa de mais você.
                </p>
              </div>

              {/* Quote */}
              <div className="border-l-4 border-emerald-500 pl-6 py-4 bg-black-800/40 rounded-r-xl">
                <p className="text-xl md:text-2xl font-bold text-white italic">
                  "Não ensino você a se encaixar.
                  <br />
                  <span className="text-gradient">Ensino você a criar o seu próprio sistema.</span>"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfileSection;
