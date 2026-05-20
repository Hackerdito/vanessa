import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function RSVPModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => setStatus('success'), 1500);
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
            className="fixed inset-x-0 bottom-0 z-50 w-full max-w-md mx-auto bg-pearl rounded-t-3xl shadow-2xl border-t border-gold/30 p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-ink/50 hover:text-ink transition-colors"
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
                <p className="font-sans text-ink/70">Tu presencia hará de este día algo inolvidable.</p>
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
                  <h3 className="font-serif text-2xl text-ink text-center mb-1">Confirmar Asistencia</h3>
                  <p className="font-sans text-xs text-center text-ink/60 uppercase tracking-widest mb-8">
                    1 de Agosto, 2026
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Nombre Completo
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans transition-all"
                      placeholder="Ej. María Fernanda López"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Asistencia
                    </label>
                    <select required className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans appearance-none">
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré con gusto</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Número de personas
                    </label>
                    <select required className="w-full px-4 py-3 text-ink bg-white/50 border border-gold/30 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 font-sans appearance-none">
                      <option value="">Selecciona la cantidad</option>
                      {Array.from({ length: 20 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-wider text-ink/70 mb-2 ml-1">
                      Mensaje de felicitación (Opcional)
                    </label>
                    <textarea
                      rows={3}
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
