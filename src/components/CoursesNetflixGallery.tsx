import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, ArrowRight, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supabase } from "@/integrations/supabase/client";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Courses with dedicated pages
const COURSES_WITH_PAGES: Record<string, string> = {
  "cinema-sem-cameras": "escola/cinema-sem-cameras",
};

// LocalStorage keys for auto-fill
const STORAGE_KEY = "aitelier_waitlist_user";

// Course images mapping
const courseImages: Record<string, string> = {
  "zero-one": "/courses/zero-one.png",
  "artists-journey": "/courses/artists-journey.png",
  "solo-biz": "/courses/solo-biz.png",
  "produto-zero": "/courses/produto-zero.png",
  "narrativa-venda": "/courses/narrativa-venda.png",
  "studio-os": "/courses/studio-os.png",
  "presenca-monetizada": "/courses/presenca-monetizada.png",
  "storycraft": "/courses/storycraft.png",
  "doc-real": "/courses/doc-real.png",
  "cinema-sem-cameras": "/courses/cinema-sem-cameras.png",
  "retrato-arquetipico": "/courses/retrato-arquetipico.png",
  "motion-lab": "/courses/motion-lab.png",
  "post-vision": "/courses/post-vision.png",
  "vibe-code": "/courses/vibe-code.png",
  "digital-presence": "/courses/digital-presence.png",
  "soundscape": "/courses/soundscape.png",
  "ai-artist": "/courses/ai-artist.png",
};

// Course-category mapping
const courseCategoryMap: Record<string, string> = {
  "zero-one": "fundacao",
  "artists-journey": "fundacao",
  "solo-biz": "one-person-studio",
  "produto-zero": "one-person-studio",
  "narrativa-venda": "one-person-studio",
  "studio-os": "one-person-studio",
  "presenca-monetizada": "one-person-studio",
  "storycraft": "narrativa",
  "doc-real": "narrativa",
  "cinema-sem-cameras": "producao-visual",
  "retrato-arquetipico": "producao-visual",
  "motion-lab": "producao-visual",
  "post-vision": "producao-visual",
  "vibe-code": "tech",
  "digital-presence": "tech",
  "soundscape": "audio",
  "ai-artist": "formacao-completa",
};

const courseIds = Object.keys(courseImages);
const categoryIds = ["one-person-studio", "fundacao", "narrativa", "producao-visual", "tech", "audio", "formacao-completa"];

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

interface Category {
  id: string;
  title: string;
  subtitle: string;
}

// Course Modal Component
interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const CourseModal = ({ course, isOpen, onClose, t }: CourseModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'pt';

  // Check if this course has a dedicated page
  const dedicatedPage = course?.id ? COURSES_WITH_PAGES[course.id] : null;

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
      setError(t('coursesGallery.modal.errorSave'));
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
                      {/* Show link to dedicated page if available */}
                      {dedicatedPage && (
                        <motion.div
                          key="dedicated-link"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <Link
                            to={`/${currentLang}/${dedicatedPage}`}
                            onClick={onClose}
                            className="w-full py-4 bg-matrix-green text-brutal-black font-bold text-sm uppercase tracking-wider hover:bg-brutal-white transition-colors flex items-center justify-center gap-2"
                          >
                            {t('coursesGallery.modal.viewFullCourse')}
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <p className="text-center text-xs text-brutal-white/50">
                            {t('coursesGallery.modal.dedicatedPageNote')}
                          </p>
                        </motion.div>
                      )}

                      {/* Show waitlist form for courses without dedicated page */}
                      {!dedicatedPage && !showForm && !submitted && (
                        <motion.button
                          key="cta-button"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setShowForm(true)}
                          className="w-full py-4 bg-matrix-green text-brutal-black font-bold text-sm uppercase tracking-wider hover:bg-brutal-white transition-colors flex items-center justify-center gap-2"
                        >
                          {t('coursesGallery.modal.joinWaitlist')}
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      )}

                      {!dedicatedPage && showForm && !submitted && (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border border-matrix-green/30 bg-matrix-green/5 p-4"
                        >
                          <h3 className="text-sm font-bold text-matrix-green mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-matrix-green rounded-full animate-pulse" />
                            {t('coursesGallery.modal.waitlistTitle')}
                          </h3>
                          <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              disabled={isSubmitting}
                              placeholder={t('coursesGallery.modal.namePlaceholder')}
                              className="w-full px-3 py-2.5 bg-brutal-black border border-concrete-border text-brutal-white placeholder:text-brutal-white/30 text-sm focus:border-matrix-green focus:outline-none disabled:opacity-50"
                            />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                              disabled={isSubmitting}
                              placeholder={t('coursesGallery.modal.phonePlaceholder')}
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
                              {isSubmitting ? t('coursesGallery.modal.submitting') : t('coursesGallery.modal.submit')}
                              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                            </button>
                          </form>
                        </motion.div>
                      )}

                      {!dedicatedPage && submitted && (
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
                            {t('coursesGallery.modal.successTitle')}
                          </h3>
                          <p className="text-xs text-brutal-white/60">
                            {t('coursesGallery.modal.successMessage', { course: course.title })}
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
  category: Category;
  courses: Course[];
  onCourseClick: (course: Course) => void;
  t: (key: string, options?: Record<string, unknown>) => string;
}

const CategoryRow = ({ category, courses, onCourseClick, t }: CategoryRowProps) => {
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
                  {t('coursesGallery.viewDetails')}
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
  const { t } = useTranslation('school');

  // Build courses array from translations
  const allCourses: Course[] = useMemo(() => {
    return courseIds.map((id) => ({
      id,
      title: t(`coursesGallery.courses.${id}.title`),
      subtitle: t(`coursesGallery.courses.${id}.subtitle`),
      description: t(`coursesGallery.courses.${id}.description`),
      longDescription: t(`coursesGallery.courses.${id}.longDescription`),
      image: courseImages[id],
      duration: t(`coursesGallery.courses.${id}.duration`),
      level: t(`coursesGallery.courses.${id}.level`),
      tag: t(`coursesGallery.courses.${id}.tag`),
      category: courseCategoryMap[id],
      topics: t(`coursesGallery.courses.${id}.topics`, { returnObjects: true }) as string[],
    }));
  }, [t]);

  // Build categories array from translations
  const categories: Category[] = useMemo(() => {
    return categoryIds.map((id) => ({
      id,
      title: t(`coursesGallery.categories.${id}.title`),
      subtitle: t(`coursesGallery.categories.${id}.subtitle`),
    }));
  }, [t]);

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
            <span className="code-text text-sm text-matrix-green">{t('coursesGallery.header')}</span>
            <div className="h-px bg-matrix-green/50 flex-1" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-brutal-white uppercase tracking-tighter mb-4">
            {t('coursesGallery.title')}
          </h2>
          <p className="text-xl text-brutal-white/70 max-w-2xl">
            {t('coursesGallery.subtitle')}
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
                t={t}
              />
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="max-w-[1600px] mx-auto px-6 mt-16 text-center">
          <p className="code-text text-sm text-brutal-white/50">
            {t('coursesGallery.bottomNote')}
          </p>
        </div>
      </section>

      <CourseModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={closeModal}
        t={t}
      />
    </>
  );
};

export default CoursesNetflixGallery;
