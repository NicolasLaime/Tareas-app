import axios from "axios";

const AxiosBackend = axios.create({
  baseURL: "https://cozy-sparkle-production.up.railway.app/api/tareas", 
  headers: {
    "Content-Type": "application/json", 
  },
});

export default AxiosBackend;
