import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
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
  category: string;
  topics: string[];
  comingSoon?: boolean;
}

// All courses organized by category
const allCourses: Course[] = [
  // FUNDAÇÃO
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
    category: "fundacao",
    topics: ["Filosofia da criação", "Pensamento visual", "Storytelling base", "Estética consciente", "Processo criativo"],
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
    category: "fundacao",
    topics: ["Bloqueio criativo", "Ritual e prática", "Medo e expressão", "Processo autoral", "Identidade artística"],
  },

  // ONE PERSON STUDIO (NOVOS)
  {
    id: "solo-biz",
    title: "SOLO.BIZ",
    subtitle: "Negócio de Uma Pessoa",
    description: "Estruture seu negócio solo. Oferta, preço, entrega, sistema.",
    longDescription: "O negócio completo que roda com você. Aprenda a estruturar oferta, definir preço, entregar valor e criar sistemas que funcionam enquanto você descansa. Não é sobre escalar — é sobre lucrar com leveza.",
    image: "/courses/solo-biz.png",
    duration: "8 semanas",
    level: "Todos os níveis",
    tag: "NEGÓCIOS",
    category: "one-person-studio",
    topics: ["Oferta clara", "Precificação", "Entrega", "Sistemas", "Operação solo"],
  },
  {
    id: "produto-zero",
    title: "PRODUTO ZERO",
    subtitle: "Do Conhecimento ao Produto",
    description: "Transforme o que você sabe em algo vendável.",
    longDescription: "Você já sabe algo valioso. Agora falta empacotar. Aprenda a transformar conhecimento tácito em curso, mentoria, consultoria ou produto digital. Do conceito ao MVP vendendo.",
    image: "/courses/produto-zero.png",
    duration: "6 semanas",
    level: "Iniciante",
    tag: "NEGÓCIOS",
    category: "one-person-studio",
    topics: ["Extração de conhecimento", "Estrutura de produto", "MVP rápido", "Validação", "Lançamento"],
  },
  {
    id: "narrativa-venda",
    title: "NARRATIVA DE VENDA",
    subtitle: "Vender sem Performance",
    description: "Storyselling. Copy autoral. Conversão por conexão.",
    longDescription: "Vender não precisa ser constrangedor. Aprenda storyselling — a arte de vender contando histórias. Copy que soa como você. Conversão que vem de conexão, não de pressão.",
    image: "/courses/narrativa-venda.png",
    duration: "6 semanas",
    level: "Intermediário",
    tag: "NEGÓCIOS",
    category: "one-person-studio",
    topics: ["Storyselling", "Copy autoral", "Funil narrativo", "Conversão", "Autenticidade"],
  },
  {
    id: "studio-os",
    title: "STUDIO OS",
    subtitle: "Sistema Operacional Criativo",
    description: "Seu stack de IA para produção completa.",
    longDescription: "Monte o sistema que faz você produzir como um studio inteiro. Ferramentas certas, fluxos otimizados, automações inteligentes. Seu sistema operacional de criação com IA.",
    image: "/courses/studio-os.png",
    duration: "4 semanas",
    level: "Todos os níveis",
    tag: "NEGÓCIOS",
    category: "one-person-studio",
    topics: ["Stack de ferramentas", "Fluxos de produção", "Automação", "Templates", "Integração IA"],
  },
  {
    id: "presenca-monetizada",
    title: "PRESENÇA MONETIZADA",
    subtitle: "Audiência → Receita",
    description: "De seguidores a clientes. Funil natural.",
    longDescription: "Audiência sem receita é hobby. Aprenda a converter presença em dinheiro de forma natural. Funil que funciona, sem táticas sujas. Relacionamento que vende.",
    image: "/courses/presenca-monetizada.png",
    duration: "6 semanas",
    level: "Intermediário",
    tag: "NEGÓCIOS",
    category: "one-person-studio",
    topics: ["Funil natural", "Conversão orgânica", "Relacionamento", "Ofertas", "Monetização"],
  },

  // STORYTELLING & NARRATIVA
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
    category: "narrativa",
    topics: ["Estrutura narrativa", "Arco de personagem", "Tensão e ritmo", "Diálogo", "Catarse"],
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
    category: "narrativa",
    topics: ["Pesquisa e pré-produção", "Entrevista", "Ética documental", "Narrativa do real", "Edição autoral"],
  },

  // PRODUÇÃO VISUAL
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
    category: "producao-visual",
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
    category: "producao-visual",
    topics: ["Direção de retrato", "Iluminação simbólica", "Composição arquetípica", "Edição expressiva", "Identidade visual"],
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
    category: "producao-visual",
    topics: ["Fundamentos de animação", "Motion graphics", "Animação com IA", "Transições criativas", "Loops e ciclos"],
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
    category: "producao-visual",
    topics: ["Edição com IA", "Color grading", "VFX básico", "Composição", "Finalização"],
  },

  // TECNOLOGIA & CÓDIGO
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
    category: "tech",
    topics: ["Fundamentos criativos", "Vibe coding", "Prototipagem rápida", "Automação criativa", "IA como copiloto"],
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
    category: "tech",
    topics: ["Design narrativo", "Sites com IA", "Apresentações cinematográficas", "UX emocional", "Portfólios vivos"],
  },

  // ÁUDIO
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
    category: "audio",
    topics: ["Composição com IA", "Sound design", "Trilha sonora", "Música ambiente", "Mixagem básica"],
  },

  // FORMAÇÃO COMPLETA
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
    category: "formacao-completa",
    topics: ["Todas as disciplinas", "Projeto integrador", "Mentoria individual", "Portfólio profissional", "Certificação"],
  },
];

