import { motion } from "framer-motion";
import { useInViewOptimized } from "@/hooks/useInViewOptimized";
import { fadeInUpSimple } from "@/utils/motionVariants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Play } from "lucide-react";

const VideoShowcase = () => {
  const { ref, isInView } = useInViewOptimized({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const videos = [
    {
      thumbnail: "/placeholder.svg",
      title: "De Sketch a IA: Processo Criativo",
      duration: "2:30",
      category: "PROCESSO",
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Criação de Identidade Visual",
      duration: "3:15",
      category: "CASE STUDY",
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Animação Generativa em Tempo Real",
      duration: "1:45",
      category: "TUTORIAL",
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Bastidores: Workshop São Paulo",
      duration: "4:20",
      category: "EVENTO",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-brutal-black relative overflow-hidden" ref={ref as any}>
      {/* V3: Background effect removed - brutalista */}

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          className="mb-20"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={prefersReducedMotion ? {} : fadeInUpSimple}
        >
          <div className="code-text text-xs mb-4">&gt; VIDEO_SHOWCASE</div>
          <h2 className="text-brutal-white mb-6">
            TRABALHOS<br />EM MOVIMENTO
          </h2>
          <p className="poetic-text text-lg text-brutal-white/70 max-w-2xl">
            Timelapses, processos criativos e bastidores da nossa comunidade criando com IA.
          </p>
        </motion.div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              className="video-card group"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={prefersReducedMotion ? {} : fadeInUpSimple}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Thumbnail com play button */}
              <div className="relative aspect-video overflow-hidden bg-concrete">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-matrix-green flex items-center justify-center">
                    <Play className="w-8 h-8 text-brutal-black fill-brutal-black" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 text-xs text-white backdrop-blur-sm">
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-brutal-black/50 backdrop-blur-sm">
                <span className="text-xs text-matrix-green uppercase tracking-wider">{video.category}</span>
                <h4 className="text-white text-xl mt-2">{video.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
