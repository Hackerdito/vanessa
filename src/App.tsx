import { MapPin, CalendarHeart, Clock, HeartHandshake, Heart, Sparkles, Shirt, Gift, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import AudioPlayer from './components/AudioPlayer';
import RSVPModal from './components/RSVPModal';
import AddToCalendar from './components/AddToCalendar';
import FloatingLights from './components/FloatingLights';
import CountdownBlock from './components/CountdownBlock';
import { useState } from 'react';

export default function App() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-ink text-pearl bokeh-bg overflow-x-hidden selection:bg-gold/30 selection:text-gold relative">
      <AudioPlayer />
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />

      <main className="max-w-md mx-auto bg-ink/50 backdrop-blur-3xl shadow-2xl min-h-screen relative border-x border-gold/10 pb-32">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-gold/10 via-ink/50 to-ink pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] -right-40 w-96 h-96 bg-gold-dark/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative min-h-[100svh] flex flex-col justify-end items-center pb-6 md:pb-12 px-6 text-center z-10">
          <div className="absolute inset-0 overflow-hidden mask-hero">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover object-[50%_20%] opacity-90 transition-all duration-1000"
            >
              <source src="https://card-pi-kohl.vercel.app/vane_ok.mp4" type="video/mp4" />
            </video>
            {/* Gradient background to increase text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent top-1/4" />
          </div>
          
          <FloatingLights />

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 w-full pt-20"
          >
            <motion.p variants={fadeIn} className="font-sans text-xs uppercase tracking-[0.3em] text-gold-light mb-3 text-shadow-sm">
              Mis XV años
            </motion.p>
            <motion.h1 variants={fadeIn} className="font-script text-7xl text-pearl mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-light">
              Vanessa Celeste
            </motion.h1>
            <motion.h2 variants={fadeIn} className="font-sans text-sm uppercase tracking-[0.2em] text-pearl mb-4 gold-text-gradient font-medium drop-shadow-md">
              García Jiménez
            </motion.h2>
            
            <CountdownBlock />
          </motion.div>
        </section>

        {/* Content Flow */}
        <div className="relative z-10 px-8 pt-12 flex flex-col items-center">
          {/* Message */}
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn} 
            className="font-serif text-lg text-pearl/90 leading-relaxed text-center mb-16 mx-4"
          >
            "Hoy comienza un capítulo inolvidable en mi vida y deseo compartirlo con las personas más importantes para mí.<br/><br/>
            Gracias por ser parte de esta historia y acompañarme en la celebración de mis XV años."
          </motion.p>

          {/* Parents & Godparents */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="w-full text-center mb-16 p-8 sm:p-12 border border-[#DFAB69]/40 rounded-3xl relative"
          >
            <motion.div variants={fadeIn} className="flex flex-col items-center mb-10">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <Heart className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-4">Mis Padres</h3>
              <p className="font-serif text-2xl text-pearl mb-1">Sergio García Rodríguez</p>
              <p className="font-serif text-2xl text-pearl">Areli Jiménez Sauz</p>
            </motion.div>
            
            <div className="w-16 h-px bg-gold/30 mx-auto mb-10" />
            
            <motion.div variants={fadeIn} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <Sparkles className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-4">Mis Padrinos</h3>
              <p className="font-serif text-2xl text-pearl mb-1">Ana María Villarruel Lobato</p>
              <p className="font-serif text-2xl text-pearl">Christian Omar García Rodríguez</p>
            </motion.div>
          </motion.section>

          {/* Ceremony */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn} 
            className="w-full text-center mb-16"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <HeartHandshake className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-4">Ceremonia Religiosa</h3>
              <p className="font-serif text-2xl text-pearl mb-2">Iglesia San Pedro Xalostoc</p>
              <div className="flex items-center justify-center gap-2 text-pearl/70 font-sans text-sm mb-6">
                <Clock size={16} className="text-gold" />
                <span>16:00 hrs</span>
              </div>
            </div>
          </motion.section>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: 64 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1 }}
            className="w-px bg-gradient-to-b from-transparent via-gold to-transparent mx-auto mb-16" 
          />

          {/* Reception */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="w-full text-center mb-20"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <CalendarHeart className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-4">Recepción</h3>
              <p className="font-serif text-2xl text-pearl mb-2">Salón de Fiestas Amaranto</p>
              <div className="flex items-center justify-center gap-2 text-pearl/70 font-sans text-sm mb-8">
                <Clock size={16} className="text-gold" />
                <span>18:15 hrs</span>
              </div>
              
              {/* Location Button */}
              <a 
                href="https://maps.app.goo.gl/EDGjXZuQDzTL8Mqp6"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-ink rounded-full font-sans text-xs tracking-widest uppercase overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <MapPin size={16} className="relative z-10" />
                <span className="relative z-10 font-bold">Ver Ubicación</span>
              </a>
            </div>
          </motion.section>

          {/* Dress Code Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="w-full text-center mb-20 p-8 sm:p-12 border border-[#DFAB69]/40 rounded-3xl relative"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <Shirt className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-6">Código de vestimenta</h3>
              <p className="font-sans text-sm text-pearl/80 leading-relaxed mb-4">
                Ayúdanos a que Vanessa sea la única estrella dorada de la noche.
              </p>
              <p className="font-sans text-sm text-pearl/80 leading-relaxed">
                ¡Cualquier otro color de vestimenta es bienvenido!
              </p>
            </div>
          </motion.section>

          {/* Gifts */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="w-full text-center mb-20 p-8 sm:p-12 border border-[#DFAB69]/40 rounded-3xl relative"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <Gift className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-6">Mesa de Regalos</h3>
              <p className="font-sans text-sm text-pearl/80 leading-relaxed mb-6">
                Tu presencia es mi mejor regalo, pero si deseas tener un detalle conmigo, puedes hacerlo aquí:
              </p>
              
              <div className="w-48 h-48 bg-pearl rounded-xl mb-6 flex items-center justify-center p-2 overflow-hidden shadow-lg border border-gold/30">
                <img 
                  src="https://card-pi-kohl.vercel.app/qr.png" 
                  alt="QR Code Mesa de Regalos"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <a 
                href="https://www.sears.com.mx/Mesa-de-Regalos/237556/te-invito-a-mi-xv-anos-vanessa-celeste"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-gold text-gold rounded-full font-sans text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:bg-gold hover:text-ink shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <span className="relative z-10 font-bold">Ver Mesa de Regalos</span>
              </a>
            </div>
          </motion.section>

          {/* Add to Calendar */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="w-full text-center mb-24 p-8 sm:p-12 border border-[#DFAB69]/40 rounded-3xl relative"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <CalendarHeart className="stroke-[1.5]" size={24} />
              </div>
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-4">Agendar Fecha</h3>
              <p className="font-serif text-2xl text-pearl mb-8">01 Agosto 2026</p>
              <AddToCalendar className="px-6 py-3 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-ink font-sans text-xs uppercase tracking-widest transition-all duration-300" />
            </div>
          </motion.section>

          {/* Footer - RSVP Trigger */}
          <motion.footer 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeIn}
            className="w-full text-center pb-8 border-t border-gold/20 pt-16 mt-8"
          >
            <h3 className="font-script text-4xl text-pearl mb-6">Esperamos contar<br/>con tu presencia</h3>
            <button 
              onClick={() => setIsRSVPOpen(true)}
              className="px-10 py-5 bg-transparent border-2 border-gold text-gold rounded-full font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-ink transition-all duration-300"
            >
              Confirmar Asistencia
            </button>
          </motion.footer>
          
        </div>
      </main>
    </div>
  );
}

