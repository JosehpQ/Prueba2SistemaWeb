
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Route {
  id: number;
  title: string;
  description: string;
  recojoMapUrl: string;
  repartoMapUrl: string;
  recojoImage: string;
  repartoImage: string;
  color: string;
}

const routes: Route[] = [
  {
    id: 1,
    title: 'Zonas 1, 1A, 1B, 1C, 1D',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1pvWv5DKrJITg6lt54Lt42BM2fQMmvSQ&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1pvWv5DKrJITg6lt54Lt42BM2fQMmvSQ&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%201%201A%201B%201C%201D%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona1&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%201%201A%201B%201C%201D%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona1&orientation=landscape',
    color: 'bg-red-500'
  },
  {
    id: 2,
    title: 'Zonas 2A, 2B',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=16e4X6f0QFyT6aR1bEHdgmszdfbs1Jeg&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=16e4X6f0QFyT6aR1bEHdgmszdfbs1Jeg&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%202A%202B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona2&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%202A%202B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona2&orientation=landscape',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Zonas 3, 3A, 3B',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1MtRP38g9wBBoaOUW_8lRKmzbTUIQYjs&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1MtRP38g9wBBoaOUW_8lRKmzbTUIQYjs&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%203%203A%203B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona3&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%203%203A%203B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona3&orientation=landscape',
    color: 'bg-red-600'
  },
  {
    id: 4,
    title: 'Zona 4',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=16aX7KwOlEhshwRqCcs2vO-irpaYzySo&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=16aX7KwOlEhshwRqCcs2vO-irpaYzySo&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zone%204%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona4&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zone%204%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona4&orientation=landscape',
    color: 'bg-blue-600'
  },
  {
    id: 5,
    title: 'Zonas 5, 5A, 5B',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1RDjjH9H6fe6dtugGUT3on2YiXYiPE2M&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1RDjjH9H6fe6dtugGUT3on2YiXYiPE2M&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%205%205A%205B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona5&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%205%205A%205B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona5&orientation=landscape',
    color: 'bg-red-500'
  },
  {
    id: 6,
    title: 'Zonas 6/7',
    description: 'Buenos Aires, ENACE, Yanahuara',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1__sJZHPggyBtCpLaLZfkwnXQZf4DJxU&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1__sJZHPggyBtCpLaLZfkwnXQZf4DJxU&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20Buenos%20Aires%20ENACE%20Yanahuara%20zones%206%207%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona6&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20Buenos%20Aires%20ENACE%20Yanahuara%20zones%206%207%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona6&orientation=landscape',
    color: 'bg-blue-500'
  },
  {
    id: 7,
    title: 'Zonas 11/12',
    description: 'Congata, Hunter, Tiabaya, Hunter-Tiabaya',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1dlnaMgNC44BgdD56KG67YlpIuM648gA&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1dlnaMgNC44BgdD56KG67YlpIuM648gA&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20Congata%20Hunter%20Tiabaya%20zones%2011%2012%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona7&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20Congata%20Hunter%20Tiabaya%20zones%2011%2012%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona7&orientation=landscape',
    color: 'bg-red-600'
  }
];

export default function ConductorPage() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedMapType, setSelectedMapType] = useState<'recojo' | 'reparto' | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: 'Conductor' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const userSession = localStorage.getItem('userSession');
      if (userSession) {
        try {
          const user = JSON.parse(userSession);
          setCurrentUser({ name: user.name });
        } catch (error) {
          console.error('Error parsing user session:', error);
        }
      }
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-truck-line text-white text-xl"></i>
          </div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const openRoute = (route: Route, mapType: 'recojo' | 'reparto') => {
    setSelectedRoute(route);
    setSelectedMapType(mapType);
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const viewImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <i className="ri-truck-line text-red-600 text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Transportes Línea</h1>
                <p className="text-sm text-red-100">Panel de Conductor</p>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-steering-2-line text-white"></i>
              </div>
              <span className="text-sm font-medium text-white">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Bienvenido, {currentUser.name}</h2>
              <p className="text-red-100 text-lg">
                Selecciona tu zona y tipo de ruta para comenzar la navegación
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-navigation-line text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`${route.color} h-3`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {route.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {route.description}
                    </p>
                  </div>
                  <div className(`${route.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <i className="ri-map-pin-line text-white"></i>
                  </div>
                </div>

                {/* Route Type Buttons */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openRoute(route, 'recojo')}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center space-x-1 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-arrow-down-circle-line"></i>
                      <span>Recojo</span>
                    </button>
                    <button
                      onClick={() => openRoute(route, 'reparto')}
                      className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-3 rounded-lg transition-colors text-sm flex items-center justify-center space-x-1 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-arrow-up-circle-line"></i>
                      <span>Reparto</span>
                    </button>
                  </div>

                  {/* Image Options */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => viewImage(route.recojoImage)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-xs flex items-center justify-center space-x-1 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-image-line"></i>
                      <span>Ver Recojo</span>
                    </button>
                    <button
                      onClick={() => viewImage(route.repartoImage)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-xs flex items-center justify-center space-x-1 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-image-line"></i>
                      <span>Ver Reparto</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-blue-600 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Instrucciones de Uso
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="ri-check-line text-red-500"></i>
                  <span>Selecciona tu zona y el tipo de ruta (Recojo o Reparto)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="ri-check-line text-red-500"></i>
                  <span>Usa los botones azules para rutas de recojo y rojos para reparto</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="ri-check-line text-red-500"></i>
                  <span>Puedes ver las imágenes del mapa o descargarlas para uso offline</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="ri-check-line text-red-500"></i>
                  <span>El mapa se abrirá en MyMaps con navegación GPS en tiempo real</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Route Modal */}
      {selectedRoute && selectedMapType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {selectedRoute.title} - {selectedMapType === 'recojo' ? 'Recojo' : 'Reparto'}
                </h3>
                <button
                  onClick={() => { setSelectedRoute(null); setSelectedMapType(null); }}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-white"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${selectedMapType === 'recojo' ? 'bg-blue-500' : 'bg-red-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${selectedMapType === 'recojo' ? 'ri-arrow-down-circle-line' : 'ri-arrow-up-circle-line'} text-white text-2xl`}></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Opciones de Navegación
                </h4>
                <p className="text-gray-600">
                  Elige cómo quieres acceder al mapa de {selectedMapType}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.open(selectedMapType === 'recojo' ? selectedRoute.recojoMapUrl : selectedRoute.repartoMapUrl, '_blank');
                    }
                    setSelectedRoute(null);
                    setSelectedMapType(null);
                  }}
                  className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-external-link-line"></i>
                  <span>Abrir en MyMaps</span>
                </button>
                <button
                  onClick={() => {
                    viewImage(selectedMapType === 'recojo' ? selectedRoute.recojoImage : selectedRoute.repartoImage);
                    setSelectedRoute(null);
                    setSelectedMapType(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-image-line"></i>
                  <span>Ver Imagen</span>
                </button>
              </div>

              <button
                onClick={() => {
                  downloadImage(
                    selectedMapType === 'recojo' ? selectedRoute.recojoImage : selectedRoute.repartoImage,
                    `${selectedRoute.title.replace(/[^a-zA-Z0-9]/g, '_')}_${selectedMapType}.jpg`
                  );
                }}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line"></i>
                <span>Descargar Imagen del Mapa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Vista del Mapa</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Mapa de ruta"
                className="w-full h-auto object-contain max-h-[70vh]"
              />
              <div className="p-4 flex justify-center">
                <button
                  onClick={() => downloadImage(selectedImage, 'mapa_ruta.jpg')}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line"></i>
                  <span>Descargar Imagen</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
