import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
  createAdmin: (data) => api.post('/api/auth/create-admin', data),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/api/users/profile'),
  getAllUsers: (page = 1, limit = 10) =>
    api.get('/api/users', { params: { page, limit } }),
  deleteUser: (id) => api.delete(`/api/users/${id}`),
};

// Task APIs
export const taskAPI = {
  createTask: (data) => api.post('/api/tasks', data),
  getMyTasks: (page = 1, limit = 10) =>
    api.get('/api/tasks/my', { params: { page, limit } }),
  getAllTasks: (page = 1, limit = 10) =>
    api.get('/api/tasks', { params: { page, limit } }),
  updateTask: (id, data) => api.put(`/api/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/api/tasks/${id}`),
};

export default api;
