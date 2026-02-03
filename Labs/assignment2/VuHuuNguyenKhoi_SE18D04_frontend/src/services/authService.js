import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const loginData = response.data;
    
    // Backend trả về: { role, accountId, accountName, message }
    // Tạo user object từ response
    const user = {
      id: loginData.accountId,
      username: loginData.accountName,
      role: loginData.role
    };
    
    // Lưu thông tin user (không có token vì backend chưa implement JWT)
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, ...loginData };
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },

  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user && user.role === role;
  }
};