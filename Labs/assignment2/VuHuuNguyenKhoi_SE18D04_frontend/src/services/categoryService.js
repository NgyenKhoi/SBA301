import api from './api';

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get('/staff/categories');
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/staff/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/staff/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(`/staff/categories/${id}`);
    return response.data;
  },

  searchCategories: async (searchTerm) => {
    const response = await api.get(`/staff/categories/search?q=${searchTerm}`);
    return response.data;
  }
};