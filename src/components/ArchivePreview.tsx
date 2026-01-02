import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionContainer } from "./SectionContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getFeaturedImages } from "@/data/galleryData";

// Get featured images from unified gallery data
const featuredImages = getFeaturedImages();

export const ArchivePreview = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer number={4}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted mb-2">
            GALERIA
          </h2>
          <p className="text-lg text-text-secondary">Obras, Cinema e Imagem</p>
        </div>
        <Link
          to="/galeria"
          onClick={() => window.scrollTo(0, 0)}
          className="text-base text-ancestral-amber hover:text-ancestral-white
                      transition-colors font-mono-v2"
        >
          [Ver Galeria] →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {featuredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
            className="aspect-[16/9] relative overflow-hidden group bg-stone-dark"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover cinematic-filter
                        group-hover:scale-105 transition-all duration-500"
            />
            <div
              className="absolute inset-0 bg-ancestral-black/30
                           group-hover:bg-transparent transition-colors duration-500"
            />
            {/* Hover overlay with title */}
            <div
              className="absolute inset-0 flex items-end justify-start p-3
                         opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="font-mono-v2 text-xs text-ancestral-white/80">
                {image.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default ArchivePreview;
