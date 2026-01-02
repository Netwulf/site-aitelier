import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, ArrowRight, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";

// LocalStorage keys for auto-fill
const STORAGE_KEY = "aitelier_waitlist_user";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  duration: string;
  level: string;
  tag: string;
  topics: string[];
  comingSoon?: boolean;
}

const courses: Course[] = [
  {
    id: "zero-one",
    title: "ZERO→ONE",
    subtitle: "Matéria e Forma",
    description: "O curso base. Pensamento de arte, storytelling fundamental, criação consciente.",
    longDescription: "A fundação para qualquer pessoa que queira criar. Do vazio à forma, do pensamento à matéria. Este curso é o ponto de partida — onde você aprende a linguagem universal da criação antes de escolher seu instrumento. Filosofia, estética, narrativa e consciência criativa.",
    image: "/courses/zero-one.png",
    duration: "12 semanas",
    level: "Fundação",
    tag: "BASE",
    topics: ["Filosofia da criação", "Pensamento visual", "Storytelling base", "Estética consciente", "Processo criativo"],
  },
  {
    id: "storycraft",
    title: "STORYCRAFT",
    subtitle: "Narrativa como Arma",
    description: "Domine a arte do storytelling. Estrutura, arco, tensão, catarse.",
    longDescription: "Storytelling não é técnica — é poder. Aprenda a construir narrativas que transformam, que movem, que ficam. Da estrutura clássica às rupturas contemporâneas. Arco de personagem, tensão, ritmo, catarse. Conte histórias que mudam quem ouve.",
    image: "/courses/storycraft.png",
    duration: "8 semanas",
    level: "Intermediário",
    tag: "STORYTELLING",
    topics: ["Estrutura narrativa", "Arco de personagem", "Tensão e ritmo", "Diálogo", "Catarse"],
  },
  {
    id: "soundscape",
    title: "SOUNDSCAPE",
    subtitle: "Música & Trilha com IA",
    description: "Criação de trilhas sonoras, música ambiente, sound design.",
    longDescription: "O som é a narrativa invisível. Aprenda a criar trilhas sonoras, música ambiente e sound design usando inteligência artificial. Do silêncio à emoção, do ruído à harmonia. Transforme atmosferas com som.",
    image: "/courses/soundscape.png",
    duration: "6 semanas",
    level: "Todos os níveis",
    tag: "ÁUDIO",
    topics: ["Composição com IA", "Sound design", "Trilha sonora", "Música ambiente", "Mixagem básica"],
  },
  {
    id: "vibe-code",
    title: "VIBE.CODE",
    subtitle: "Programação Criativa",
    description: "Code como expressão artística. Vibe coding, prototipagem rápida.",
    longDescription: "Programação não é só lógica — é criação. Aprenda vibe coding: a arte de construir ferramentas, experiências e protótipos usando código como meio expressivo. Sem terror, sem complexidade desnecessária. Código que cria código.",
    image: "/courses/vibe-code.png",
    duration: "8 semanas",
    level: "Iniciante",
    tag: "CODE",
    topics: ["Fundamentos criativos", "Vibe coding", "Prototipagem rápida", "Automação criativa", "IA como copiloto"],
  },
  {
    id: "cinema-sem-cameras",
    title: "CINEMA SEM CÂMERAS",
    subtitle: "Filme 100% IA",
    description: "Produza filmes completos sem equipamento. Direção com IA.",
    longDescription: "O futuro do cinema não precisa de câmeras. Aprenda a dirigir, produzir e finalizar filmes completos usando apenas inteligência artificial. Cinematografia, direção de arte, edição — tudo sem equipamento físico. Visão pura.",
    image: "/courses/cinema-sem-cameras.png",
    duration: "10 semanas",
    level: "Intermediário",
    tag: "CINEMA",
    topics: ["Direção com IA", "Cinematografia virtual", "Storyboard", "Edição AI-first", "Pós-produção"],
  },
  {
    id: "retrato-arquetipico",
    title: "RETRATO ARQUETÍPICO",
    subtitle: "Fotografia & Identidade",
    description: "Criação de retratos com profundidade simbólica.",
    longDescription: "Retrato não é captura — é revelação. Aprenda a criar imagens que mostram a essência, não apenas a superfície. Luz, composição, direção e simbolismo. Fotografia como espelho da alma.",
    image: "/courses/retrato-arquetipico.png",
    duration: "6 semanas",
    level: "Todos os níveis",
    tag: "FOTO",
    topics: ["Direção de retrato", "Iluminação simbólica", "Composição arquetípica", "Edição expressiva", "Identidade visual"],
  },
  {
    id: "digital-presence",
    title: "PRESENÇA DIGITAL",
    subtitle: "Sites & Apresentações",
    description: "Crie sites narrativos e apresentações que parecem filmes.",
    longDescription: "Sua presença digital é seu território. Aprenda a criar sites, landing pages e apresentações que não só informam — emocionam. Design como narrativa. Web como palco. Slides como cenas.",
    image: "/courses/digital-presence.png",
    duration: "6 semanas",
    level: "Iniciante",
    tag: "WEB",
    topics: ["Design narrativo", "Sites com IA", "Apresentações cinematográficas", "UX emocional", "Portfólios vivos"],
  },
  {
    id: "motion-lab",
    title: "MOTION LAB",
    subtitle: "Animação com IA",
    description: "Do estático ao movimento. Animação e motion graphics.",
    longDescription: "Movimento é vida. Aprenda a animar usando inteligência artificial — do estático ao dinâmico, do frame ao fluxo. Motion graphics, animação de personagem, transições. Dê vida ao que estava parado.",
    image: "/courses/motion-lab.png",
    duration: "8 semanas",
    level: "Intermediário",
    tag: "ANIMAÇÃO",
    topics: ["Fundamentos de animação", "Motion graphics", "Animação com IA", "Transições criativas", "Loops e ciclos"],
  },
  {
    id: "doc-real",
    title: "DOC.REAL",
    subtitle: "Documentário Contemporâneo",
    description: "Capture a realidade com olhar autoral.",
    longDescription: "Documentário é testemunho. Aprenda a capturar a realidade com olhar autoral, ético e transformador. Da pesquisa à edição, da entrevista à narrativa. Documente para mudar.",
    image: "/courses/doc-real.png",
    duration: "10 semanas",
    level: "Avançado",
    tag: "DOC",
    topics: ["Pesquisa e pré-produção", "Entrevista", "Ética documental", "Narrativa do real", "Edição autoral"],
  },
  {
    id: "ai-artist",
    title: "AI ARTIST",
    subtitle: "Formação Completa",
    description: "Programa intensivo de arte com IA. Da ideia à obra.",
    longDescription: "A formação completa para o artista do futuro. Um programa intensivo que atravessa todas as disciplinas — imagem, som, movimento, código, narrativa. Do conceito à obra finalizada. Torne-se um artista completo da era IA.",
    image: "/courses/ai-artist.png",
    duration: "16 semanas",
    level: "Intensivo",
    tag: "FORMAÇÃO",
    topics: ["Todas as disciplinas", "Projeto integrador", "Mentoria individual", "Portfólio profissional", "Certificação"],
  },
  {
    id: "post-vision",
    title: "POST.VISION",
    subtitle: "Edição & VFX com IA",
    description: "Pós-produção revolucionária. Edição, color, VFX.",
    longDescription: "A mágica acontece na pós. Aprenda edição, color grading e VFX usando inteligência artificial. Transforme material bruto em obra finalizada. Do corte à correção de cor, do efeito à entrega.",
    image: "/courses/post-vision.png",
    duration: "8 semanas",
    level: "Intermediário",
    tag: "PÓS",
    topics: ["Edição com IA", "Color grading", "VFX básico", "Composição", "Finalização"],
  },
  {
    id: "artists-journey",
    title: "JORNADA DO ARTISTA",
    subtitle: "Criatividade como Caminho",
    description: "Desbloqueie sua criatividade. Do medo à expressão.",
    longDescription: "Antes de criar, é preciso se libertar. Este curso é uma jornada interna — do bloqueio criativo à expressão autêntica. Processo, ritual, prática. Transforme medo em combustível.",
    image: "/courses/artists-journey.png",
    duration: "12 semanas",
    level: "Todos os níveis",
    tag: "PROCESSO",
    topics: ["Bloqueio criativo", "Ritual e prática", "Medo e expressão", "Processo autoral", "Identidade artística"],
  },
];

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

