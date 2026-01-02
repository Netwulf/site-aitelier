import { useRef } from 'react';
import { motion } from 'framer-motion';
import HorizontalNavigator, { HorizontalNavigatorRef } from '@/components/navigation/HorizontalNavigator';
import HeroFrame from '@/components/navigation/HeroFrame';
import NavigationArrows from '@/components/navigation/NavigationArrows';
import NavigationDots from '@/components/navigation/NavigationDots';
import NavigationTabs from '@/components/navigation/NavigationTabs';
import { useHorizontalNavigation } from '@/hooks/useHorizontalNavigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { frames, frameLabels } from '@/data/frames';

const IndexHorizontal = () => {
  const navigatorRef = useRef<HorizontalNavigatorRef>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Get container ref from navigator
  const getContainerRef = () => {
    if (navigatorRef.current?.container && !containerRef.current) {
      containerRef.current = navigatorRef.current.container;
    }
    return containerRef;
  };

  const {
    currentFrame,
    goToFrame,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev
  } = useHorizontalNavigation(getContainerRef(), {
    totalFrames: frames.length
  });

  // Animation variants
  const contentVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' }
        }
      };

  const staggerContainer = prefersReducedMotion
    ? {}
    : {
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      };

  return (
    <div className="relative bg-brutal-black overflow-hidden">
      {/* Mobile Navigation Tabs */}
      <NavigationTabs
        labels={frameLabels}
        currentFrame={currentFrame}
        onTabClick={goToFrame}
      />

      {/* Horizontal Navigator Container */}
      <HorizontalNavigator ref={navigatorRef}>
        {frames.map((frame, index) => (
          <HeroFrame
            key={frame.id}
            id={frame.id}
            title={frame.title}
            subtitle={frame.subtitle}
            code={frame.code}
            backgroundImage={frame.backgroundImage}
            backgroundVideo={frame.backgroundVideo}
            className={currentFrame === index ? 'in-view' : ''}
          >
            {/* Frame-specific content with animations */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              animate={currentFrame === index ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              {/* Scroll down content placeholder */}
              {frame.id === 'aitelier' && (
                <motion.div variants={contentVariants} className="frame-content">
                  <p className="text-sm text-brutal-white/60 uppercase tracking-widest">
                    Manifesto • Futuro Ancestral • Conselheiros
                  </p>
                </motion.div>
              )}

              {frame.id === 'escola' && (
                <motion.div variants={contentVariants} className="frame-content">
                  <p className="text-sm text-brutal-white/60 uppercase tracking-widest">
                    Cursos • Metodologia • Lista de Espera
                  </p>
                </motion.div>
              )}

              {frame.id === 'studio' && (
                <motion.div variants={contentVariants} className="frame-content">
                  <p className="text-sm text-brutal-white/60 uppercase tracking-widest">
                    Processo • Cases • Contato
                  </p>
                </motion.div>
              )}

              {frame.id === 'playground' && (
                <motion.div variants={contentVariants} className="frame-content">
                  <p className="text-sm text-brutal-white/60 uppercase tracking-widest">
                    Obras • Ferramentas • Processos
                  </p>
                </motion.div>
              )}
            </motion.div>
          </HeroFrame>
        ))}
      </HorizontalNavigator>

      {/* Desktop Navigation Arrows */}
      <NavigationArrows
        onPrev={goPrev}
        onNext={goNext}
        canPrev={canGoPrev}
        canNext={canGoNext}
      />

      {/* Navigation Dots */}
      <NavigationDots
        totalFrames={frames.length}
        currentFrame={currentFrame}
        labels={frameLabels}
        onDotClick={goToFrame}
        showLabels
      />
    </div>
  );
};

export default IndexHorizontal;
