import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (userData) => api.patch('/auth/profile/', userData),
};

export const servicesAPI = {
  getCategories: () => api.get('/categories/'),
  getServices: (params = {}) => api.get('/services/', { params }),
  getService: (id) => api.get(`/services/${id}/`),
  createService: (serviceData) => api.post('/services/', serviceData),
  updateService: (id, serviceData) => api.patch(`/services/${id}/`, serviceData),
  deleteService: (id) => api.delete(`/services/${id}/`),
  getMyServices: () => api.get('/my-services/'),
  createServiceRequest: (requestData) => api.post('/requests/', requestData),
  getServiceRequests: () => api.get('/requests/'),
  updateServiceRequest: (id, requestData) => api.patch(`/requests/${id}/`, requestData),
};

export default api;