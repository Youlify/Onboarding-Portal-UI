import { useEffect, useRef, useState } from "react";

interface ConfettiParticle {
  id: number;
  color: string;
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  initialRotate: number;
  rotateSpeed: number;
  duration: number;
  delay: number;
}

interface ColorWeight {
  color: string;
  weight: number;
}

interface ConfettiProps {
  colors?: (string | ColorWeight)[];
  particleCount?: number;
  sizeRange?: [number, number];
  durationRange?: [number, number];
  totalDuration?: number;
  spread?: number;
  rotationRange?: [number, number];
  className?: string;
  containerStyle?: React.CSSProperties;
  particleStyle?: (particle: ConfettiParticle) => React.CSSProperties;
}

const Confetti: React.FC<ConfettiProps> = ({
  colors = ["#ff3366", "#33ff66", "#3366ff", "#ffcc33", "#9933ff"],
  particleCount = 100,
  sizeRange = [6, 16],
  durationRange = [3000, 6000],
  totalDuration,
  spread = 0.5,
  rotationRange = [45, 180],
  className,
  containerStyle,
  particleStyle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const getWeightedColor = () => {
    const normalizedColors = colors.map((c) =>
      typeof c === "string" ? { color: c, weight: 1 } : c
    );
    const totalWeight = normalizedColors.reduce((sum, c) => sum + c.weight, 0);
    const random = Math.random() * totalWeight;

    let current = 0;
    for (const c of normalizedColors) {
      current += c.weight;
      if (random <= current) return c.color;
    }
    return normalizedColors[0].color;
  };

  useEffect(() => {
    const updateSize = () => {
      containerRef.current &&
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    containerRef.current && observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;

    const generateParticles = () => {
      const newParticles: ConfettiParticle[] = [];
      const now = Date.now();

      for (let i = 0; i < particleCount; i++) {
        const startX = Math.random() * containerSize.width;
        const startY = -sizeRange[1];
        const endX =
          startX + (Math.random() - 0.5) * containerSize.width * spread;
        const endY = containerSize.height + sizeRange[1];
        const initialRotate = Math.random() * 360;
        const rotateSpeed =
          rotationRange[0] +
          Math.random() * (rotationRange[1] - rotationRange[0]);

        newParticles.push({
          id: now + i,
          color: getWeightedColor(),
          size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
          startX,
          startY,
          endX,
          endY,
          initialRotate,
          rotateSpeed: Math.random() > 0.5 ? rotateSpeed : -rotateSpeed,
          duration:
            totalDuration ||
            Math.random() * (durationRange[1] - durationRange[0]) +
              durationRange[0],
          delay: Math.random() * durationRange[1],
        });
      }

      setParticles(newParticles);
    };
    generateParticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerSize, totalDuration]);

  const getParticleStyle = (p: ConfettiParticle): React.CSSProperties => {
    const baseStyle = {
      "--deltaX": `${p.endX - p.startX}px`,
      "--deltaY": `${p.endY - p.startY}px`,
      "--initialRotate": `${p.initialRotate}deg`,
      "--finalRotate": `${p.initialRotate + p.rotateSpeed}deg`,
      position: "absolute",
      width: p.size,
      height: p.size * 0.6, // 长方形比例
      backgroundColor: p.color,
      left: p.startX,
      top: p.startY,
      transform: `rotate(var(--initialRotate))`,
      animation: `confetti-fall ${p.duration}ms ease-out ${p.delay}ms ${
        totalDuration ? "1 forwards" : "infinite"
      }`,
    } as React.CSSProperties;

    return { ...baseStyle, ...(particleStyle?.(p) || {}) };
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translate(0, 0) rotate(var(--initialRotate));
          }
          100% {
            transform: translate(var(--deltaX), var(--deltaY)) rotate(var(--finalRotate));
          }
        }
      `}</style>
      {particles.map((p) => (
        <div key={p.id} style={getParticleStyle(p)} />
      ))}
    </div>
  );
};

export default Confetti;
