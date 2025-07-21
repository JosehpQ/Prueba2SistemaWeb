
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLogin from '../components/AdminLogin';
import ConductorLogin from '../components/ConductorLogin';

const initialConductores = [
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    licencia: 'A2a-12345',
    telefono: '987654321',
    password: 'carlos123',
    activo: true,
    fechaIngreso: '2024-01-15'
  },
  {
    id: 2,
    nombre: 'Miguel Torres',
    licencia: 'A2a-67890',
    telefono: '987654322',
    password: 'miguel123',
    activo: true,
    fechaIngreso: '2024-02-10'
  },
  {
    id: 3,
    nombre: 'Roberto Silva',
    licencia: 'A2a-11111',
    telefono: '987654323',
    password: 'roberto123',
    activo: true,
    fechaIngreso: '2024-03-05'
  },
  {
    id: 4,
    nombre: 'Juan Pérez',
    licencia: 'A2a-22222',
    telefono: '987654324',
    password: 'juan123',
    activo: true,
    fechaIngreso: '2024-03-20'
  }
];

export default function Home() {
  const [userType, setUserType] = useState<'conductor' | 'admin' | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showConductorLogin, setShowConductorLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ type: '', name: '' });
  const [conductores] = useState(initialConductores);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for existing session only after component mounts
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const user = JSON.parse(userSession);
        setIsAuthenticated(true);
        setCurrentUser({ type: user.type, name: user.name });
      } catch (error) {
        // Clear invalid session data
        localStorage.removeItem('userSession');
      }
    }
  }, []);

  const handleAdminAccess = () => {
    if (!mounted) return;
    setUserType('admin');
    setShowAdminLogin(true);
  };

  const handleConductorAccess = () => {
    if (!mounted) return;
    setUserType('conductor');
    setShowConductorLogin(true);
  };

  const handleLogin = (type: string, name: string) => {
    if (!mounted) return;
    setIsAuthenticated(true);
    setCurrentUser({ type, name });
    setShowAdminLogin(false);
    setShowConductorLogin(false);
    
    // Store user session
    localStorage.setItem('userSession', JSON.stringify({ type, name }));
  };

  const handleCancel = () => {
    if (!mounted) return;
    setUserType(null);
    setShowAdminLogin(false);
    setShowConductorLogin(false);
  };

  const handleLogout = () => {
    if (!mounted) return;
    setIsAuthenticated(false);
    setCurrentUser({ type: '', name: '' });
    localStorage.removeItem('userSession');
  };

  // Don't render until component is mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-truck-line text-white text-xl"></i>
          </div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <i className="ri-truck-line text-red-600 text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Transportes Línea</h1>
                <p className="text-sm text-red-100">Sistema de Rutas Arequipa - Cerro Verde</p>
              </div>
            </div>
            {isAuthenticated && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <i className={`${currentUser.type === 'admin' ? 'ri-settings-3-line' : 'ri-steering-2-line'} text-white`}></i>
                </div>
                <span className="text-sm font-medium text-white">{currentUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20transportation%20company%20with%20modern%20red%20and%20blue%20buses%20traveling%20through%20mountainous%20landscape%20of%20Arequipa%20Peru%2C%20clear%20mountain%20roads%20connecting%20urban%20areas%20to%20mining%20facilities%2C%20beautiful%20Andean%20scenery%20with%20snow-capped%20volcanoes%20in%20background%2C%20clean%20corporate%20transportation%20fleet%20on%20scenic%20highway%20routes%20with%20red%20and%20blue%20company%20branding&width=1200&height=600&seq=transport-hero-redblue&orientation=landscape')`
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Sistema de Navegación GPS
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rutas optimizadas para el transporte de personal entre Arequipa y Cerro Verde
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleConductorAccess}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-steering-2-line text-xl"></i>
                  <span>Acceso Conductor</span>
                </button>
                <button
                  onClick={handleAdminAccess}
                  className="bg-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-800 transition-colors shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-settings-3-line text-xl"></i>
                  <span>Acceso Administrador</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Access Selection */}
      {isAuthenticated && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 ${currentUser.type === 'conductor' ? 'bg-blue-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${currentUser.type === 'conductor' ? 'ri-steering-2-line text-blue-600' : 'ri-settings-3-line text-red-600'} text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Bienvenido, {currentUser.name}
              </h3>
              <p className="text-gray-600">
                {currentUser.type === 'conductor' 
                  ? 'Accede a las rutas GPS diferenciadas por recojo y reparto'
                  : 'Gestiona rutas, enlaces de MyMaps, imágenes y conductores del sistema'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <i className="ri-arrow-down-circle-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rutas de Recojo</h4>
                    <p className="text-sm text-gray-600">Navegación para recoger personal</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• MyMaps con navegación GPS</li>
                  <li>• Imágenes descargables</li>
                  <li>• Rutas optimizadas por zona</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <i className="ri-arrow-up-circle-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rutas de Reparto</h4>
                    <p className="text-sm text-gray-600">Navegación para entregar personal</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• MyMaps con navegación GPS</li>
                  <li>• Imágenes descargables</li>
                  <li>• Rutas optimizadas por zona</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href={currentUser.type === 'conductor' ? '/conductor' : '/admin'}
                className={`${currentUser.type === 'conductor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'} text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg inline-flex items-center space-x-2 whitespace-nowrap`}
              >
                <span>Continuar</span>
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      {!isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Características del Sistema
            </h3>
            <p className="text-lg text-gray-600">
              Herramientas profesionales para una navegación eficiente y segura
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-navigation-line text-blue-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">GPS Integrado</h4>
              <p className="text-gray-600">
                Navegación en tiempo real con mapas de Google MyMaps actualizados constantemente para recojo y reparto.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-red-500">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-route-line text-red-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Rutas Diferenciadas</h4>
              <p className="text-gray-600">
                7 zonas estratégicas con rutas separadas para recojo y reparto, optimizando los tiempos de viaje.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-green-600 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Control Total</h4>
              <p className="text-gray-600">
                Panel administrativo completo para gestionar rutas, enlaces, imágenes y base de datos de conductores.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-800 to-blue-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <i className="ri-truck-line text-red-600"></i>
            </div>
            <span className="text-lg font-semibold">Transportes Línea</span>
          </div>
          <p className="text-red-100">
            Sistema de navegación profesional - Arequipa • Cerro Verde
          </p>
        </div>
      </footer>

      {/* Login Modals */}
      {showAdminLogin && (
        <AdminLogin
          onLogin={handleLogin}
          onCancel={handleCancel}
        />
      )}

      {showConductorLogin && (
        <ConductorLogin
          onLogin={handleLogin}
          onCancel={handleCancel}
          conductores={conductores.filter(c => c.activo)}
        />
      )}
    </div>
  );
}