import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, BookOpen, ArrowLeft, Sparkles, Feather, User, Brain, Globe } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { InstagramDiagnostic } from "./InstagramDiagnostic";
import { getActiveClones, CloneConfig } from "./CloneChat";

type ToolId = "instagram" | null;

interface Tool {
  id: ToolId;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  status: "active" | "coming_soon";
}

// Icon mapping for clones
const CLONE_ICONS: Record<string, React.ReactNode> = {
  Feather: <Feather className="w-6 h-6" />,
  User: <User className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
};

// Static tools (non-clone)
const staticTools: Tool[] = [
  {
    id: "instagram",
    name: "Diagnostico de Presenca",
    category: "BRANDING",
    description: "Analise de perfil Instagram com IA. Descubra como voce e percebido.",
    icon: <Instagram className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop",
    status: "active",
  },
];

const PlaygroundTools = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<ToolId>(null);
  const prefersReducedMotion = useReducedMotion();

  // Get active clones from config
  const clones = getActiveClones();

  const handleBack = () => setActiveTool(null);

  // Navigate to fullscreen chat
  const handleCloneClick = (clone: CloneConfig) => {
    navigate(`/chat/${clone.id}`);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* Tool Selection Grid */}
          {activeTool === null && (
            <motion.div
              key="grid"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <span className="font-mono-v2 text-xs tracking-widest text-tech-olive mb-4 block">
                  FERRAMENTAS_EXPERIMENTAIS
                </span>
                <h2 className="text-2xl md:text-3xl font-display text-warm-ivory mb-3">
                  Escolha uma ferramenta
                </h2>
                <p className="text-warm-ivory/50 max-w-md mx-auto">
                  Experimentos que criamos. Alguns funcionam, outros surpreendem.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Static Tools */}
                {staticTools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    onClick={() => tool.status === "active" && setActiveTool(tool.id)}
                    disabled={tool.status === "coming_soon"}
                    className={`group relative overflow-hidden border border-white/10
                              text-left transition-all duration-300
                              ${tool.status === "active"
                                ? "hover:border-tech-olive cursor-pointer"
                                : "opacity-50 cursor-not-allowed"}`}
                    whileHover={tool.status === "active" ? { scale: 1.02 } : {}}
                    whileTap={tool.status === "active" ? { scale: 0.98 } : {}}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-full h-full object-cover grayscale contrast-125
                                 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-2 py-1 bg-tech-olive text-void-black text-[10px] font-mono-v2 tracking-wider">
                          {tool.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 border border-white/20
                                    flex items-center justify-center text-warm-ivory/70
                                    group-hover:border-tech-olive group-hover:text-tech-olive
                                    transition-colors">
                        {tool.icon}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl text-warm-ivory mb-2
                                   group-hover:text-tech-olive transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-warm-ivory/50 text-sm leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 border-2 border-tech-olive opacity-0
                                  group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.button>
                ))}

                {/* AI Clone Cards - Navigate to fullscreen */}
                {clones.map((clone) => (
                  <motion.button
                    key={clone.id}
                    onClick={() => handleCloneClick(clone)}
                    className="group relative overflow-hidden border border-white/10
                              text-left transition-all duration-300
                              hover:border-tech-olive cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      {/* Full-size image background */}
                      {clone.avatar.type === "image" && clone.avatar.imageUrl ? (
                        <img
                          src={clone.avatar.imageUrl}
                          alt={clone.name}
                          className="w-full h-full object-cover object-top grayscale contrast-125
                                   group-hover:grayscale-0 transition-all duration-500
                                   group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10
                                        flex items-center justify-center text-tech-olive">
                            {clone.avatar.type === "icon" && CLONE_ICONS[clone.avatar.icon || "User"]}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2 py-1 bg-tech-olive text-void-black text-[10px] font-mono-v2 tracking-wider">
                          MENTOR
                        </span>
                        <span className="px-2 py-1 bg-white/10 text-warm-ivory text-[10px] font-mono-v2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> AI
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl text-warm-ivory mb-2
                                   group-hover:text-tech-olive transition-colors">
                        {clone.name}
                      </h3>
                      <p className="text-warm-ivory/50 text-sm leading-relaxed">
                        {clone.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 border-2 border-tech-olive opacity-0
                                  group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Instagram Diagnostic Tool */}
          {activeTool === "instagram" && (
            <motion.div
              key="instagram"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-warm-ivory/50 hover:text-tech-olive
                         font-mono-v2 text-sm mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para ferramentas
              </button>
              <InstagramDiagnostic variant="archive" />
            </motion.div>
          )}

          {/* AI Clones now navigate to /chat/:cloneId for fullscreen experience */}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PlaygroundTools;
