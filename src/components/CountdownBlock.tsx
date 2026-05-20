import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function CountdownBlock() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: August 1, 2026 at 16:00 (ceremony time)
    const targetDate = new Date('2026-08-01T16:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000); // update every second

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-5 sm:gap-6 mt-6 mb-2 md:my-10 w-full select-none transform scale-95 sm:scale-100 origin-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {/* Top side: Date */}
      <div className="text-[#DFAB69] font-bold tracking-widest uppercase text-3xl sm:text-4xl md:text-5xl drop-shadow-md whitespace-nowrap">
        01 Agosto 2026
      </div>

      {/* Separator */}
      <div className="w-[100px] h-[2px] bg-[#DFAB69] opacity-50" />

      {/* Right side: Countdown */}
      <div className="flex gap-1.5 sm:gap-2">
        <div className="flex flex-col items-center justify-center bg-[#2A1E15] rounded-lg sm:rounded-xl w-[45px] h-[50px] sm:w-[55px] sm:h-[60px] md:w-[70px] md:h-[75px]">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-[#DFAB69] leading-none mb-1">
            {timeLeft.days.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-xs text-[#DFAB69] font-medium leading-none">Días</span>
        </div>
        
        <div className="flex flex-col items-center justify-center bg-[#2A1E15] rounded-lg sm:rounded-xl w-[45px] h-[50px] sm:w-[55px] sm:h-[60px] md:w-[70px] md:h-[75px]">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-[#DFAB69] leading-none mb-1">
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-xs text-[#DFAB69] font-medium leading-none">Horas</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#2A1E15] rounded-lg sm:rounded-xl w-[45px] h-[50px] sm:w-[55px] sm:h-[60px] md:w-[70px] md:h-[75px]">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-[#DFAB69] leading-none mb-1">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-xs text-[#DFAB69] font-medium leading-none">Minutos</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-[#2A1E15] rounded-lg sm:rounded-xl w-[45px] h-[50px] sm:w-[55px] sm:h-[60px] md:w-[70px] md:h-[75px]">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-[#DFAB69] leading-none mb-1">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-xs text-[#DFAB69] font-medium leading-none">Segs</span>
        </div>
      </div>
    </motion.div>
  );
}
