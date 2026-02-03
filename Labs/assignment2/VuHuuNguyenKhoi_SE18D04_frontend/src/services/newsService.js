import api from './api';

export const newsService = {
  getAllNews: async () => {
    const response = await api.get('/staff/news');
    return response.data;
  },

  getMyNews: async () => {
    const response = await api.get('/staff/news/my');
    return response.data;
  },

  createNews: async (newsData) => {
    const response = await api.post('/staff/news', newsData);
    return response.data;
  },

  updateNews: async (id, newsData) => {
    const response = await api.put(`/staff/news/${id}`, newsData);
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await api.delete(`/staff/news/${id}`);
    return response.data;
  },

  searchNews: async (searchTerm) => {
    const response = await api.get(`/staff/news/search?q=${searchTerm}`);
    return response.data;
  },

  getAllTags: async () => {
    const response = await api.get('/staff/tags');
    return response.data;
  }
};