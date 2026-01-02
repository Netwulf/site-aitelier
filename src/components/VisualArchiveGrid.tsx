import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Heart } from "lucide-react";
import {
  getFullArchiveImages,
  getCategories,
  getGalleryStats,
  categoryLabels,
  type GalleryCategory,
} from "@/data/galleryData";
import { ImageModal, type ImageModalData } from "@/components/ImageModal";
import { useAllLikes } from "@/hooks/useLikes";

// Get all archive images (gallery + portfolio)
const allArchiveImages = getFullArchiveImages();
const categories = getCategories();
const stats = getGalleryStats();

const CategoryFilter = ({
  active,
  onSelect,
}: {
  active: GalleryCategory | "all";
  onSelect: (cat: GalleryCategory | "all") => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect("all")}
        className={`px-3 py-1 text-xs font-mono-v2 tracking-wider transition-colors
          ${
            active === "all"
              ? "bg-ancestral-amber text-ancestral-black"
              : "bg-stone-dark text-text-secondary hover:text-ancestral-white"
          }`}
      >
        TODOS
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 text-xs font-mono-v2 tracking-wider transition-colors
            ${
              active === cat
                ? "bg-ancestral-amber text-ancestral-black"
                : "bg-stone-dark text-text-secondary hover:text-ancestral-white"
            }`}
        >
          {categoryLabels[cat].toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export const VisualArchiveGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">(
    "all"
  );
  const prefersReducedMotion = useReducedMotion();

  const filteredImages =
    activeCategory === "all"
      ? allArchiveImages
      : allArchiveImages.filter((img) => img.category === activeCategory);

  // Transform to modal format with unique IDs
  const modalImages: ImageModalData[] = useMemo(
    () =>
      filteredImages.map((img, index) => ({
        id: `${img.category}-${index}-${img.src.split("/").pop()}`,
        src: img.src,
        title: img.title,
        category: img.category,
        year: img.year,
      })),
    [filteredImages]
  );

  // Get likes for all images
  const artworkIds = useMemo(() => modalImages.map((img) => img.id), [modalImages]);
  const likesMap = useAllLikes(artworkIds);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleNavigate = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      {/* Intro text */}
      <div className="mb-8">
        <p className="text-text-secondary text-lg">
          Galeria visual completa - imagens, cinema e obra.
        </p>
        <p className="text-text-muted text-sm mt-2">
          {stats.total} imagens | {stats.gallery} galeria | {stats.portfolio}{" "}
          portfolio | {stats.featured} featured
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
        {filteredImages.map((image, index) => {
          const imageId = modalImages[index]?.id;
          const likeCount = likesMap[imageId] || 0;

          return (
            <motion.div
              key={`${image.category}-${index}`}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? {} : { delay: index * 0.02 }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <div className="relative overflow-hidden bg-stone-dark">
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  className="w-full filter contrast-110 saturate-90
                            group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Grain overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Hover overlay with title, category, and likes */}
                <div
                  className="absolute inset-0 bg-ancestral-black/0
                            group-hover:bg-ancestral-black/40 transition-colors
                            flex flex-col items-start justify-end p-3"
                >
                  <span
                    className="font-mono-v2 text-xs text-ancestral-white/0
                                  group-hover:text-ancestral-white/80 transition-colors"
                  >
                    {image.title}
                  </span>
                  <div className="flex items-center justify-between w-full mt-1">
                    <span
                      className="font-mono-v2 text-[10px] text-ancestral-amber/0
                                    group-hover:text-ancestral-amber/60 transition-colors"
                    >
                      {image.category} • {image.year}
                    </span>
                    {likeCount > 0 && (
                      <span
                        className="flex items-center gap-1 text-ancestral-amber/0
                                      group-hover:text-ancestral-amber/60 transition-colors"
                      >
                        <Heart className="w-3 h-3" />
                        <span className="font-mono-v2 text-[10px]">{likeCount}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Image Modal */}
      <ImageModal
        images={modalImages}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default VisualArchiveGrid;