const CourseModal = ({ course, isOpen, onClose }: CourseModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load saved user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        const { name: savedName, phone: savedPhone } = JSON.parse(savedUser);
        if (savedName) setName(savedName);
        if (savedPhone) setPhone(savedPhone);
      } catch (e) {
        console.error("Error loading saved user data:", e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    setIsSubmitting(true);
    setError("");

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("course_waitlist")
        .insert({
          course_id: course.id,
          course_title: course.title,
          name: name.trim(),
          phone: phone.trim(),
        });

      if (supabaseError) {
        // Check if duplicate
        if (supabaseError.code === "23505") {
          // Already signed up - still count as success
          console.log("User already signed up for this course");
        } else {
          throw supabaseError;
        }
      }

      // Save to localStorage for auto-fill
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
      }));

      setSubmitted(true);
    } catch (err) {
      console.error("Error saving to waitlist:", err);
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Don't clear name/phone so they persist for next modal
    setShowForm(false);
    setSubmitted(false);
    setError("");
    onClose();
  };

  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brutal-black/95 backdrop-blur-sm z-[100]"
          />

          {/* Modal - Centered */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-brutal-black border-2 border-matrix-green shadow-[0_0_60px_rgba(0,255,136,0.15)] my-auto"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-brutal-white/60 hover:text-matrix-green hover:bg-matrix-green/10 transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2">
                {/* Left: Course Image */}
                <div className="relative h-64 md:h-auto md:min-h-[500px] bg-concrete">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brutal-black via-brutal-black/50 to-transparent" />

                  {/* Tag */}
                  <span className="absolute top-4 left-4 code-text text-xs px-3 py-1.5 bg-brutal-black/90 border border-matrix-green text-matrix-green">
                    {course.tag}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="p-6 md:p-8 flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-brutal-white mb-1">
                      {course.title}
                    </h2>
                    <p className="text-lg text-matrix-green">{course.subtitle}</p>
                  </div>

                  {/* Info */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-concrete-border">
                    <div className="flex items-center gap-2 text-brutal-white/70">
                      <Clock className="w-4 h-4 text-matrix-green" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brutal-white/70">
                      <Users className="w-4 h-4 text-matrix-green" />
                      <span className="text-sm">{course.level}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-brutal-white/80 text-sm leading-relaxed mb-4 flex-grow">
                    {course.longDescription}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="code-text text-[10px] px-2 py-1 border border-concrete-border text-brutal-white/50"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* CTA Area */}
                  <div className="mt-auto">
                    <AnimatePresence mode="wait">
                      {!showForm && !submitted && (
                        <motion.button
                          key="cta-button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowForm(true)}
                          className="w-full py-4 bg-matrix-green text-brutal-black font-bold text-sm uppercase tracking-wider hover:bg-brutal-white transition-colors flex items-center justify-center gap-2"
                        >
                          ENTRAR NA LISTA DE ESPERA
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      )}

                      {showForm && !submitted && (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border border-matrix-green/30 bg-matrix-green/5 p-4"
                        >
                          <h3 className="text-sm font-bold text-matrix-green mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-matrix-green rounded-full animate-pulse" />
                            LISTA DE ESPERA
                          </h3>
                          <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              disabled={isSubmitting}
                              placeholder="Seu nome"
                              className="w-full px-3 py-2.5 bg-brutal-black border border-concrete-border text-brutal-white placeholder:text-brutal-white/30 text-sm focus:border-matrix-green focus:outline-none disabled:opacity-50"
                            />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              disabled={isSubmitting}
                              placeholder="WhatsApp (00) 00000-0000"
                              className="w-full px-3 py-2.5 bg-brutal-black border border-concrete-border text-brutal-white placeholder:text-brutal-white/30 text-sm focus:border-matrix-green focus:outline-none disabled:opacity-50"
                            />
                            {error && (
                              <p className="text-red-500 text-xs">{error}</p>
                            )}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3 bg-matrix-green text-brutal-black font-bold text-sm uppercase tracking-wider hover:bg-brutal-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="w-4 h-4 border-2 border-brutal-black/30 border-t-brutal-black rounded-full animate-spin" />
                                  ENVIANDO...
                                </>
                              ) : (
                                <>
                                  ENVIAR
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </form>
                        </motion.div>
                      )}

                      {submitted && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-6 border border-matrix-green/30 bg-matrix-green/5"
                        >
                          <div className="w-12 h-12 rounded-full bg-matrix-green/20 border border-matrix-green flex items-center justify-center mx-auto mb-3">
                            <span className="text-matrix-green text-xl">✓</span>
                          </div>
                          <h3 className="text-base font-bold text-brutal-white mb-1">
                            Você está na lista!
                          </h3>
                          <p className="text-xs text-brutal-white/60">
                            Avisaremos quando <span className="text-matrix-green">{course.title}</span> abrir.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export const CoursesFilmGallery = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  };

  return (
    <>
      <section className="py-24 md:py-32 px-4 md:px-8 bg-brutal-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="code-text text-sm text-matrix-green">CATÁLOGO</span>
              <div className="h-px bg-matrix-green/50 flex-1" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-brutal-white uppercase tracking-tighter mb-4">
              Cursos
            </h2>
            <p className="text-xl text-brutal-white/70 max-w-2xl">
              Cada curso é uma jornada. Cada jornada, uma transformação.
            </p>
          </div>

          {/* Featured Course - Zero One */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div
              onClick={() => openCourse(courses[0])}
              className="relative group cursor-pointer overflow-hidden border-2 border-matrix-green hover:shadow-[0_0_30px_rgba(0,255,136,0.2)] transition-shadow"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-[400px] md:h-[500px] overflow-hidden bg-concrete">
                  <img
                    src={courses[0].image}
                    alt={courses[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brutal-black/80" />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-brutal-black">
                  <span className="code-text text-xs text-matrix-green mb-4 tracking-widest">
                    {courses[0].tag} // CURSO FUNDAÇÃO
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold text-brutal-white mb-2 group-hover:text-matrix-green transition-colors">
                    {courses[0].title}
                  </h3>
                  <p className="text-xl text-matrix-green mb-6">{courses[0].subtitle}</p>
                  <p className="text-brutal-white/70 text-lg mb-8 leading-relaxed">
                    {courses[0].description}
                  </p>

                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-brutal-white/60">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{courses[0].duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brutal-white/60">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{courses[0].level}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-matrix-green font-mono text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Grid - Film Posters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {courses.slice(1).map((course, index) => (
              <motion.div
                key={course.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openCourse(course)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden border-2 border-concrete-border hover:border-matrix-green transition-all hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                  {/* Poster Image */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brutal-black via-brutal-black/40 to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="code-text text-[10px] px-2 py-1 bg-brutal-black/80 border border-matrix-green/50 text-matrix-green">
                      {course.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg md:text-xl font-bold text-brutal-white mb-1 group-hover:text-matrix-green transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-brutal-white/60 mb-3">{course.subtitle}</p>

                    <div className="flex items-center gap-4 text-xs text-brutal-white/50">
                      <span>{course.duration}</span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-brutal-black/40">
                    <span className="code-text text-sm text-matrix-green border border-matrix-green px-4 py-2 bg-brutal-black/80">
                      VER DETALHES
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="code-text text-sm text-brutal-white/50">
              // cada curso é uma porta. cada porta, um mundo.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default CoursesFilmGallery;
