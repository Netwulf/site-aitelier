import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Calendar, Clock, Users } from "lucide-react";

// V3 Brutalista: Unica cor de accent
const TECH_OLIVE = "#8dc75e";

const Masterclasses = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const masterclasses = [
    {
      id: "01",
      title: "Storytelling Visual com IA",
      instructor: "Ana Costa",
      date: "15 NOV 2025",
      duration: "3h",
      spots: "12 vagas",
      description: "Construção de narrativas visuais usando Midjourney, DALL-E e técnicas de direção de arte. Do conceito à execução.",
      category: "IMAGEM",
      price: "R$ 480",
      image: "/placeholder.svg",
    },
    {
      id: "02",
      title: "Clone de Voz Autoral",
      instructor: "Marcus Silva",
      date: "22 NOV 2025",
      duration: "2h",
      spots: "8 vagas",
      description: "Criação de voice clones éticos e autorais usando ElevenLabs. Aplicações em podcasts, audiobooks e conteúdo.",
      category: "ÁUDIO",
      price: "R$ 380",
      image: "/placeholder.svg",
    },
    {
      id: "03",
      title: "Vídeo Generativo",
      instructor: "Pedro Almeida",
      date: "29 NOV 2025",
      duration: "4h",
      spots: "10 vagas",
      description: "Runway, Pika e Stable Video. Técnicas avançadas de motion design e edição de vídeo com IA.",
      category: "VÍDEO",
      price: "R$ 580",
      image: "/placeholder.svg",
    },
  ];

  return (
    <section 
      id="masterclasses" 
      className="py-20 md:py-32 bg-brutal-black relative overflow-hidden" 
      ref={ref as any}
    >
      {/* Grid Swiss Background */}
      <div className="absolute inset-0 brutal-grid opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header Editorial */}
        <motion.div 
          className="mb-20 border-l-4 border-matrix-green pl-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="flex items-baseline justify-between mb-4">
            <div className="code-text text-xs">&gt; MASTERCLASSES_2025</div>
            <div className="code-text text-xs">03 WORKSHOPS</div>
          </div>
          <h2 className="text-brutal-white mb-6">
            IMERSÕES<br />PRÁTICAS
          </h2>
          <p className="poetic-text text-lg text-brutal-white/80 max-w-2xl">
            Workshops intensivos com especialistas. Pequenos grupos, execução prática, resultados concretos.
          </p>
        </motion.div>

        {/* Grid Quebrado - Editorial Layout */}
        <div className="grid-editorial">
          {masterclasses.map((master, index) => (
            <motion.div
              key={master.id}
              className={`editorial-card editorial-card-${index + 1} group`}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={prefersReducedMotion ? {} : fadeInUpSimple}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Imagem top (hero do card) */}
              <div className="relative h-48 overflow-hidden mb-6 image-reveal">
                <img
                  src={master.image}
                  alt={master.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* V3: Overlay com tech-olive */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${TECH_OLIVE}99, transparent)`
                  }}
                />

                {/* Tag sobre a imagem */}
                <div className="absolute top-4 left-4">
                  <div className="category-tag bg-brutal-black/80">{master.category}</div>
                </div>
                
                {/* Numeração no canto */}
                <div className="absolute bottom-4 right-4">
                  <div className="number-swiss text-white">{master.id}</div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="space-y-4">
                <h3 className="text-brutal-white text-2xl md:text-3xl leading-tight">
                  {master.title}
                </h3>

                <div className="brutal-line opacity-30" />

                <p className="poetic-text text-brutal-white/70">
                  {master.description}
                </p>

                {/* Meta info com ícones */}
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-3 text-sm text-matrix-green">
                    <Calendar className="w-4 h-4" />
                    <span className="code-text text-xs">{master.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-matrix-green">
                    <Clock className="w-4 h-4" />
                    <span className="code-text text-xs">{master.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-matrix-green">
                    <Users className="w-4 h-4" />
                    <span className="code-text text-xs">{master.spots}</span>
                  </div>
                </div>

                {/* Footer com instrutor e preço */}
                <div className="flex items-end justify-between pt-6 border-t border-white/10">
                  <div>
                    <div className="text-xs text-concrete uppercase tracking-wider mb-1">
                      Instrutor
                    </div>
                    <div className="text-brutal-white font-medium">
                      {master.instructor}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-matrix-green">
                      {master.price}
                    </div>
                  </div>
                </div>

                {/* Linha de hover */}
                <div className="h-1 bg-matrix-green w-0 transition-all duration-500 group-hover:w-full mt-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="inline-block border-2 border-matrix-green px-8 py-4">
            <p className="code-text text-xs mb-2">ALUNOS DO PROGRAMA TÊM 40% OFF</p>
            <p className="text-brutal-white/60 text-sm">
              Masterclasses são complementares ao programa principal
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Masterclasses;
