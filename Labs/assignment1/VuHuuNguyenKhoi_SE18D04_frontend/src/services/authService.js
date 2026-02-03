import api from './api';
import { mockUsers, delay } from '../data/mockData';

export const authService = {
  login: async (credentials) => {
    await delay(); // Simulate network delay
    
    // Tìm user trong mock data
    const user = mockUsers.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password &&
      u.active
    );
    
    if (!user) {
      const error = new Error('Invalid credentials');
      error.response = {
        data: { message: 'Email hoặc mật khẩu không đúng' },
        status: 401
      };
      throw error;
    }
    
    // Mock response giống backend
    const loginData = {
      role: user.role,
      accountId: user.id,
      accountName: user.username,
      message: 'Đăng nhập thành công'
    };
    
    // Tạo user object từ response
    const userObj = {
      id: loginData.accountId,
      username: loginData.accountName,
      role: loginData.role
    };
    
    // Lưu thông tin user
    localStorage.setItem('user', JSON.stringify(userObj));
    
    return { user: userObj, ...loginData };
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