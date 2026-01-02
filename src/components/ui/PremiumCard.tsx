import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, ReactNode } from "react";
import { cardLift } from "@/utils/motionVariants";

// Story 3.2: Premium Card with lift, shine, glow effects

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  enableShine?: boolean;
  enableGlow?: boolean;
  enableTilt?: boolean;
}

export const PremiumCard = ({
  children,
  className = "",
  onClick,
  enableShine = true,
  enableGlow = true,
  enableTilt = false,
}: PremiumCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // For tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 300 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !enableTilt) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`premium-card relative overflow-hidden ${className}`}
      variants={cardLift}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={enableTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
    >
      {/* Shine effect overlay */}
      {enableShine && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={isHovered ? { x: "200%", opacity: 0.3 } : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transform: "skewX(-20deg)",
          }}
        />
      )}

      {/* Glow border effect */}
      {enableGlow && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(45deg, rgba(141, 199, 94, 0.3), transparent, rgba(141, 199, 94, 0.3))",
            filter: "blur(8px)",
            transform: "scale(1.02)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </motion.div>
  );
};

// Story 3.2: Glass Card variant
export const GlassCard = ({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      className={`glass-premium relative overflow-hidden ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      variants={{
        rest: {
          y: 0,
          boxShadow: "0 0 0 rgba(141, 199, 94, 0), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
        },
        hover: {
          y: -4,
          boxShadow: "0 0 30px rgba(141, 199, 94, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
          transition: { type: "spring", damping: 20, stiffness: 300 },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Story 3.2: Focus ring wrapper for accessibility
export const FocusRingWrapper = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`focus-ring-wrapper ${className}`}
      whileFocus={{
        boxShadow: "0 0 0 3px rgba(141, 199, 94, 0.5)",
      }}
      transition={{ duration: 0.2 }}
      tabIndex={0}
    >
      {children}
    </motion.div>
  );
};
