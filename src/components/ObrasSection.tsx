import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { ImageModal, type ImageModalData } from "@/components/ImageModal";

// Project Card
const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: PortfolioProject;
  index: number;
  onClick: () => void;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-stone-dark mb-4">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover filter contrast-110 saturate-90
                     group-hover:scale-105 transition-transform duration-700"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-ancestral-black/0 group-hover:bg-ancestral-black/30 transition-colors duration-300" />

        {/* Image count badge */}
        <div className="absolute bottom-3 right-3 bg-ancestral-black/70 px-2 py-1
                        font-mono-v2 text-xs text-ancestral-white/80">
          {project.images.length} imagens
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl text-ancestral-white group-hover:text-ancestral-amber transition-colors">
            {project.title}
          </h3>
          <span className="font-mono-v2 text-xs text-text-muted flex-shrink-0">
            {project.year}
          </span>
        </div>

        <p className="font-mono-v2 text-xs text-ancestral-amber/80 tracking-wider uppercase">
          {project.type}
        </p>

        <p className="text-text-secondary text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
};

export const ObrasSection = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [filter, setFilter] = useState<"all" | "artes-visuais" | "historias">("all");

  const filteredProjects = filter === "all"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === filter);

  // Group by year
  const projectsByYear = filteredProjects.reduce((acc, project) => {
    if (!acc[project.year]) acc[project.year] = [];
    acc[project.year].push(project);
    return acc;
  }, {} as Record<number, PortfolioProject[]>);

  const years = Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);

  // Transform project images for modal
  const modalImages: ImageModalData[] = useMemo(() => {
    if (!selectedProject) return [];

    return selectedProject.images.map((src, index) => ({
      id: `${selectedProject.id}-${index}`,
      src,
      title: `${selectedProject.title} ${index + 1}/${selectedProject.images.length}`,
      category: selectedProject.type,
      year: selectedProject.year,
      description: selectedProject.description,
      projectTitle: selectedProject.title,
    }));
  }, [selectedProject]);

  const handleProjectClick = (project: PortfolioProject) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };

  const handleNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };

  return (
    <>
      <div className="space-y-12">
        {/* Header with filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-text-secondary text-lg">
              Projetos autorais de arte visual e narrativa.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-4 font-mono-v2 text-xs">
            {[
              { key: "all", label: "Todos" },
              { key: "artes-visuais", label: "Artes Visuais" },
              { key: "historias", label: "Histórias" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={cn(
                  "transition-colors",
                  filter === key
                    ? "text-ancestral-amber"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                [{label}]
              </button>
            ))}
          </div>
        </div>

        {/* Projects by year */}
        {years.map((year) => (
          <section key={year}>
            {/* Year header */}
            <div className="border-b border-text-muted/20 pb-3 mb-8">
              <h2 className="font-mono-v2 text-sm text-text-muted">{year}</h2>
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsByYear[year].map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          </section>
        ))}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-text-muted font-mono-v2 text-sm">
              Nenhum projeto encontrado.
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        images={modalImages}
        currentIndex={selectedImageIndex}
        isOpen={selectedProject !== null}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default ObrasSection;
