import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinkHover, underlineExpand, staggerContainerPremium, fadeInUpSimple } from "@/utils/motionVariants";

// Story 3.1: Navigation with premium hover effects
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "WORK", href: "/#work" },
    { label: "STUDIO", href: "/studio" },
    { label: "JOURNAL", href: "/journal" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b-2 border-concrete-border">
      <div className="brutal-container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - magnetic hover effect */}
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
          >
            <img
              src="/logo-aitelier.png"
              alt="AI.TELIER"
              className="h-12 w-auto"
            />
          </motion.a>

          {/* Desktop menu - Story 3.1: Premium nav hovers */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            variants={staggerContainerPremium}
            initial="hidden"
            animate="visible"
          >
            {menuItems.map((item, index) => (
              <NavLink key={item.label} item={item} index={index} />
            ))}
            <motion.div
              className="code-text text-xs opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5 }}
            >
              [ONLINE]
            </motion.div>
          </motion.div>

          {/* Mobile menu button - Story 3.1: Animated hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-brutal-white hover:text-matrix-green transition-brutal p-2"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu - Story 3.1: Staggered reveal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden border-t-2 border-concrete-border overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="py-4 space-y-2"
                variants={staggerContainerPremium}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-brutal-white text-sm font-bold uppercase tracking-wider hover:text-matrix-green py-3 px-2 border-l-2 border-transparent hover:border-matrix-green transition-all"
                    variants={fadeInUpSimple}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  className="code-text text-xs opacity-50 pt-4 px-2"
                  variants={fadeInUpSimple}
                >
                  [MOBILE_MODE]
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Story 3.1: NavLink component with premium hover
const NavLink = ({ item, index }: { item: { label: string; href: string }; index: number }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <motion.a
      ref={linkRef}
      href={item.href}
      className="relative text-brutal-white text-sm font-bold uppercase tracking-wider group"
      variants={navLinkHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 group-hover:text-matrix-green transition-colors duration-200">
        {item.label}
      </span>

      {/* Underline with spring animation */}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-matrix-green origin-left"
        variants={underlineExpand}
      />

      {/* Glow effect on hover */}
      <motion.span
        className="absolute inset-0 -z-10 rounded-sm"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{
          opacity: 1,
          scale: 1.1,
          backgroundColor: "rgba(141, 199, 94, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
};

export default Navigation;
