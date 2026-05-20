import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Light {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

export default function FloatingLights() {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    // Generate random light particles
    const newLights: Light[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 3, // between 3px and 11px
      left: Math.random() * 100, // between 0% and 100%
      delay: Math.random() * 5, // random delay
      duration: Math.random() * 8 + 5, // animate duration roughly 5-13s
    }));
    setLights(newLights);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute rounded-full bg-gold/60"
          style={{
            width: light.size,
            height: light.size,
            left: `${light.left}%`,
            bottom: "-30px", // start below the screen
            boxShadow: `0 0 ${light.size * 2}px ${light.size / 2}px rgba(212, 175, 55, 0.4)`,
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.sin(light.id) * 30, Math.cos(light.id) * -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: light.duration,
            delay: light.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
