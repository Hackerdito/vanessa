import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      // Como estamos en desarrollo, si el usuario específico solicitado no existe, intentamos crearlo
      if (email === 'vanessa@xv.com') {
        try {
          const { createUserWithEmailAndPassword } = await import('firebase/auth');
          await createUserWithEmailAndPassword(auth, email, password);
          return; // Éxito al crear y loguear
        } catch (createErr) {
          console.error("Error creating user auto-fallback:", createErr);
        }
      }
      
      setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-pearl bokeh-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/floral-motif.png')] opacity-[0.03] mix-blend-screen pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold-dark/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="backdrop-blur-xl bg-ink/40 p-8 rounded-3xl border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.05)] flex flex-col items-center">
          
          <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-6 text-gold">
            <Sparkles className="stroke-[1.5]" size={24} />
          </div>

          <h1 className="font-script text-4xl text-pearl mb-2 drop-shadow-md">Bienvenido</h1>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-light mb-8 text-center">Accede a la invitación</p>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-pearl/60 mb-2 ml-1">Correo Electrónico</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vanessa@xv.com"
                className="w-full bg-ink/50 border border-gold/20 rounded-xl px-4 py-3 text-pearl font-sans text-sm outline-none focus:border-gold/60 transition-colors placeholder:text-pearl/20"
              />
            </div>

            <div>
              <label className="block font-sans text-xs uppercase tracking-widest text-pearl/60 mb-2 ml-1">Contraseña</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-ink/50 border border-gold/20 rounded-xl px-4 py-3 text-pearl font-sans text-sm outline-none focus:border-gold/60 transition-colors placeholder:text-pearl/20"
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-400 text-xs text-center font-sans tracking-wide"
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-4 relative group flex items-center justify-center py-4 bg-gold text-ink rounded-xl font-sans text-xs font-bold tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ingresar'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
