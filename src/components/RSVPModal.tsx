import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function RSVPModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [guests, setGuests] = useState('1');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await addDoc(collection(db, 'confirmaciones'), {
        name,
        attendance: attendance === 'yes',
        guests: parseInt(guests, 10),
        message,
        createdAt: serverTimestamp()
      });
      setStatus('success');
    } catch (error) {
      console.error("Error saving RSVP", error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 w-full max-w-md mx-auto bg-pearl rounded-t-3xl shadow-2xl border-t border-gold/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-ink/50 hover:text-ink transition-colors z-10"
            >
              <X size={24} />
            </button>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={32} />
                </div>
                <h3 className="font-serif text-2xl text-ink mb-2">¡Gracias por confirmar!</h3>
                <p className="font-sans text-ink/70">Hemos registrado tu respuesta, ¡mil gracias!</p>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3 bg-ink text-pearl rounded-full font-sans text-sm tracking-widest uppercase hover:bg-ink/90 transition-colors"
                >
                  Cerrar
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-ink text-center mb-1 mt-2">Confirmar Asistencia</h3>
                  <p className="font-sans text-xs text-center text-ink/60 uppercase tracking-widest mb-6">
                    1 de Agosto, 2026
                  </p>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-500 font-sans text-sm p-3 rounded-lg border border-red-200 text-center">
                    Hubo un problema al guardar. Intenta de nuevo por favor.
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans transition-all"
                      placeholder="Ej. María Fernanda López"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Asistencia
                    </label>
                    <select 
                      required 
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans appearance-none"
                    >
                      <option value="yes">Sí asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {attendance === 'yes' && (
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                        Número de acompañantes
                      </label>
                      <select 
                        required 
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans appearance-none"
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i}>{i} acompañantes</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Mensaje de felicitación (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans resize-none transition-all"
                      placeholder="Escribe tus mejores deseos para Vanessa..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 bg-ink text-pearl rounded-xl font-sans text-sm tracking-widest uppercase hover:bg-ink/90 transition-colors flex justify-center items-center gap-2"
                >
                  {status === 'submitting' ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-pearl/30 border-t-pearl rounded-full"
                    />
                  ) : (
                    "Enviar Confirmación"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
