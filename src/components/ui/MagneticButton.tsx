import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

// Story 3.4: Magnetic button component

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  variant?: "primary" | "ghost" | "matrix";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const MagneticButton = ({
  children,
  className = "",
  onClick,
  href,
  strength = 0.3,
  variant = "primary",
  size = "md",
  disabled = false,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    matrix: "btn-matrix",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
    >
      <Component
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          relative overflow-hidden
        `}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
      >
        {/* Ripple effect on click */}
        <motion.span
          className="absolute inset-0 bg-white/20 pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 2, opacity: [0.3, 0] }}
          transition={{ duration: 0.5 }}
          style={{ borderRadius: "50%", originX: 0.5, originY: 0.5 }}
        />

        <span className="relative z-10">{children}</span>
      </Component>
    </motion.div>
  );
};

// Story 3.4: Icon button with magnetic effect
interface MagneticIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel: string;
}

export const MagneticIconButton = ({
  children,
  onClick,
  className = "",
  ariaLabel,
}: MagneticIconButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        w-10 h-10 flex items-center justify-center
        border-2 border-concrete-border hover:border-matrix-green
        bg-brutal-black hover:bg-matrix-green/10
        transition-colors group
        ${className}
      `}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={ariaLabel}
    >
      <span className="text-brutal-white group-hover:text-matrix-green transition-colors">
        {children}
      </span>
    </motion.button>
  );
};
