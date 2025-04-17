import React, { useState } from 'react';
import { crearTarea } from '../services/TareasService'; 
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormularioTarea = ({ onSuccess }) => {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaTarea = {
      titulo,
      completado: false,
    };

    try {
      await crearTarea(nuevaTarea); 
      toast.success('¡Tarea creada con éxito!');
      if (onSuccess) onSuccess();
      setTitulo('');
    } catch (err) {
      toast.error('Error al crear tarea');
      console.error('Error al crear tarea', err);
    }
  };

  return (
    <motion.form
  onSubmit={handleSubmit}
  className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md" // ⬅️ cambió a rounded-lg
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <h2 className="text-lg font-bold">Crear nueva tarea</h2>

  <div>
    <label className="block mb-1 font-semibold">Título</label>
    <input
      type="text"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      className="w-full p-2 border rounded-lg" // ⬅️ también acá
      required
    />
  </div>

  <motion.button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" // ⬅️ y acá también
    whileTap={{ scale: 0.95 }}
  >
    Crear tarea
  </motion.button>
</motion.form>
  );
};

export default FormularioTarea;
