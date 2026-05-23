import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { LogOut, Users, CheckCircle, XCircle } from 'lucide-react';

export default function Admin() {
  const [confirmations, setConfirmations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'confirmaciones'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConfirmations(data);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching confirmations: ", err);
      setError("No se pudieron cargar los datos. Verifica las reglas de seguridad de Firestore.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth);
  };

  const totalAttending = confirmations.filter(c => c.attendance === true).length;
  const totalNotAttending = confirmations.filter(c => c.attendance === false).length;
  const totalGuests = confirmations.reduce((acc, curr) => {
    if (curr.attendance === true) {
      return acc + (curr.guests || 0);
    }
    return acc;
  }, 0);
  const totalPeople = totalAttending + totalGuests;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-ink font-sans">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl">Panel de Administración</h1>
            <p className="text-sm text-neutral-500">Gestión de invitados - Mis XV Años</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:text-ink hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <CheckCircle className="text-green-500 mb-3" size={28} />
            <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Confirmados</p>
            <p className="text-3xl font-serif">{totalAttending}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <Users className="text-blue-500 mb-3" size={28} />
            <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Acompañantes</p>
            <p className="text-3xl font-serif">{totalGuests}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <Users className="text-gold mb-3" size={28} />
            <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">Total Asistentes</p>
            <p className="text-3xl font-serif font-bold text-gold-dark">{totalPeople}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <XCircle className="text-red-400 mb-3" size={28} />
            <p className="text-sm text-neutral-500 uppercase tracking-widest mb-1">No Asistirán</p>
            <p className="text-3xl font-serif text-neutral-400">{totalNotAttending}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="p-6 border-b border-neutral-100">
            <h2 className="font-serif text-xl">Lista de Confirmaciones</h2>
            <p className="text-sm text-neutral-500 mt-1">Registros recibidos desde el formulario de la invitación.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50/50 text-neutral-600 font-medium border-b border-neutral-100">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-wider text-xs">Nombre</th>
                  <th className="px-6 py-4 uppercase tracking-wider text-xs">Asistencia</th>
                  <th className="px-6 py-4 uppercase tracking-wider text-xs whitespace-nowrap">Acompañantes</th>
                  <th className="px-6 py-4 uppercase tracking-wider text-xs w-1/3">Mensaje</th>
                  <th className="px-6 py-4 uppercase tracking-wider text-xs">Fecha Respuesta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {confirmations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                      Aún no hay confirmaciones registradas.
                    </td>
                  </tr>
                ) : (
                  confirmations.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-ink whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4">
                        {item.attendance ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Sí asistirá
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            No asistirá
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.attendance ? item.guests : '-'}
                      </td>
                      <td className="px-6 py-4 text-neutral-600 text-sm italic">
                        {item.message ? `"${item.message}"` : <span className="text-neutral-400">Sin mensaje</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-neutral-500 text-xs">
                        {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleString('es-MX', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        }) : 'Justo ahora'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
