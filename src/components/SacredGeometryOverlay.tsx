interface SacredGeometryOverlayProps {
  opacity?: number;
  className?: string;
}

export const SacredGeometryOverlay = ({
  opacity = 0.02,
  className = ''
}: SacredGeometryOverlayProps) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      opacity,
      mixBlendMode: 'overlay',
      backgroundImage: 'url(/patterns/sacred-geometry.svg)',
      backgroundSize: '120px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
);

export default SacredGeometryOverlay;
