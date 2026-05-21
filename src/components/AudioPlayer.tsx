import { Music } from 'lucide-react';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AudioPlayer({ shouldPlay }: { shouldPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (shouldPlay && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Play prevented
      });
    }
  }, [shouldPlay, isPlaying]);

  const togglePlay = (e: MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        loop
        autoPlay
        src="https://card-pi-kohl.vercel.app/Sound.mp3"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gold/30 flex items-center justify-center text-gold-dark hover:text-gold transition-colors relative"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ 
            duration: 4, 
            repeat: isPlaying ? Infinity : 0, 
            ease: "linear" 
          }}
        >
          <Music size={22} className={isPlaying ? "text-gold" : "text-gold-dark"} />
        </motion.div>
        
        {/* Ripple effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-gold/40"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [1, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
