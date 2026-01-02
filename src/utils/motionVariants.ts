// Motion Variants para animações consistentes

export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export const fadeInUpSimple = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export const textReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  },
};

export const magneticHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness: 300,
    },
  },
  tap: { scale: 0.98 },
};

// ========================================
// EPIC 3.0 - UX POLISH VARIANTS
// ========================================

// Story 3.1: Quick Wins - Stagger with easing
export const staggerContainerPremium = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Story 3.1: Nav link hover
export const navLinkHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 400,
    },
  },
};

// Story 3.1: Underline expand
export const underlineExpand = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Story 3.2: Card lift with spring
export const cardLift = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 0 0 rgba(141, 199, 94, 0)',
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(141, 199, 94, 0.15)',
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
    },
  },
  tap: {
    y: -4,
    scale: 1.01,
  },
};

// Story 3.2: Card shine effect
export const cardShine = {
  rest: { x: '-100%', opacity: 0 },
  hover: {
    x: '200%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Story 3.2: Glass glow
export const glassGlow = {
  rest: {
    boxShadow: '0 0 0 rgba(141, 199, 94, 0), inset 0 0 0 rgba(255, 255, 255, 0)',
  },
  hover: {
    boxShadow: '0 0 30px rgba(141, 199, 94, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
    transition: {
      duration: 0.3,
    },
  },
};

// Story 3.3: Gallery reveal stagger
export const galleryReveal = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Story 3.3: Modal spring
export const modalSpring = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

// Story 3.3: Image zoom
export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Story 3.4: Magnetic button
export const magneticButton = {
  rest: { x: 0, y: 0 },
  hover: (offset: { x: number; y: number }) => ({
    x: offset.x * 0.3,
    y: offset.y * 0.3,
    transition: {
      type: 'spring' as const,
      damping: 15,
      stiffness: 150,
    },
  }),
};

// Story 3.4: Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Story 3.4: Parallax layer
export const parallaxLayer = (speed: number) => ({
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * speed,
    transition: { type: 'tween' as const, ease: 'linear' },
  }),
});

// Story 3.4: Text split reveal
export const textSplitReveal = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Focus ring animation
export const focusRing = {
  rest: {
    boxShadow: '0 0 0 0 rgba(141, 199, 94, 0)',
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(141, 199, 94, 0.5)',
    transition: {
      duration: 0.2,
    },
  },
};
