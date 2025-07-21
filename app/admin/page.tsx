
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
  lastUpdate: string;
}

interface Conductor {
  id: number;
  nombre: string;
  licencia: string;
  telefono: string;
  password: string;
  activo: boolean;
  fechaIngreso: string;
}

interface RouteForm {
  title: string;
  description: string;
  recojoMapUrl: string;
  repartoMapUrl: string;
  recojoImage: string;
  repartoImage: string;
}

interface ConductorForm {
  nombre: string;
  licencia: string;
  telefono: string;
  password: string;
}

const initialRoutes: Route[] = [
  {
    id: 1,
    title: 'Zonas 1, 1A, 1B, 1C, 1D',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1pvWv5DKrJITg6lt54Lt42BM2fQMmvSQ&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1pvWv5DKrJITg6lt54Lt42BM2fQMmvSQ&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%201%201A%201B%201C%201D%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona1&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%201%201A%201B%201C%201D%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona1&orientation=landscape',
    color: 'bg-red-500',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 2,
    title: 'Zonas 2A, 2B',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=16e4X6f0QFyT6aR1bEHdgmszdfbs1Jeg&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=16e4X6f0QFyT6aR1bEHdgmszdfbs1Jeg&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%202A%202B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona2&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%202A%202B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona2&orientation=landscape',
    color: 'bg-blue-500',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 3,
    title: 'Zonas 3, 3A, 3B',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1MtRP38g9wBBoaOUW_8lRKmzbTUIQYjs&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1MtRP38g9wBBoaOUW_8lRKmzbTUIQYjs&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%203%203A%203B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona3&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%203%203A%203B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona3&orientation=landscape',
    color: 'bg-red-600',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 4,
    title: 'Zona 4',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=16aX7KwOlEhshwRqCcs2vO-irpaYzySo&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=16aX7KwOlEhshwRqCcs2vO-irpaYzySo&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zone%204%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona4&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zone%204%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona4&orientation=landscape',
    color: 'bg-blue-600',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 5,
    title: 'Zonas 5, 5A, 5B',
    description: 'Recojo y Reparto',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1RDjjH9H6fe6dtugGUT3on2YiXYiPE2M&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1RDjjH9H6fe6dtugGUT3on2YiXYiPE2M&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20residential%20zones%205%205A%205B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona5&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20residential%20zones%205%205A%205B%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona5&orientation=landscape',
    color: 'bg-red-500',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 6,
    title: 'Zonas 6/7',
    description: 'Buenos Aires, ENACE, Yanahuara',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1__sJZHPggyBtCpLaLZfkwnXQZf4DJxU&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1__sJZHPggyBtCpLaLZfkwnXQZf4DJxU&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20Buenos%20Aires%20ENACE%20Yanahuara%20zones%206%207%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona6&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20Buenos%20Aires%20ENACE%20Yanahuara%20zones%206%207%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona6&orientation=landscape',
    color: 'bg-blue-500',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  },
  {
    id: 7,
    title: 'Zonas 11/12',
    description: 'Congata, Hunter, Tiabaya, Hunter-Tiabaya',
    recojoMapUrl: 'https://www.google.com/maps/d/edit?mid=1dlnaMgNC44BgdD56KG67YlpIuM648gA&usp=sharing',
    repartoMapUrl: 'https://www.google.com/maps/d/edit?mid=1dlnaMgNC44BgdD56KG67YlpIuM648gA&usp=sharing',
    recojoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20pickup%20routes%20in%20Congata%20Hunter%20Tiabaya%20zones%2011%2012%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20stops%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=recojo-zona7&orientation=landscape',
    repartoImage: 'https://readdy.ai/api/search-image?query=Detailed%20GPS%20navigation%20map%20showing%20delivery%20routes%20in%20Congata%20Hunter%20Tiabaya%20zones%2011%2012%20of%20Arequipa%20Peru%2C%20clear%20street%20layout%20with%20marked%20delivery%20points%20and%20directions%2C%20professional%20transport%20route%20planning%20visualization%20with%20red%20and%20blue%20color%20scheme%2C%20easy%20to%20read%20for%20drivers&width=800&height=600&seq=reparto-zona7&orientation=landscape',
    color: 'bg-red-600',
    lastUpdate: new Date().toLocaleDateString('es-ES')
  }
];

