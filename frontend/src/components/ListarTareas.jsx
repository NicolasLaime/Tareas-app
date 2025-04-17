import React, { useEffect, useState } from "react";
import {
  obtenerTareasPendientes,
  obtenerTareasCompletadas,
  completarTarea,
  actualizarTarea,
  eliminarTarea,
} from "../services/TareasService";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListarTareas = ({ recargar }) => {
  const [pendientes, setPendientes] = useState([]);
  const [completadas, setCompletadas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagePendientes, setPagePendientes] = useState(0);
  const [pageCompletadas, setPageCompletadas] = useState(0);
  const [totalPagesPendientes, setTotalPagesPendientes] = useState(1);
  const [totalPagesCompletadas, setTotalPagesCompletadas] = useState(1);

  const cargarTareas = async () => {
    try {
      const [pendientesData, completadasData] = await Promise.all([
        obtenerTareasPendientes(pagePendientes),
        obtenerTareasCompletadas(pageCompletadas),
      ]);

      setPendientes(pendientesData?.content || []);
      setCompletadas(completadasData?.content || []);
      setTotalPagesPendientes(pendientesData?.totalPages || 1);
      setTotalPagesCompletadas(completadasData?.totalPages || 1);
    } catch (error) {
      toast.error("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, [pagePendientes, pageCompletadas, recargar]);

  const handleCompletar = async (id) => {
    try {
      await completarTarea(id);
      toast.success("¡Tarea completada!");
      cargarTareas();
    } catch {
      toast.error("No se pudo completar la tarea");
    }
  };

  const handleActualizar = async (id, tarea) => {
    try {
      const nuevoTitulo = prompt("Nuevo título para la tarea:", tarea.titulo);
      if (nuevoTitulo) {
        const tareaActualizada = { ...tarea, titulo: nuevoTitulo };
        await actualizarTarea(id, tareaActualizada);
        toast.success("Tarea actualizada");
        cargarTareas();
      }
    } catch {
      toast.error("No se pudo actualizar la tarea");
    }
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarTarea(id);
      toast.info("Tarea eliminada");
      cargarTareas();
    } catch {
      toast.error("No se pudo eliminar la tarea");
    }
  };

  const handlePagePendientesChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPagesPendientes) {
      setPagePendientes(newPage);
    }
  };

  const handlePageCompletadasChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPagesCompletadas) {
      setPageCompletadas(newPage);
    }
  };

  if (loading) return <p className="p-4">Cargando tareas...</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow-lg relative">
      <ToastContainer position="top-right" autoClose={2500} />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tareas Pendientes */}
        <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tareas Pendientes</h2>
          {pendientes.length === 0 ? (
            <p className="text-gray-600">No hay tareas pendientes.</p>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence>
                {pendientes.map((tarea) => (
                  <motion.li
                    key={tarea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                  >
                    <h3 className="font-semibold text-lg text-gray-800">{tarea.titulo}</h3>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between">
                      <button
                        onClick={() => handleCompletar(tarea.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition duration-200"
                      >
                        Completar
                      </button>
                      <button
                        onClick={() => handleActualizar(tarea.id, tarea)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full transition duration-200"
                      >
                        Actualizar
                      </button>
                      <button
                        onClick={() => handleEliminar(tarea.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full transition duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {/* Paginación Pendientes */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 items-center gap-4 sm:gap-6">
            <button
              onClick={() => handlePagePendientesChange(pagePendientes - 1)}
              disabled={pagePendientes <= 0}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {pagePendientes + 1} de {totalPagesPendientes}
            </span>
            <button
              onClick={() => handlePagePendientesChange(pagePendientes + 1)}
              disabled={pagePendientes >= totalPagesPendientes - 1}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* Tareas Completadas */}
        <div className="md:w-1/2 bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Tareas Completadas</h2>
          {completadas.length === 0 ? (
            <p className="text-gray-600">No hay tareas completadas.</p>
          ) : (
            <ul className="space-y-4">
              <AnimatePresence>
                {completadas.map((tarea) => (
                  <motion.li
                    key={tarea.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-100 p-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                  >
                    <h3 className="font-semibold text-lg text-green-800">{tarea.titulo}</h3>
                    <p className="text-green-600 font-medium">Completado: Sí</p>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleEliminar(tarea.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {/* Paginación Completadas */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 items-center gap-4 sm:gap-6">
            <button
              onClick={() => handlePageCompletadasChange(pageCompletadas - 1)}
              disabled={pageCompletadas <= 0}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Anterior
            </button>
            <span className="text-gray-700">
              Página {pageCompletadas + 1} de {totalPagesCompletadas}
            </span>
            <button
              onClick={() => handlePageCompletadasChange(pageCompletadas + 1)}
              disabled={pageCompletadas >= totalPagesCompletadas - 1}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarTareas;
