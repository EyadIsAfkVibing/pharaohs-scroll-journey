import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
}

export const SandParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/30 rounded-full animate-sand-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${Math.random() * 2}s`,
            // @ts-ignore
            "--tx": `${(Math.random() - 0.5) * 200}px`,
            "--ty": `${(Math.random() - 0.5) * 200}px`,
          }}
        />
      ))}
    </div>
  );
};
