import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Orchid {
  id?: number;
  name: string;
  isAttractive?: boolean;
  isNatural?: boolean;
  orchidDescription?: string;
  orchidUrl: string;
  category: Category;
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export const orchidApi = {
  getAll: () => api.get<ApiResponse<Orchid[]>>('/orchids'),
  getById: (id: number) => api.get<ApiResponse<Orchid>>(`/orchids/${id}`),
  create: (orchid: Orchid) => api.post<ApiResponse<Orchid>>('/orchids', orchid),
  update: (id: number, orchid: Orchid) => api.put<ApiResponse<Orchid>>(`/orchids/${id}`, orchid),
  delete: (id: number) => api.delete<ApiResponse<string>>(`/orchids/${id}`),
};

export const categoryApi = {
  getAll: () => api.get<ApiResponse<Category[]>>('/categories'),
};

export default api;