// Category definitions
const categories = [
  {
    id: "one-person-studio",
    title: "ONE PERSON STUDIO",
    subtitle: "Monte seu negócio autônomo",
    color: "matrix-green",
  },
  {
    id: "fundacao",
    title: "FUNDAÇÃO",
    subtitle: "Comece por aqui",
    color: "ancestral-amber",
  },
  {
    id: "narrativa",
    title: "STORYTELLING & NARRATIVA",
    subtitle: "A arte de contar histórias",
    color: "tech-olive",
  },
  {
    id: "producao-visual",
    title: "PRODUÇÃO VISUAL",
    subtitle: "Cinema, foto, motion, pós",
    color: "ancestral-white",
  },
  {
    id: "tech",
    title: "TECNOLOGIA & CÓDIGO",
    subtitle: "Ferramentas e presença digital",
    color: "matrix-green",
  },
  {
    id: "audio",
    title: "ÁUDIO & MÚSICA",
    subtitle: "A narrativa invisível",
    color: "tech-olive",
  },
  {
    id: "formacao-completa",
    title: "FORMAÇÃO COMPLETA",
    subtitle: "O programa intensivo",
    color: "ancestral-amber",
  },
];

// Course Modal Component
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
      const { error: supabaseError } = await supabase
        .from("course_waitlist")
        .insert({
          course_id: course.id,
          course_title: course.title,
          name: name.trim(),
          phone: phone.trim(),
        });

      if (supabaseError && supabaseError.code !== "23505") {
        throw supabaseError;
      }

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brutal-black/95 backdrop-blur-sm z-[100]"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-brutal-black border-2 border-matrix-green shadow-[0_0_60px_rgba(0,255,136,0.15)] my-auto"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-brutal-white/60 hover:text-matrix-green hover:bg-matrix-green/10 transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
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
                  <span className="absolute top-4 left-4 code-text text-xs px-3 py-1.5 bg-brutal-black/90 border border-matrix-green text-matrix-green">
                    {course.tag}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-brutal-white mb-1">
                      {course.title}
                    </h2>
                    <p className="text-lg text-matrix-green">{course.subtitle}</p>
                  </div>

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

                  <p className="text-brutal-white/80 text-sm leading-relaxed mb-4 flex-grow">
                    {course.longDescription}
                  </p>

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
                              {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
                              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
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

// Category Row Component (Netflix style)
interface CategoryRowProps {
  category: typeof categories[0];
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

const CategoryRow = ({ category, courses, onCourseClick }: CategoryRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (courses.length === 0) return null;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-6 px-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-brutal-white mb-1">
            {category.title}
          </h3>
          <p className="text-sm text-text-secondary">{category.subtitle}</p>
        </div>

        {/* Scroll Controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-10 h-10 flex items-center justify-center border transition-all ${
              canScrollLeft
                ? "border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10"
                : "border-concrete-border text-text-muted cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-10 h-10 flex items-center justify-center border transition-all ${
              canScrollRight
                ? "border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10"
                : "border-concrete-border text-text-muted cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Courses Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => onCourseClick(course)}
            className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
            style={{ scrollSnapAlign: "start" }}
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
                <h4 className="text-lg md:text-xl font-bold text-brutal-white mb-1 group-hover:text-matrix-green transition-colors">
                  {course.title}
                </h4>
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
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Component
export const CoursesNetflixGallery = () => {
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
      <section id="cursos" className="py-24 md:py-32 bg-brutal-black">
        {/* Header */}
        <div className="max-w-[1600px] mx-auto px-6 mb-16">
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

        {/* Category Rows */}
        <div className="max-w-[1800px] mx-auto">
          {categories.map((category) => {
            const categoryCourses = allCourses.filter(
              (c) => c.category === category.id
            );
            return (
              <CategoryRow
                key={category.id}
                category={category}
                courses={categoryCourses}
                onCourseClick={openCourse}
              />
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="max-w-[1600px] mx-auto px-6 mt-16 text-center">
          <p className="code-text text-sm text-brutal-white/50">
            // cada curso é uma porta. cada porta, um mundo.
          </p>
        </div>
      </section>

      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default CoursesNetflixGallery;
