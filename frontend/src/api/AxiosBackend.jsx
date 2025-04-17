// src/api/axios.js
import axios from "axios";

// Crear una instancia de Axios con la URL base del backend
const AxiosBackend = axios.create({
  baseURL: "http://localhost:8080/api/tareas", // Aquí pones la URL de tu API
  headers: {
    "Content-Type": "application/json", // Header predeterminado para las solicitudes
  },
});

export default AxiosBackend;
