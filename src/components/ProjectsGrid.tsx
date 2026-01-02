import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ProjectsGrid = () => {
  const prefersReducedMotion = useReducedMotion();

  // Placeholder project images
  const projects = [
    "/assets/projects/project-1.jpg",
    "/assets/projects/project-2.jpg",
    "/assets/projects/project-3.jpg",
    "/assets/projects/project-4.jpg",
  ];

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <h2 className="font-mono-v2 text-sm tracking-widest text-text-muted">
          PROJETOS
        </h2>
        <span className="text-sm text-text-muted">Algumas obras do atelier</span>
      </div>

      <div className="grid grid-cols-2 gap-1">
        {projects.map((src, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? {} : { delay: index * 0.1 }}
            className="aspect-video relative overflow-hidden group bg-stone-dark"
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover
                        filter contrast-110 saturate-90
                        group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
