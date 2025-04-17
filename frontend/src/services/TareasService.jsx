import AxiosBackend from "../api/AxiosBackend";

export const obtenerTodasLasTareas = async () => {
  try {
    const response = await AxiosBackend.get(""); 
    return response.data.content; 
  } catch (error) {
    console.error("Error al obtener todas las tareas:", error);
    throw error;
  }
};



export const obtenerTareasCompletadas = async (page) => {
  try {
    const response = await AxiosBackend.get("/estado", {
      params: {
        completado: true,
        page: page,
        size: 10, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas completadas:", error);
    throw error;
  }
};



export const completarTarea = async (id) => {
  try {
    const response = await AxiosBackend.put(`/completar/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al completar la tarea:", error);
    throw error;
  }
};


export const obtenerTareasPendientes = async (page) => {
  try {
    const response = await AxiosBackend.get("/estado", {
      params: { completado: false, page: page, size: 10 },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas pendientes:", error);
    throw error;
  }
};

export const crearTarea = async (tarea) => {
  try {
    const response = await AxiosBackend.post('', tarea);
    return response.data;
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw error;
  }
};

export const actualizarTarea = async (id, tarea) => {
  try {
    const response = await AxiosBackend.put(`/${id}`, tarea);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    throw error;
  }
};


export const eliminarTarea = async (id) => {
  try {
    await AxiosBackend.delete(`/${id}`);
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    throw error;
  }
};
