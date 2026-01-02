import React, { useRef, useEffect, useState } from 'react';

export interface HeroFrameProps {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  children?: React.ReactNode;
  className?: string;
}

const HeroFrame: React.FC<HeroFrameProps> = ({
  id,
  title,
  subtitle,
  code,
  backgroundImage,
  backgroundVideo,
  children,
  className = ''
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Lazy load video when frame is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {
            // Autoplay blocked, silent fail
          });
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (frameRef.current) {
      observer.observe(frameRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      id={id}
      className={`hero-frame relative ${className}`}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo && isInView ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundVideo}
            muted
            loop
            playsInline
          />
        ) : backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : null}

        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-brutal-black/70" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
        {/* Code Tag */}
        <span className="code-text text-sm md:text-base mb-6 opacity-70">
          {code}
        </span>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter mb-4 text-brutal-white">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-brutal-white/80 max-w-3xl poetic-text">
          {subtitle}
        </p>

        {/* Children content (scroll down sections) */}
        {children && (
          <div className="mt-12 w-full">
            {children}
          </div>
        )}
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs uppercase tracking-widest text-brutal-white">Scroll</span>
        <div className="w-px h-8 bg-brutal-white/50 animate-pulse" />
      </div>
    </div>
  );
};

export default HeroFrame;
