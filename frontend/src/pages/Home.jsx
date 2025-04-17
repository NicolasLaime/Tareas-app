import React, { useState } from 'react';
import ListaTareas from '../components/ListarTareas';
import FormularioTarea from '../components/FormularioTarea';

const Home = () => {
  const [recargar, setRecargar] = useState(false);

  const handleRecargar = () => {
    setRecargar(!recargar);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-5xl">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Gestión de Tareas</h1>
      <FormularioTarea onSuccess={handleRecargar} />
      <ListaTareas recargar={recargar} />
    </div>
  );
};

export default Home;
