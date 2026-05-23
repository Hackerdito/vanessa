import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Wait for the animation to finish before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 2800);
  };

  // Generate some random positions for particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      <motion.div 
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070503] overflow-hidden"
      >
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,rgba(10,8,5,1)_80%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-dark/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.8)]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: 0,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Top Text (Optional, requested the name but I'll put it on the envelope or card to keep it clean) */}
        {!isOpening && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-[15%] text-center flex flex-col items-center pointer-events-none"
          >
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-light mb-4">Tienes una invitación de</p>
            <h1 className="font-script text-5xl text-pearl drop-shadow-md">Vanessa Celeste</h1>
          </motion.div>
        )}

        {/* 3D Envelope Container */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 w-[300px] h-[200px] sm:w-[360px] sm:h-[240px] mt-10" 
          style={{ perspective: '1500px' }}
        >
          {/* Back of Envelope */}
          <div className="absolute inset-0 bg-[#140E0A] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-gold/10" />
          
          {/* Inner Card (rises up) */}
          <motion.div 
            initial={false}
            animate={{ 
              y: isOpening ? -140 : 0, 
              zIndex: isOpening ? 20 : 10
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
            className="absolute left-3 right-3 bottom-0 top-[20%] bg-gradient-to-b from-pearl via-[#FAF5EB] to-[#EBE0CD] rounded-t-md p-6 shadow-2xl flex flex-col items-center justify-start overflow-hidden origin-bottom"
          >
            <div className="w-full h-full border border-gold/40 flex flex-col items-center pt-8 relative overflow-hidden">
              {/* Card Sparkles Overlay */}
              <motion.div
                animate={isOpening ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 1.5] } : { opacity: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.4)_0%,transparent_60%)] pointer-events-none mix-blend-overlay"
              />
              
              <motion.p
                animate={isOpening ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.2 }} 
                className="font-sans text-[9px] uppercase tracking-[0.3em] text-ink/60 mb-2"
              >
                Mis XV Años
              </motion.p>
              <motion.h2 
                animate={isOpening ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 1, delay: 1.4 }}
                className="font-script text-4xl text-ink font-bold mb-4 drop-shadow-sm"
              >
                Vanessa Celeste
              </motion.h2>

              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/50" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/50" />
            </div>
          </motion.div>

          {/* Envelope Front Flaps */}
          <div className="absolute inset-0 z-30 pointer-events-none drop-shadow-2xl">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full rounded-lg overflow-hidden">
              {/* Left Flap */}
              <polygon points="0,0 50,55 0,100" fill="#18110D" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
              {/* Right Flap */}
              <polygon points="100,0 50,55 100,100" fill="#1C140F" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
              {/* Bottom Flap */}
              <polygon points="0,100 50,55 100,100" fill="#201711" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Top Flap */}
          <motion.div 
            initial={false}
            animate={{ rotateX: isOpening ? 180 : 0, zIndex: isOpening ? 10 : 40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-[65%] origin-top pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
            style={{ transformStyle: 'preserve-3d' }}
          >
             {/* Front of Top Flap */}
             <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <polygon points="0,0 100,0 50,100" fill="#221812" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
                </svg>
                {/* Wax Seal */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B58B22] to-[#806114] shadow-xl flex items-center justify-center z-50 pointer-events-none">
                   {/* Inner seal ring */}
                   <div className="w-12 h-12 rounded-full border border-[#FFF0C0]/30 shadow-inner flex items-center justify-center bg-gradient-to-br from-[#C69C2D] to-[#967119]">
                      <span className="font-script text-white/90 text-3xl font-light drop-shadow-md">VC</span>
                   </div>
                   
                   {/* Glow on seal */}
                   <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                   />
                </div>
             </div>
             
             {/* Back of Top Flap */}
             <div 
               className="absolute inset-0 bg-[#160F0A]" 
               style={{ 
                 clipPath: 'polygon(0 0, 100% 0, 50% 100%)', 
                 transform: 'rotateX(180deg)', 
                 backfaceVisibility: 'hidden', 
                 WebkitBackfaceVisibility: 'hidden', 
                 borderTop: '0.5px solid rgba(212,175,55,0.2)' 
               }} 
             >
                <div className="w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
             </div>
          </motion.div>
        </motion.div>

        {/* Button */}
        <div className="mt-24 h-16 relative z-30">
          {!isOpening && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={handleOpen}
              className="group relative px-10 py-4 bg-transparent border border-gold text-gold rounded-full font-sans text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-gold-light group-hover:drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]">
                Abrir mi invitación
              </span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
