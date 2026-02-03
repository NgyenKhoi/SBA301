import api from './api';

export const accountService = {
  getAllAccounts: async () => {
    const response = await api.get('/admin/accounts');
    return response.data;
  },

  createAccount: async (accountData) => {
    const response = await api.post('/admin/accounts', accountData);
    return response.data;
  },

  updateAccount: async (id, accountData) => {
    const response = await api.put(`/admin/accounts/${id}`, accountData);
    return response.data;
  },

  deleteAccount: async (id) => {
    const response = await api.delete(`/admin/accounts/${id}`);
    return response.data;
  },

  searchAccounts: async (searchTerm) => {
    const response = await api.get(`/admin/accounts/search?q=${searchTerm}`);
    return response.data;
  }
};