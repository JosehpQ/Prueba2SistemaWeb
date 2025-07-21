
'use client';

import { useState } from 'react';

interface Conductor {
  id: number;
  nombre: string;
  licencia: string;
  telefono: string;
  password: string;
  activo: boolean;
  fechaIngreso: string;
}

interface ConductorLoginProps {
  onLogin: (type: string, name: string) => void;
  onCancel: () => void;
  conductores: Conductor[];
}

const ConductorLogin = ({ onLogin, onCancel, conductores }: ConductorLoginProps) => {
  const [selectedConductor, setSelectedConductor] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const conductor = conductores.find(c => c.id === parseInt(selectedConductor));
      
      if (conductor && password === conductor.password) {
        onLogin('conductor', conductor.nombre);
      } else {
        setError('Conductor o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Acceso de Conductor</h3>
            <button
              onClick={onCancel}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
            >
              <i className="ri-close-line text-white"></i>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-steering-2-line text-blue-600 text-2xl"></i>
            </div>
            <p className="text-gray-600">
              Selecciona tu nombre e ingresa tu contraseña
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Conductor
              </label>
              <div className="relative">
                <select
                  value={selectedConductor}
                  onChange={(e) => setSelectedConductor(e.target.value)}
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  required
                >
                  <option value="">Selecciona tu nombre</option>
                  {conductores.map((conductor) => (
                    <option key={conductor.id} value={conductor.id}>
                      {conductor.nombre} - {conductor.licencia}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !selectedConductor}
              className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-line animate-spin"></i>
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <i className="ri-login-circle-line"></i>
                  <span>Iniciar Sesión</span>
                </>
              )}
            </button>
          </form>

          {conductores.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <i className="ri-alert-line text-yellow-600"></i> 
                No hay conductores registrados. Contacta al administrador.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConductorLogin;