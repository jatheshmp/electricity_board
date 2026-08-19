import axios from "axios";

// Base URL for the Django REST API (built in the backend steps).
// Wired up fully in "Creating Fetch API for ApplicantsData" step —
// for now the table falls back to sample data if this isn't reachable.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
