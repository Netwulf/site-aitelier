import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Heart, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLikes } from "@/hooks/useLikes";

export interface ImageModalData {
  id: string;
  src: string;
  title?: string;
  category?: string;
  year?: number;
  description?: string;
  projectTitle?: string;
}

interface ImageModalProps {
  images: ImageModalData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageModal = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageModalProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const currentImage = images[currentIndex];
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  const { likes, userLiked, toggleLike, isLoading } = useLikes(currentImage?.id || "");

  // Reset image loaded state when navigating
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // Preload next image
  useEffect(() => {
    if (hasNext && images[currentIndex + 1]) {
      const img = new Image();
      img.src = images[currentIndex + 1].src;
    }
  }, [currentIndex, hasNext, images]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (hasPrev) onNavigate(currentIndex - 1);
          break;
        case "ArrowRight":
          if (hasNext) onNavigate(currentIndex + 1);
          break;
        case "l":
        case "L":
          toggleLike();
          break;
      }
    },
    [isOpen, currentIndex, hasNext, hasPrev, onClose, onNavigate, toggleLike]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const diffX = touchStart.x - e.changedTouches[0].clientX;
    const diffY = touchStart.y - e.changedTouches[0].clientY;
    const threshold = 50;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX > 0 && hasNext) onNavigate(currentIndex + 1);
      else if (diffX < 0 && hasPrev) onNavigate(currentIndex - 1);
    } else if (diffY < -threshold) {
      onClose();
    }

    setTouchStart(null);
  };

  if (!currentImage) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 99999,
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              zIndex: 10,
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                padding: 8,
                cursor: "pointer",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Image Container - Centro absoluto */}
          <div
            onClick={onClose}
            style={{
              position: "absolute",
              top: 56,
              left: 0,
              right: 0,
              bottom: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {/* Loading */}
            {!imageLoaded && (
              <div style={{ position: "absolute", color: "white" }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: "2px solid rgba(255,255,255,0.2)",
                    borderTopColor: "rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
            )}

            {/* Image */}
            <motion.img
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.title || ""}
              onLoad={() => setImageLoaded(true)}
              onClick={(e) => e.stopPropagation()}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={prefersReducedMotion ? {} : { opacity: imageLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.15 }}
              style={{
                maxWidth: "calc(100vw - 32px)",
                maxHeight: "calc(100vh - 140px)",
                objectFit: "contain",
                userSelect: "none",
                cursor: "default",
              }}
              draggable={false}
            />
          </div>

          {/* Nav Arrows */}
          {hasPrev && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                zIndex: 10,
              }}
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                zIndex: 10,
              }}
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Info Bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 64,
              background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
              display: "flex",
              alignItems: "flex-end",
              padding: "0 16px 16px",
              zIndex: 10,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {currentImage.projectTitle || currentImage.title}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "monospace" }}>
                {currentImage.category} {currentImage.year && `• ${currentImage.year}`}
              </div>
            </div>

            <button
              onClick={() => toggleLike()}
              disabled={isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 20,
                border: "none",
                background: userLiked ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                color: "white",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: 14,
                fontFamily: "monospace",
              }}
            >
              <Heart
                size={18}
                fill={userLiked ? "#ef4444" : "none"}
                color={userLiked ? "#ef4444" : "white"}
              />
              {likes}
            </button>
          </div>

          {/* CSS for spinner animation */}
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render via Portal to ensure it's at document root
  return createPortal(modalContent, document.body);
};

export default ImageModal;
