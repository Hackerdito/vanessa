import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

export default function Envelope() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Add a slight delay for better visual effect when scrolling
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center w-full mt-10 pt-16 pb-8">
      <div 
        className="relative w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#0A1128] rounded-md shadow-xl border border-gold/20" />

        {/* Card */}
        <motion.div 
          initial={false}
          animate={{
            y: isOpen ? -80 : 0,
            height: isOpen ? 250 : 170,
            zIndex: isOpen ? 20 : 10
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute left-3 right-3 bottom-0 bg-pearl rounded-t-md p-6 text-center shadow-2xl flex flex-col justify-center items-center overflow-hidden"
        >
          <div className="w-full h-full border border-gold/30 rounded flex flex-col items-center justify-center px-4 relative">
            <h4 className="font-serif text-2xl text-ink mb-3">Lluvia de sobres</h4>
            <p className="font-sans text-xs text-ink/80 leading-relaxed font-medium">
              Si deseas tener un detalle conmigo, será recibido con mucho cariño.
            </p>
            <div className="mt-4 w-12 h-px bg-gold mx-auto" />
            
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-gold/50" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold/50" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold/50" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-gold/50" />
          </div>
        </motion.div>

        {/* Envelope Front Flaps */}
        <div className="absolute inset-0 z-30 pointer-events-none drop-shadow-xl">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full rounded-md overflow-hidden">
            <polygon points="0,0 50,55 0,100" fill="#111A3A" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
            <polygon points="100,0 50,55 100,100" fill="#111A3A" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
            <polygon points="0,100 50,55 100,100" fill="#17224A" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Top Flap */}
        <motion.div 
          initial={false}
          animate={{
            rotateX: isOpen ? 180 : 0,
            zIndex: isOpen ? 10 : 40,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-[60%] origin-top pointer-events-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.3)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of flap (visible when closed) */}
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,0 100,0 50,100" fill="#111A3A" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
            </svg>
            
            {/* Wax seal */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-gold shadow-md flex items-center justify-center z-50">
              <div className="w-8 h-8 rounded-full border border-ink/40 flex items-center justify-center">
                <span className="font-serif text-ink text-sm leading-none font-bold">V</span>
              </div>
            </div>
          </div>
          
          {/* Back of flap (visible when open) */}
          <div 
            className="absolute inset-0 bg-[#0A1128]"
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: 'rotateX(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderTop: '0.5px solid rgba(212,175,55,0.3)'
            }}
          >
            {/* Subtle internal pattern */}
            <div className="w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
          </div>
        </motion.div>
      </div>

      <div className="mt-8 h-4 bg-transparent" />
    </div>
  );
}
