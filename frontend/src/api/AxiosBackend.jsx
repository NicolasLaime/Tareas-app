import axios from "axios";

const AxiosBackend = axios.create({
  baseURL: "http://localhost:8080/api/tareas", 
  headers: {
    "Content-Type": "application/json", 
  },
});

export default AxiosBackend;