const initialConductores: Conductor[] = [
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

export default function AdminPage() {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);
  const [conductores, setConductores] = useState<Conductor[]>(initialConductores);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConductoresModal, setShowConductoresModal] = useState(false);
  const [editingConductor, setEditingConductor] = useState<Conductor | null>(null);
  const [showAddConductorModal, setShowAddConductorModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'routes' | 'conductores'>('routes');
  const [editForm, setEditForm] = useState<RouteForm>({
    title: '',
    description: '',
    recojoMapUrl: '',
    repartoMapUrl: '',
    recojoImage: '',
    repartoImage: ''
  });
  const [conductorForm, setConductorForm] = useState<ConductorForm>({
    nombre: '',
    licencia: '',
    telefono: '',
    password: ''
  });
  const [importData, setImportData] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const userSession = localStorage.getItem('userSession');
      if (!userSession) {
        window.location.href = '/';
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

  const startEdit = (route: Route) => {
    setEditingRoute(route);
    setEditForm({
      title: route.title,
      description: route.description,
      recojoMapUrl: route.recojoMapUrl,
      repartoMapUrl: route.repartoMapUrl,
      recojoImage: route.recojoImage,
      repartoImage: route.repartoImage
    });
  };

  const cancelEdit = () => {
    setEditingRoute(null);
    setShowAddModal(false);
    setEditForm({
      title: '',
      description: '',
      recojoMapUrl: '',
      repartoMapUrl: '',
      recojoImage: '',
      repartoImage: ''
    });
  };

  const saveRoute = () => {
    if (!editForm.recojoMapUrl.trim() || !editForm.repartoMapUrl.trim()) {
      if (typeof window !== 'undefined') {
        alert('Los enlaces de los mapas son requeridos');
      }
      return;
    }

    if (editingRoute) {
      const updatedRoutes = routes.map(route =>
        route.id === editingRoute.id
          ? {
              ...route,
              title: editForm.title,
              description: editForm.description,
              recojoMapUrl: editForm.recojoMapUrl,
              repartoMapUrl: editForm.repartoMapUrl,
              recojoImage: editForm.recojoImage,
              repartoImage: editForm.repartoImage,
              lastUpdate: new Date().toLocaleDateString('es-ES')
            }
          : route
      );
      setRoutes(updatedRoutes);
    } else {
      const newRoute: Route = {
        id: Math.max(...routes.map(r => r.id)) + 1,
        title: editForm.title,
        description: editForm.description,
        recojoMapUrl: editForm.recojoMapUrl,
        repartoMapUrl: editForm.repartoMapUrl,
        recojoImage: editForm.recojoImage,
        repartoImage: editForm.repartoImage,
        color: routes.length % 2 === 0 ? 'bg-red-500' : 'bg-blue-500',
        lastUpdate: new Date().toLocaleDateString('es-ES')
      };
      setRoutes([...routes, newRoute]);
    }

    setEditingRoute(null);
    setShowAddModal(false);
    setEditForm({
      title: '',
      description: '',
      recojoMapUrl: '',
      repartoMapUrl: '',
      recojoImage: '',
      repartoImage: ''
    });

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const deleteRoute = (routeId: number) => {
    if (typeof window !== 'undefined' && confirm('¿Estás seguro de que quieres eliminar esta ruta?')) {
      setRoutes(routes.filter(route => route.id !== routeId));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const startEditConductor = (conductor: Conductor) => {
    setEditingConductor(conductor);
    setConductorForm({
      nombre: conductor.nombre,
      licencia: conductor.licencia,
      telefono: conductor.telefono,
      password: conductor.password
    });
  };

  const cancelConductorEdit = () => {
    setEditingConductor(null);
    setShowAddConductorModal(false);
    setConductorForm({
      nombre: '',
      licencia: '',
      telefono: '',
      password: ''
    });
  };

  const saveConductor = () => {
    if (!conductorForm.nombre.trim() || !conductorForm.licencia.trim() || !conductorForm.password.trim()) {
      if (typeof window !== 'undefined') {
        alert('Nombre, licencia y contraseña son requeridos');
      }
      return;
    }

    if (editingConductor) {
      const updatedConductores = conductores.map(conductor =>
        conductor.id === editingConductor.id
          ? {
              ...conductor,
              nombre: conductorForm.nombre,
              licencia: conductorForm.licencia,
              telefono: conductorForm.telefono,
              password: conductorForm.password
            }
          : conductor
      );
      setConductores(updatedConductores);
    } else {
      const newConductor: Conductor = {
        id: Math.max(...conductores.map(c => c.id), 0) + 1,
        nombre: conductorForm.nombre,
        licencia: conductorForm.licencia,
        telefono: conductorForm.telefono,
        password: conductorForm.password,
        activo: true,
        fechaIngreso: new Date().toISOString().split('T')[0]
      };
      setConductores([...conductores, newConductor]);
    }

    setEditingConductor(null);
    setShowAddConductorModal(false);
    setConductorForm({
      nombre: '',
      licencia: '',
      telefono: '',
      password: ''
    });

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const toggleConductorStatus = (conductorId: number) => {
    const updatedConductores = conductores.map(conductor =>
      conductor.id === conductorId
        ? { ...conductor, activo: !conductor.activo }
        : conductor
    );
    setConductores(updatedConductores);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const deleteConductor = (conductorId: number) => {
    if (typeof window !== 'undefined' && confirm('¿Estás seguro de que quieres eliminar este conductor?')) {
      setConductores(conductores.filter(conductor => conductor.id !== conductorId));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  const handleImport = () => {
    try {
      if (!importData.trim()) {
        if (typeof window !== 'undefined') {
          alert('Por favor ingresa los datos para importar');
        }
        return;
      }

      const lines = importData.trim().split('\\n');
      const newConductores: Conductor[] = [];
      const errors: string[] = [];

      lines.forEach((line, index) => {
        const parts = line.split(',').map(part => part.trim());

        if (parts.length >= 4) {
          const [nombre, licencia, telefono, password] = parts;

          if (nombre && licencia && password) {
            const existingConductor = conductores.find(c =>
              c.licencia.toLowerCase() === licencia.toLowerCase()
            );

            if (!existingConductor) {
              newConductores.push({
                id: Math.max(...conductores.map(c => c.id), 0) + newConductores.length + 1,
                nombre,
                licencia,
                telefono: telefono || '',
                password,
                activo: true,
                fechaIngreso: new Date().toISOString().split('T')[0]
              });
            } else {
              errors.push(`Línea \\${index + 1}: La licencia \\${licencia} ya existe`);
            }
          } else {
            errors.push(`Línea \\${index + 1}: Faltan datos obligatorios (nombre, licencia, contraseña)`);
          }
        } else {
          errors.push(`Línea \\${index + 1}: Formato incorrecto`);
        }
      });

      if (errors.length > 0 && typeof window !== 'undefined') {
        alert('Errores encontrados:\\n' + errors.join('\\n'));
        return;
      }

      if (newConductores.length === 0 && typeof window !== 'undefined') {
        alert('No se encontraron conductores válidos para importar');
        return;
      }

      setConductores([...conductores, ...newConductores]);
      setImportData('');
      setShowImportModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);

      if (typeof window !== 'undefined') {
        alert(`Se importaron exitosamente \\${newConductores.length} conductores`);
      }
    } catch (error) {
      if (typeof window !== 'undefined') {
        alert('Error al procesar los datos. Verifica el formato.');
      }
    }
  };

  const handleInputChange = (field: keyof RouteForm, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleConductorInputChange = (field: keyof ConductorForm, value: string) => {
    setConductorForm(prev => ({ ...prev, [field]: value }));
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
                <p className="text-sm text-red-100">Panel de Administración</p>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-settings-3-line text-white"></i>
              </div>
              <span className="text-sm font-medium text-white">Administrador</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Panel de Administración</h2>
              <p className="text-red-100 text-lg">
                Gestiona rutas, enlaces de MyMaps, imágenes y conductores del sistema
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-settings-gear-line text-white text-2xl"></i>
              </div>
            </div>
          </div>
        </div>

        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2">
            <i className="ri-check-circle-line text-green-600"></i>
            <span>Operación completada exitosamente</span>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Rutas</p>
                <p className="text-2xl font-bold text-gray-800">{routes.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-route-line text-red-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Conductores Activos</p>
                <p className="text-2xl font-bold text-gray-800">{conductores.filter(c => c.activo).length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-steering-2-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conductores</p>
                <p className="text-2xl font-bold text-gray-800">{conductores.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-team-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Última Actualización</p>
                <p className="text-2xl font-bold text-gray-800">Hoy</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-orange-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('routes')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'routes'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              <i className="ri-route-line mr-2"></i>
              Gestión de Rutas
            </button>
            <button
              onClick={() => setActiveTab('conductores')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'conductores'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <i className="ri-steering-2-line mr-2"></i>
              Gestión de Conductores
            </button>
          </div>

          {activeTab === 'routes' && (
            <div>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Gestión de Rutas</h3>
                    <p className="text-gray-600 mt-1">Administra enlaces de MyMaps e imágenes para cada zona</p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                    <span>Agregar Ruta</span>
                  </button>
                </div>
              </div>

              <div className="divide-y max-h-96 overflow-y-auto">
                {routes.map((route) => (
                  <div key={route.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-4 h-4 ${route.color} rounded-full`}></div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {route.title}
                          </h4>
                          <p className="text-gray-600 text-sm">{route.description}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Última actualización: {route.lastUpdate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.open(route.recojoMapUrl, '_blank');
                            }
                          }}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-arrow-down-circle-line"></i>
                          <span>Recojo</span>
                        </button>
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.open(route.repartoMapUrl, '_blank');
                            }
                          }}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-arrow-up-circle-line"></i>
                          <span>Reparto</span>
                        </button>
                        <button
                          onClick={() => startEdit(route)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => deleteRoute(route.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'conductores' && (
            <div>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Gestión de Conductores</h3>
                    <p className="text-gray-600 mt-1">Administra la base de datos de conductores y sus credenciales</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowImportModal(true)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-upload-line"></i>
                      <span>Importar</span>
                    </button>
                    <button
                      onClick={() => setShowAddConductorModal(true)}
                      className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-add-line"></i>
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="divide-y max-h-96 overflow-y-auto">
                {conductores.map((conductor) => (
                  <div key={conductor.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`w-10 h-10 ${conductor.activo ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                          <i className={`ri-steering-2-line ${conductor.activo ? 'text-green-600' : 'text-gray-400'}`}></i>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {conductor.nombre}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              conductor.activo
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {conductor.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">Licencia: {conductor.licencia}</p>
                          <p className="text-gray-600 text-sm">Teléfono: {conductor.telefono}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Ingreso: {conductor.fechaIngreso}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleConductorStatus(conductor.id)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer ${
                            conductor.activo
                              ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                              : 'bg-green-100 hover:bg-green-200 text-green-700'
                          }`}
                        >
                          <i className={conductor.activo ? 'ri-pause-circle-line' : 'ri-play-circle-line'}></i>
                          <span>{conductor.activo ? 'Desactivar' : 'Activar'}</span>
                        </button>
                        <button
                          onClick={() => startEditConductor(conductor)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => deleteConductor(conductor.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {(editingRoute || showAddModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-red-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {editingRoute ? `Editar: ${editingRoute.title}` : 'Agregar Nueva Ruta'}
                </h3>
                <button
                  onClick={cancelEdit}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-white"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título de la Ruta *
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Ej: Zonas 1, 1A, 1B, 1C, 1D"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Ej: Recojo y Reparto"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-arrow-down-circle-line text-blue-600"></i> Enlace MyMaps - Recojo *
                  </label>
                  <textarea
                    value={editForm.recojoMapUrl}
                    onChange={(e) => handleInputChange('recojoMapUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows={3}
                    placeholder="URL completa de Google MyMaps para recojo"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-arrow-up-circle-line text-red-600"></i> Enlace MyMaps - Reparto *
                  </label>
                  <textarea
                    value={editForm.repartoMapUrl}
                    onChange={(e) => handleInputChange('repartoMapUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows={3}
                    placeholder="URL completa de Google MyMaps para reparto"
                  ></textarea>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-image-line text-blue-600"></i> URL Imagen - Recojo
                  </label>
                  <textarea
                    value={editForm.recojoImage}
                    onChange={(e) => handleInputChange('recojoImage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows={3}
                    placeholder="URL de la imagen del mapa de recojo"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="ri-image-line text-red-600"></i> URL Imagen - Reparto
                  </label>
                  <textarea
                    value={editForm.repartoImage}
                    onChange={(e) => handleInputChange('repartoImage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    rows={3}
                    placeholder="URL de la imagen del mapa de reparto"
                  ></textarea>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-yellow-600 text-lg"></i>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-2">Instrucciones:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Los campos marcados con * son obligatorios</li>
                      <li>• Asegúrate de que los mapas estén configurados como públicos en MyMaps</li>
                      <li>• Las imágenes deben ser URLs válidas y accesibles</li>
                      <li>• Verifica que todos los enlaces funcionen antes de guardar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex space-x-4">
              <button
                onClick={saveRoute}
                className="flex-1 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-save-line"></i>
                <span>{editingRoute ? 'Guardar Cambios' : 'Agregar Ruta'}</span>
              </button>
              <button
                onClick={cancelEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {(editingConductor || showAddConductorModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-red-600 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {editingConductor ? `Editar Conductor: ${editingConductor.nombre}` : 'Agregar Nuevo Conductor'}
                </h3>
                <button
                  onClick={cancelConductorEdit}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-white"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={conductorForm.nombre}
                    onChange={(e) => handleConductorInputChange('nombre', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Ej: Carlos Mendoza"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número de Licencia *
                  </label>
                  <input
                    type="text"
                    value={conductorForm.licencia}
                    onChange={(e) => handleConductorInputChange('licencia', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Ej: A2a-12345"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={conductorForm.telefono}
                    onChange={(e) => handleConductorInputChange('telefono', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Ej: 987654321"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña de Acceso *
                  </label>
                  <input
                    type="text"
                    value={conductorForm.password}
                    onChange={(e) => handleConductorInputChange('password', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Contraseña para acceder al sistema"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-blue-600 text-lg"></i>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">Instrucciones:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Los campos marcados con * son obligatorios</li>
                      <li>• La licencia debe ser válida y vigente</li>
                      <li>• La contraseña será usada para acceder al sistema</li>
                      <li>• El conductor aparecerá activo por defecto</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex space-x-4">
              <button
                onClick={saveConductor}
                className="flex-1 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-save-line"></i>
                <span>{editingConductor ? 'Guardar Cambios' : 'Agregar Conductor'}</span>
              </button>
              <button
                onClick={cancelConductorEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Importar Conductores</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-white"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-green-600 text-lg"></i>
                  <div className="text-sm text-green-800">
                    <p className="font-medium mb-2">Formato de Importación:</p>
                    <p className="mb-2">Cada línea debe contener los datos separados por comas en este orden:</p>
                    <p className="font-mono bg-white px-2 py-1 rounded text-xs">
                      Nombre, Licencia, Teléfono, Contraseña
                    </p>
                    <p className="mt-2 text-xs">
                      • Nombre y licencia son obligatorios<br />
                      • Teléfono es opcional<br />
                      • La contraseña es obligatoria
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-2">Ejemplo:</p>
                <pre className="text-xs bg-white p-3 rounded border font-mono text-gray-700">
{`Carlos Mendoza, A2a-12345, 987654321, carlos123
Miguel Torres, A2a-67890, 987654322, miguel123
Roberto Silva, A2a-11111, 987654323, roberto123
Juan Pérez, A2a-22222, 987654324, juan123`}
                </pre>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Datos de Conductores (uno por línea)
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
                  rows={10}
                  placeholder={`Carlos Mendoza, A2a-12345, 987654321, carlos123
Miguel Torres, A2a-67890, 987654322, miguel123
Roberto Silva, A2a-11111, 987654323, roberto123`}
                ></textarea>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-alert-line text-yellow-600 text-lg"></i>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-2">Notas importantes:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Se verificará que no existan licencias duplicadas</li>
                      <li>• Los conductores importados estarán activos por defecto</li>
                      <li>• Revisa bien el formato antes de importar</li>
                      <li>• Si hay errores, se mostrará un reporte detallado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex space-x-4">
              <button
                onClick={handleImport}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-upload-line"></i>
                <span>Importar Conductores</span>
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
