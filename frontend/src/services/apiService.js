import axios from "axios";

const API_BASE_URL = "http://localhost:5002/api";
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchEmployees = () => api.get("/users");
export const createEmployee = (employee) => api.post("/users", employee);
export const updateEmployee = (id, employee) =>
  api.put(`/users/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/users/${id}`);

export default api;
